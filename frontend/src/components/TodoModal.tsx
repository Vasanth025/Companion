import React from "react";
import { HiXMark } from "react-icons/hi2";
import type { TodoForm } from "../utils/types";

type TodoModalProps = {
  open: boolean;
  isEdit: boolean;
  todoForm: TodoForm;
  setTodoForm: React.Dispatch<React.SetStateAction<TodoForm>>;
  onClose: () => void;
  onSubmit: () => void;
};

const TodoModal = ({
  open,
  isEdit,
  todoForm,
  setTodoForm,
  onClose,
  onSubmit,
}: TodoModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#ECE8F3] px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-[#1F1B2D]">
              {isEdit ? "Edit Todo" : "Add Todo"}
            </h2>

            <p className="mt-1 text-[#7C748E]">
              {isEdit
                ? "Update your task details."
                : "Create a new task to stay productive."}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <HiXMark size={26} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-8">

          {/* Todo */}

          <div>

            <label className="mb-2 block font-medium">
              Task Name
            </label>

            <input
              type="text"
              placeholder="Enter task name..."
              value={todoForm.todoName}
              onChange={(e) =>
                setTodoForm({
                  ...todoForm,
                  todoName: e.target.value,
                })
              }
              className="w-full rounded-xl border border-[#ECE8F3] bg-[#F8F7FC] px-4 py-3 outline-none focus:border-[#841DED]"
            />

          </div>

          {/* Date & Time */}

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="mb-2 block font-medium">
                Due Date
              </label>

              <input
                type="date"
                value={todoForm.dueDate}
                onChange={(e) =>
                  setTodoForm({
                    ...todoForm,
                    dueDate: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-[#ECE8F3] bg-[#F8F7FC] px-4 py-3 outline-none focus:border-[#841DED]"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Time
              </label>

              <input
                type="time"
                value={todoForm.time}
                onChange={(e) =>
                  setTodoForm({
                    ...todoForm,
                    time: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-[#ECE8F3] bg-[#F8F7FC] px-4 py-3 outline-none focus:border-[#841DED]"
              />

            </div>

          </div>

          {/* Priority */}

          <div>

            <label className="mb-2 block font-medium">
              Priority
            </label>

            <select
              value={todoForm.priority}
              onChange={(e) =>
                setTodoForm({
                  ...todoForm,
                  priority: e.target.value,
                })
              }
              className="w-full rounded-xl border border-[#ECE8F3] bg-[#F8F7FC] px-4 py-3 outline-none focus:border-[#841DED]"
            >
              <option value="">Select Priority</option>
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 border-t border-[#ECE8F3] px-8 py-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-[#ECE8F3] px-6 py-3 font-medium transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="rounded-xl bg-[#841DED] px-8 py-3 font-semibold text-white transition hover:bg-[#6D18C5]"
          >
            {isEdit ? "Update Todo" : "Add Todo"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default TodoModal;