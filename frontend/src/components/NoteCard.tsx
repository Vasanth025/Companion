import { HiOutlineStar, HiStar, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

type NoteCardProps = {
  id: string;
  title: string;
  category: string;
  date: string;
  isPinned?: boolean;
  description?: string;
  onPin?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: () => void;
};

const NoteCard = ({
  id,
  title,
  category,
  date,
  isPinned = false,
  description,
  onPin,
  onEdit,
  onDelete,
  onClick,
}: NoteCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md cursor-pointer"
    >
      {/* Action Buttons Container */}
      <div className="absolute top-4 right-4 flex gap-2">
        {/* Edit Button */}
        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
            className="rounded-lg p-2 text-[#841DED] bg-[#F3ECFF] hover:bg-[#E8D8FF] transition"
          >
            <HiOutlinePencilSquare size={18} />
          </button>
        )}

        {/* Delete Button */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="rounded-lg p-2 text-red-500 bg-red-50 hover:bg-red-100 transition"
          >
            <HiOutlineTrash size={18} />
          </button>
        )}

        {/* Pin Button */}
        {onPin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin(id);
            }}
            className="rounded-lg p-2 text-gray-400 hover:text-[#841DED] transition"
          >
            {isPinned ? <HiStar size={20} /> : <HiOutlineStar size={20} />}
          </button>
        )}
      </div>

      {/* Note Content */}
      <div className="py-2 px-1">
        <h3 className="text-lg font-semibold text-[#1F1B2D]">{title}</h3>

        {description && (
          <p className="mt-2 text-sm text-[#7C748E]">{description}</p>
        )}

        <div className="flex justify-between items-center">
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-[#F3ECFF] px-3 py-1 text-sm font-medium text-[#841DED]">
              {category}
            </span>
          </div>

          <p className="mt-3 text-sm text-[#7C748E]">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
