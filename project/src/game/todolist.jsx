
import { useState } from "react";
import { Link } from "react-router-dom";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("all");

    const handleAddTask = (e) => {
        e.preventDefault();

        if (!input.trim()) return;

        const newTask = {
            id: Date.now(),
            text: input.trim(),
            completed: false,
        };

        setTasks([...tasks, newTask]);
        setInput("");
    };

    const handleToggle = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleClearCompleted = () => {
        setTasks(tasks.filter((task) => !task.completed));
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    const remainingTasks = tasks.filter(
        (task) => !task.completed
    ).length;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFDF7] p-4">

            {/* Back Link */}
            <Link
                to="/"
                className="absolute left-6 top-6 text-[#6F4534] hover:text-[#A66A45]"
            >
                ← Back to games
            </Link>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-black leading-tight text-[#A66A45] mb-8">
                Todo List
            </h1>

            <div className="bg-[#F1E2CA] p-6 md:p-8 rounded-3xl shadow-lg w-full max-w-md">

                {/* Input Section */}
                <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 min-w-0 p-3 rounded-xl bg-[#FFF8EA] text-[#6F4534] outline-none placeholder:text-[#A66A45]"
                    />

                    <button
                        type="submit"
                        className="bg-[#A66A45] hover:bg-[#6F4534] text-[#FFF8EA] font-bold px-5 rounded-xl transition-colors"
                    >
                        + Add
                    </button>
                </form>

                {/* Task Count */}
                <div className="flex justify-between items-center mb-4">
                    <p className="text-[#6F4534] font-bold">
                        My Tasks
                    </p>

                    <span className="text-sm text-[#A66A45] font-semibold">
                        {remainingTasks} remaining
                    </span>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-5">
                    {["all", "active", "completed"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`flex-1 py-2 rounded-lg font-bold text-sm capitalize transition-colors ${
                                filter === item
                                    ? "bg-[#6F4534] text-[#FFF8EA]"
                                    : "bg-[#FFF8EA] text-[#6F4534] hover:bg-[#E8D2B3]"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Task List */}
                <div className="space-y-3 min-h-32">

                    {filteredTasks.length === 0 ? (
                        <div className="text-center py-10 text-[#A66A45]">
                            <p className="text-3xl mb-2">📝</p>
                            <p className="font-semibold">
                                {tasks.length === 0
                                    ? "No tasks yet!"
                                    : "No tasks found."}
                            </p>
                            <p className="text-sm mt-1">
                                Add a task to get started.
                            </p>
                        </div>
                    ) : (
                        filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center gap-3 bg-[#FFF8EA] p-3 rounded-xl shadow-sm"
                            >
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggle(task.id)}
                                    className="w-5 h-5 accent-[#6F4534] cursor-pointer"
                                />

                                <span
                                    className={`flex-1 min-w-0 break-words font-semibold ${
                                        task.completed
                                            ? "line-through text-[#A66A45] opacity-60"
                                            : "text-[#6F4534]"
                                    }`}
                                >
                                    {task.text}
                                </span>

                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="text-[#A66A45] hover:text-red-600 font-bold text-xl px-2"
                                    aria-label="Delete task"
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}

                </div>

                {/* Footer */}
                {tasks.some((task) => task.completed) && (
                    <button
                        onClick={handleClearCompleted}
                        className="w-full mt-5 bg-[#A66A45] hover:bg-[#6F4534] text-[#FFF8EA] font-bold py-3 rounded-xl transition-colors"
                    >
                        Clear Completed Tasks
                    </button>
                )}

                <p className="text-center text-xs text-[#A66A45] mt-5 font-semibold">
                    Stay organized, one task at a time! ✨
                </p>

            </div>
        </div>
    );
}
