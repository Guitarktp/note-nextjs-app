import Image from "next/image";
import AddNoteEmpty from "@/assets/images/add-notes.svg"

const EmptyCard = () => {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <Image src={AddNoteEmpty} alt="No notes" className="w-60" />
  
        <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
          Start creating your first note! Click the Add button to jot down your
          thoughts, ideas, and reminders. Get started!
        </p>
      </div>
    );
  };
  export default EmptyCard