import React from "react";
import type { TodoForm, TodoList } from "../utils/types";
import TodoModal from "../components/TodoModal";
import axios from "axios";
import { toast } from "react-toastify";
import TodoCard from "../components/TodoCard";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Todos = () => {

    const [todoForm, setTodoForm] = React.useState<TodoForm>({
        todoName: "",
        dueDate: "",
        time: "",
        priority: ""
    });

    const [todos, setTodos] = React.useState<TodoList[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [selectedTodoId, setSelectedTodoId] = React.useState<string | null>(null);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
    const [upcomingTodos, setUpcomingTodos] = React.useState<TodoList[]>([]);

    React.useEffect(() => {
        fetchTodosByDate();
    }, [selectedDate]);

    React.useEffect(() => {
        fetchUpcomingTodos();
    }, []);

    const handleAddTodo = async () => {
        setIsEdit(false);


        setTodoForm({
            todoName: "",
            dueDate: "",
            time: "",
            priority: ""
        });

        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/todo/edit/${selectedTodoId}`,
                    todoForm,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                toast.success("Todo Updated Successfully!");
            } else {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/todo/create`,
                    todoForm,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                toast.success("Todo Added Successfully!");
            }

            // fetchTodos();
            fetchTodosByDate();

            setTodoForm({
                todoName: "",
                dueDate: "",
                time: "",
                priority: "",
            });

            setSelectedTodoId(null);
            setIsEdit(false);
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    const handleEdit = (todo: TodoList) => {
        setSelectedTodoId(todo._id);
        setIsEdit(true);

        setTodoForm({
            todoName: todo.todoName,
            dueDate: todo.dueDate,
            time: todo.time,
            priority: todo.priority,
        });

        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/todo/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            toast.success("Todo Deleted Successfully!");

            // fetchTodos();
            fetchTodosByDate();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete todo.");
        }
    };

    const handleToggleComplete = async (id: string) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/todo/edit/${id}`,
                { completed: true },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // fetchTodos();
            fetchTodosByDate();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update todo.");
        }
    };

    const fetchTodos = async () => {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/api/todo/get", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        setTodos(response.data.todos);
    }

    const fetchTodosByDate = async () => {
        if (!selectedDate) {
            return;
        }

        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");

        const isoDate = `${year}-${month}-${day}T00:00:00.000+00:00`;


        try {
            const response = await axios.query(
                `${import.meta.env.VITE_API_URL}/api/todo/getByDate`,
                {
                    date: isoDate
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setTodos(response.data.todos);
        } catch (error) {
            console.error(error);
            setTodos([]);
        }
    };

    const fetchUpcomingTodos = async () => {
        const today = new Date();
        const next3Days = [];

        for (let i = 1; i <= 3; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            const year = nextDay.getFullYear();
            const month = String(nextDay.getMonth() + 1).padStart(2, "0");
            const day = String(nextDay.getDate()).padStart(2, "0");
            const isoDate = `${year}-${month}-${day}T00:00:00.000+00:00`;
            next3Days.push(isoDate);
        }

        try {
            const allUpcoming = [];
            for (const date of next3Days) {
                const response = await axios.query(
                    `${import.meta.env.VITE_API_URL}/api/todo/getByDueDate`,
                    {
                        date: date
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                allUpcoming.push(...response.data.todos);
            }
            setUpcomingTodos(allUpcoming);
        } catch (error) {
            console.error(error);
            setUpcomingTodos([]);
        }
    };

    return (
        <div className="grid grid-cols-12 min-h-screen bg-[#F8F7FC]">

            {/* Left Section */}
            <section className="col-span-8 px-8 py-8">

                {/* Header */}
                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-5xl font-bold text-[#1F1B2D]">
                            Today's Tasks
                        </h1>

                        <p className="mt-2 text-[#7C748E]">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} • {
                                todos.filter(t => !t.completed).length
                            } tasks remaining
                        </p>
                    </div>

                    {/* <button className="h-12 w-12 rounded-full bg-white shadow-sm">
                        🔔
                    </button> */}

                </div>

                {/* Add Todo */}

                <div className="mt-8 flex items-center rounded-2xl bg-white border border-[#ECE8F3] overflow-hidden">

                    <input
                        readOnly
                        placeholder="Add a new task..."
                        className="flex-1 cursor-pointer px-6 py-5 outline-none"
                        onClick={handleAddTodo}
                    />

                    <button
                        onClick={handleAddTodo}
                        className="m-2 rounded-xl bg-[#841DED] px-8 py-3 text-white hover:bg-[#6d18c5]"
                    >
                        Add
                    </button>

                </div>

                {/* Todo List */}

                <div className="mt-10">

                    <div className="mb-5 flex items-center justify-between">

                        <h2 className="font-semibold uppercase tracking-wider text-[#7C748E]">
                            Todos
                        </h2>

                        <span className="text-sm text-[#7C748E]">
                            {todos.length} {todos.length === 1 ? "Task" : "Tasks"}
                        </span>

                    </div>

                    <div className="space-y-4">

                        {todos.length === 0 ? (
                            <div className="rounded-3xl border-2 border-dashed border-[#ECE8F3] bg-white py-16 text-center">

                                <h3 className="text-xl font-semibold text-[#1F1B2D]">
                                    No Todos Found
                                </h3>

                                <p className="mt-2 text-[#7C748E]">
                                    Click the <span className="font-medium text-[#841DED]">Add</span> button to create your first todo.
                                </p>

                            </div>
                        ) : (
                            todos.map((todo) => (
                                <TodoCard
                                    key={todo._id}
                                    todo={todo}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onToggleComplete={handleToggleComplete}
                                />
                            ))
                        )}

                    </div>

                </div>

            </section>

            {/* Right Section */}

            <aside className="col-span-4 border-l border-[#ECE8F3] bg-white px-8 py-8">

                {/* Calendar */}

                <div className="rounded-3xl bg-[#F8F7FC] p-6">

                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                    />

                </div>

                {/* Progress */}

                <div className="mt-8 rounded-3xl bg-[#F8F7FC] p-6">

                    <div className="flex items-center justify-between">

                        <h3 className="font-semibold">
                            Daily Progress
                        </h3>

                        <span className="font-bold text-[#841DED]">
                            {todos.length > 0 ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0}%
                        </span>

                    </div>

                    <div className="mt-5 h-3 rounded-full bg-gray-200">

                        <div
                            className="h-full rounded-full bg-[#841DED]"
                            style={{
                                width: todos.length > 0 ? `${(todos.filter(t => t.completed).length / todos.length) * 100}%` : '0%'
                            }}
                        />

                    </div>

                    <p className="mt-4 text-sm text-[#7C748E]">
                        {todos.length > 0
                            ? `You have completed ${todos.filter(t => t.completed).length} out of ${todos.length} tasks.`
                            : 'No tasks for this date.'}
                    </p>

                </div>

                {/* Upcoming */}

                <div className="mt-10">

                    <div className="mb-5 flex items-center justify-between">

                        <h2 className="text-2xl font-bold">
                            What's Next
                        </h2>

                        {/* <button className="text-[#841DED]">
                            View All
                        </button> */}

                    </div>

                    <div className="space-y-4">

                        {upcomingTodos.length === 0 ? (
                            <div className="rounded-2xl bg-[#F8F7FC] p-5 text-center">
                                <p className="text-sm text-[#7C748E]">
                                    No upcoming tasks
                                </p>
                            </div>
                        ) : (
                            upcomingTodos.slice(0, 3).map((todo) => (
                                <div key={todo._id} className="rounded-2xl bg-[#F8F7FC] p-5">

                                    <h3 className="font-semibold">
                                        {todo.todoName}
                                    </h3>

                                    <p className="mt-2 text-sm text-[#7C748E]">
                                        {new Date(todo.dueDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                        {todo.time && ` • ${todo.time}`}
                                    </p>

                                </div>
                            ))
                        )}

                    </div>

                </div>

            </aside>

            <TodoModal
                open={isModalOpen}
                isEdit={isEdit}
                todoForm={todoForm}
                setTodoForm={setTodoForm}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />

        </div>
    );
};

export default Todos;