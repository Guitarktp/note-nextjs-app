

import { MdCreate, MdOutlineHistory } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  author,
  editHistory,
  onEdit,
  category,
}) => {
  return (
    <div className="border border-yellow-300 rounded-xl p-4 bg-yellow-50 hover:shadow-xl transition-all ease-in-out duration-200">
      <div className="flex justify-between">
        <div>
          <h6 className="text-xl font-semibold">{title}</h6>
          
            <span className="font-bold text-xs mr-1">Created at</span>
            <span className="text-xs text-black">
              {new Date(date).toLocaleString()}
            </span>

            <br />
            <span className="font-bold text-xs mr-1">Author</span>
            <span className="text-xs text-black">{author}</span>

            <br />
            <span className="font-bold text-xs mr-1">Category</span>
            <span className="text-xs text-black">{category}</span>
          
        </div>
        <MdOutlineHistory className="mt-1 icon-btn duration-300" onClick={editHistory} />
      </div>

      <p className="text-xl text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item) => `#${item}`)}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600 duration-300 "
            onClick={onEdit}
          />      
        </div>
      </div>
    </div>
  );
};

export default NoteCard
