"use client";

import React from "react";
import { useState, useEffect } from "react";
import DropdownList from "./dropdown.jsx";
import axiosInstance from "@/lib/axiosInstance";
import TagInput from "./tagInput.jsx";
import { notification } from "antd";

const AddEditNotes = ({ noteData, type, onClose, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [author, setAuthor] = useState(noteData?.author || "");
  const [category, setCategory] = useState(noteData?.category || "personal");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTitle(noteData?.title || "");
    setContent(noteData?.content || "");
    setAuthor(noteData?.author || "");
    setCategory(noteData?.category || "personal");
    setTags(noteData?.tags || []);
  }, [noteData]);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/features/add-note", {
        title,
        content,
        author,
        category,
        tags,
      });

      if (response.data) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put(
        "/features/edit-note/" + noteId,
        {
          title,
          content,
          author,
          category,
          tags,
        }
      );

      if (response.data && response.data.noteInfo) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    if (!author) {
      setError("Please enter the author name");
      return;
    }
    if (!category) {
      setError("Please enter the category");
      return;
    }
    setError("");
    if (type === "edit") {
      editNote();
      if (!error) {
        notification.success({
          message: "Edit note Successfully",
        });
      }
    } else {
      addNewNote();
      if (!error) {
        notification.success({
          message: "Add note Successfully",
        });
      }
    }
  };

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error",
        description: error,
      });
    }
  }, [error]);

  return (
    <div className="relative">
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Add your title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">AUTHOR</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Add your name"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CATEGORY</label>
        <DropdownList categoryList={category} setCategoryList={setCategory} />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      <button
        className="btn-primary font-medium mt-5 p-3 "
        onClick={handleAddNote}
      >
        {type === "add" ? "ADD" : "Update"}
      </button>
    </div>
  );
};

export default AddEditNotes;
