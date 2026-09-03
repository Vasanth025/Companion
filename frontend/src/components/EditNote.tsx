import React from "react";
import { HiOutlineXMark, HiOutlineCheck } from "react-icons/hi2";

type Note = {
  _id: string;
  title: string;
  category: string;
  description: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
};

type EditNoteProps = {
  isOpen: boolean;
  onClose: () => void;
  onEditNote: (note: { title: string; category: string; description: string }) => void;
  note: Note | null;
};

const EditNote = ({ isOpen, onClose, onEditNote, note }: EditNoteProps) => {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("Personal");
  const [description, setDescription] = React.useState("");

  const categories = ["Personal", "Work", "Others"];

  React.useEffect(() => {
    if (note) {
      setTitle(note.title);
      setCategory(note.category);
      setDescription(note.description);
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onEditNote({ title, category, description });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#1F1B2D]">Edit Note</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-[#1F1B2D]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#841DED] focus:outline-none"
              placeholder="Enter note title..."
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-[#1F1B2D]">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#841DED] focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-[#1F1B2D]">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#841DED] focus:outline-none resize-none"
              rows={4}
              placeholder="Enter note description..."
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-4 py-3 font-medium text-[#7C748E] transition hover:bg-gray-50 hover:border-gray-300"
            >
              <HiOutlineXMark size={18} />
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#841DED] to-[#7418D9] px-4 py-3 font-medium text-white hover:from-[#7418D9] hover:to-[#6416C7] shadow-md hover:shadow-lg transition-all duration-200"
            >
              <HiOutlineCheck size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
