"use client";

import Welcome from "@/components/welcome";

import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import axiosInstance from "@/lib/axiosInstance";
import NoteCard from "@/components/noteCard";
import AddEditNotes from "@/components/addEditNotes";
import EmptyCard from "@/components/emptyCard";
import NoteEditHistory from "@/components/history";
import SortButton from "@/components/sortButton";
import { Modal } from "antd";

export default function Home() {
  const [allNotes, setAllNotes] = useState([]);
  const [hasToken, setHasToken] = useState(false);
  const [sortOption, setSortOption] = useState("dateDesc");

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openEditHistoryModal, setOpenEditHistoryModal] = useState({
    isShown: false,
    data: [],
  });

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/features/get-all-notes");
      if (response.data && response.data.allNotes) {
        setAllNotes(response.data.allNotes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const sortNotes = (notes, option) => {
    const sortedNotes = [...notes];

    if (option === "dateAsc") {
      sortedNotes.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    } else if (option === "dateDesc") {
      sortedNotes.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    } else if (option === "titleAsc") {
      sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "titleDesc") {
      sortedNotes.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      sortedNotes.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    }
    return sortedNotes;
  };

  const handleEdit = (noteData) => {
    setOpenAddEditModal({
      isShown: true,
      data: noteData,
      type: "edit",
    });
  };

  const handleHistory = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.get(
        "/features/get-note-by-id/" + noteId
      );
      setOpenEditHistoryModal({
        isShown: true,
        data: response.data.noteInfo.editHistory,
      });
    } catch (error) {
      console.log("Error fetching edit history:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHasToken(true);
      getAllNotes();
      console.log("get token success");
    } else {
    }
    return () => {};
  }, []);

  return (
    <div className="container mx-auto px-24 ">
      {hasToken && (
        <SortButton
          sortOption={sortOption}
          setSortOption={(e) => setSortOption(e.target.value)}
        />
      )}

      {/* แสดง note card */}
      {hasToken ? (
        allNotes.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 mt-8 ">
            {sortNotes(allNotes, sortOption).map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                content={item.content}
                author={item.author}
                category={item.category}
                date={item.createdOn}
                isPinned={item.isPinned}
                tags={item.tags}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
                editHistory={() => handleHistory(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard />
        )
      ) : (
        <Welcome />
      )}

      {/* ปุ่มเพิ่ม note */}
      {hasToken && (
        <button
          className="w-36 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 fixed right-10 bottom-10 duration-300"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: [] });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
          <p className="text-white font-semibold">New note</p>
        </button>
      )}

      {/* เปิดหน้า add and edit note */}
      <Modal
        open={openAddEditModal.isShown}
        onCancel={() => setOpenAddEditModal({ isShown: false, data: null })}
        footer={null}
        title={openAddEditModal.type === "add" ? "Add Note" : "Edit Note"}
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, data: null })}
          getAllNotes={getAllNotes}
        />
      </Modal>

      {/* เปิดหน้า show edit history */}

      <Modal
        open={openEditHistoryModal.isShown}
        onCancel={() => setOpenEditHistoryModal({ isShown: false, data: [] })}
        footer={null}
        title="Edit History"
      >
        <NoteEditHistory editHistory={openEditHistoryModal.data} />
      </Modal>
    </div>
  );
}
