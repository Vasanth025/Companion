import React from "react";
import { HiOutlinePlus } from "react-icons/hi2";

type AddNoteProps = {
  onAddNote: (note: { title: string; category: string; content: string }) => void;
};

const AddNote = ({ onAddNote }: AddNoteProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("Personal");
  const [content, setContent] = React.useState("");

  const categories = ["Personal", "Work", "Others"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onAddNote({ title, category, content });
      setTitle("");
      setCategory("Personal");
      setContent("");
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-[#841DED] px-4 py-2 text-white font-semibold transition hover:bg-[#7418D9]"
      >
        <HiOutlinePlus size={20} />
        <span>New Note</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#1F1B2D]">Create New Note</h2>
              <button
                onClick={() => setIsOpen(false)}
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#841DED] focus:outline-none resize-none"
                  rows={4}
                  placeholder="Enter note description..."
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 font-medium text-[#7C748E] transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#841DED] px-4 py-3 font-medium text-white transition hover:bg-[#7418D9]"
                >
                  Create Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNote;
