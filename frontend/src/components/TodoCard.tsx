import React from "react";
import type { TodoList } from "../utils/types";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

type TodoCardProps = {
  todo: TodoList;
  onEdit: (todo: TodoList) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
};

const TodoCard = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}: TodoCardProps) => {
  return (
    <div className="mb-4 flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex items-center gap-5">

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo._id!)}
          className="h-5 w-5 accent-[#841DED]"
        />

        <div>

          <h3
            className={`text-xl font-semibold ${
              todo.completed ? "line-through text-gray-400" : "text-[#1F1B2D]"
            }`}
          >
            {todo.todoName}
          </h3>

          <div className="mt-2 flex items-center gap-3">

            <span className="text-[#7C748E]">
              {todo.time}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium
                ${
                  todo.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : todo.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-600"
                }`}
            >
              {todo.priority}
            </span>

          </div>

        </div>

      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => onEdit(todo)}
          className="rounded-lg p-2 text-[#841DED] transition hover:bg-[#F3ECFF]"
        >
          <HiOutlinePencilSquare size={22} />
        </button>

        <button
          onClick={() => onDelete(todo._id!)}
          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
        >
          <HiOutlineTrash size={22} />
        </button>

      </div>

    </div>
  );
};

export default TodoCard;