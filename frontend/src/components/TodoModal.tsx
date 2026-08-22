import React, { useState } from "react";
import { HiXMark, HiChevronDown } from "react-icons/hi2";
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
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

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

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                className="w-full rounded-xl border border-[#ECE8F3] bg-[#F8F7FC] px-4 py-3 text-left outline-none focus:border-[#841DED] flex items-center justify-between"
              >
                <span className="flex items-center">
                  {todoForm.priority === "High" && (
                    <>
                      <span className="mr-2 h-3 w-3 rounded-full bg-red-500"></span>
                      High
                    </>
                  )}
                  {todoForm.priority === "Medium" && (
                    <>
                      <span className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></span>
                      Medium
                    </>
                  )}
                  {todoForm.priority === "Low" && (
                    <>
                      <span className="mr-2 h-3 w-3 rounded-full bg-green-500"></span>
                      Low
                    </>
                  )}
                  {!todoForm.priority && <span className="text-gray-400">Select Priority</span>}
                </span>
                <HiChevronDown
                  className={`ml-2 h-5 w-5 text-gray-400 transition-transform ${
                    isPriorityOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isPriorityOpen && (
                <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-[#ECE8F3] bg-white shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setTodoForm({ ...todoForm, priority: "High" });
                      setIsPriorityOpen(false);
                    }}
                    className="w-full rounded-t-xl px-4 py-3 text-left hover:bg-[#F8F7FC] flex items-center transition"
                  >
                    <span className="mr-2 h-3 w-3 rounded-full bg-red-500"></span>
                    High
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTodoForm({ ...todoForm, priority: "Medium" });
                      setIsPriorityOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#F8F7FC] flex items-center transition"
                  >
                    <span className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></span>
                    Medium
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTodoForm({ ...todoForm, priority: "Low" });
                      setIsPriorityOpen(false);
                    }}
                    className="w-full rounded-b-xl px-4 py-3 text-left hover:bg-[#F8F7FC] flex items-center transition"
                  >
                    <span className="mr-2 h-3 w-3 rounded-full bg-green-500"></span>
                    Low
                  </button>
                </div>
              )}
            </div>

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