import React from "react";
import axios from "axios";
import { HiOutlineMagnifyingGlass, HiOutlineCog6Tooth } from "react-icons/hi2";
import NoteCard from "../components/NoteCard";
import AddNote from "../components/AddNote";
import EditNote from "../components/EditNote";

type Note = {
  _id: string;
  title: string;
  category: string;
  description: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
};

const Notes = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editingNote, setEditingNote] = React.useState<Note | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notes/getall`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.status === 200) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNotes();
  }, []);

  const filters = ["All", "Personal", "Work", "Others"];

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const handleAddNote = async (newNote: { title: string; category: string; content: string }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/notes/create`,
        {
          title: newNote.title,
          description: newNote.content,
          category: newNote.category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.status === 201) {
        await fetchNotes(); // Refresh notes after adding
      } else {
        console.error("Failed to create note:", data);
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handlePinNote = async (id: string) => {
    try {
      const noteToUpdate = notes.find((note) => note._id === id);
      if (!noteToUpdate) return;

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/notes/edit/${id}`,
        {
          isPinned: !noteToUpdate.isPinned,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.status === 200) {
        await fetchNotes(); // Refresh notes after pinning
      } else {
        console.error("Failed to pin note:", data);
      }
    } catch (error) {
      console.error("Error pinning note:", error);
    }
  };

  const handleEditNote = async (updatedNote: { title: string; category: string; description: string }) => {
    if (!editingNote) return;

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/notes/edit/${editingNote._id}`,
        {
          title: updatedNote.title,
          category: updatedNote.category,
          description: updatedNote.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.status === 200) {
        await fetchNotes(); // Refresh notes after editing
        setIsEditModalOpen(false);
        setEditingNote(null);
      } else {
        console.error("Failed to edit note:", data);
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/notes/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.status === 200) {
        await fetchNotes(); // Refresh notes after deletion
      } else {
        console.error("Failed to delete note:", data);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const openEditModal = (id: string) => {
    const noteToEdit = notes.find((note) => note._id === id);
    if (noteToEdit) {
      setEditingNote(noteToEdit);
      setIsEditModalOpen(true);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      note.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const recentNotes = filteredNotes.filter((note) => !note.isPinned);

  return (
    <div className="min-h-screen bg-[#F8F7FC] p-8 w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1F1B2D]">All Notes</h1>
        <div className="flex items-center gap-3">
          <AddNote onAddNote={handleAddNote} />
          <button className="rounded-lg p-2 text-[#7C748E] hover:bg-white hover:shadow-sm transition">
            <HiOutlineCog6Tooth size={24} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <HiOutlineMagnifyingGlass
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7C748E]"
        />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 focus:border-[#841DED] focus:outline-none"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 flex gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-5 py-2 font-medium transition
                ${activeFilter === filter
                ? "bg-[#841DED] text-white"
                : "bg-white text-[#7C748E] hover:bg-[#F3ECFF] hover:text-[#841DED]"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-[#1F1B2D]">
            Pinned Notes
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note._id}
                id={note._id}
                title={note.title}
                category={note.category}
                description={note.description}
                date={formatDate(note.createdAt)}
                isPinned={note.isPinned}
                onPin={handlePinNote}
                onEdit={openEditModal}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent Notes */}
      {recentNotes.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-[#1F1B2D]">
            Recent Notes
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentNotes.map((note) => (
              <NoteCard
                key={note._id}
                id={note._id}
                title={note.title}
                category={note.category}
                description={note.description}
                date={formatDate(note.createdAt)}
                isPinned={note.isPinned}
                onPin={handlePinNote}
                onEdit={openEditModal}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-xl font-medium text-[#7C748E]">Loading notes...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredNotes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-xl font-medium text-[#7C748E]">No notes found</p>
          <p className="mt-2 text-[#7C748E]">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Edit Note Modal */}
      <EditNote
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingNote(null);
        }}
        onEditNote={handleEditNote}
        note={editingNote}
      />
    </div>
  );
};

export default Notes;