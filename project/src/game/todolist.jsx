
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TodoList() {
    const [tasks, setTasks] = useState(() => {
        try {
            const saved = localStorage.getItem("playspace-tasks");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("playspace-tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (e) => {
        e.preventDefault();

        if (!input.trim()) return;

        const newTask = {
            id: Date.now(),
            text: input.trim(),
            completed: false,
        };

        setTasks((prev) => [...prev, newTask]);
        setInput("");
    };

    const handleToggle = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const handleDelete = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const handleClearCompleted = () => {
        setTasks((prev) => prev.filter((task) => !task.completed));
    };

    const completedTasks = tasks.filter((task) => task.completed).length;
    const remainingTasks = tasks.length - completedTasks;

    const progress = tasks.length
        ? Math.round((completedTasks / tasks.length) * 100)
        : 0;

    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    return (
        <div className="min-h-screen bg-[#FFFDF7] px-4 py-8 sm:px-6 md:py-12">

            {/* Back Navigation */}
            <div className="max-w-3xl mx-auto mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-[#806653] hover:text-[#A66A45] font-semibold transition-colors"
                >
                    <span className="text-xl">←</span>
                    Back to games
                </Link>
            </div>

            {/* Main Container */}
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="text-center mb-9">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#F1E2CA] text-4xl mb-5 shadow-sm">
                        📝
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#A66A45] tracking-tight">
                        My Todo List
                    </h1>

                    <p className="text-[#806653] mt-3 text-sm sm:text-base">
                        Organize your day, achieve your goals ✨
                    </p>
                </div>

                {/* Todo Card */}
                <div className="bg-[#F1E2CA] p-5 sm:p-7 md:p-8 rounded-3xl shadow-xl border border-[#E3D1B5]">

                    {/* Statistics */}
                    <div className="grid grid-cols-3 gap-3 mb-7">

                        <div className="bg-[#FFF8EA] rounded-2xl p-3 text-center shadow-sm">
                            <p className="text-2xl sm:text-3xl font-black text-[#6F4534]">
                                {tasks.length}
                            </p>
                            <p className="text-xs sm:text-sm text-[#806653] font-semibold mt-1">
                                Total
                            </p>
                        </div>

                        <div className="bg-[#FFF8EA] rounded-2xl p-3 text-center shadow-sm">
                            <p className="text-2xl sm:text-3xl font-black text-[#A66A45]">
                                {remainingTasks}
                            </p>
                            <p className="text-xs sm:text-sm text-[#806653] font-semibold mt-1">
                                Pending
                            </p>
                        </div>

                        <div className="bg-[#FFF8EA] rounded-2xl p-3 text-center shadow-sm">
                            <p className="text-2xl sm:text-3xl font-black text-[#6F4534]">
                                {completedTasks}
                            </p>
                            <p className="text-xs sm:text-sm text-[#806653] font-semibold mt-1">
                                Done
                            </p>
                        </div>

                    </div>

                    {/* Progress Section */}
                    <div className="mb-7">
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-bold text-[#6F4534] text-sm">
                                Your Progress
                            </p>

                            <p className="font-bold text-[#A66A45] text-sm">
                                {progress}%
                            </p>
                        </div>

                        <div className="w-full h-3 bg-[#E3D1B5] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#A66A45] rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Add Task Form */}
                    <form
                        onSubmit={handleAddTask}
                        className="flex flex-col sm:flex-row gap-3 mb-7"
                    >
                        <input
                            type="text"
                            placeholder="What do you need to do?"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 min-w-0 bg-[#FFF8EA] border-2 border-transparent focus:border-[#A66A45] outline-none rounded-xl px-4 py-4 text-[#6F4534] placeholder:text-[#A68A72] font-medium transition-all"
                        />

                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="bg-[#6F4534] hover:bg-[#A66A45] disabled:opacity-50 disabled:cursor-not-allowed text-[#FFF8EA] font-bold px-7 py-4 rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02]"
                        >
                            + Add Task
                        </button>
                    </form>

                    {/* Task List Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                        <h2 className="text-xl font-black text-[#6F4534]">
                            Your Tasks
                        </h2>

                        <div className="flex gap-2">
                            {["all", "active", "completed"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setFilter(item)}
                                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold capitalize transition-all ${
                                        filter === item
                                            ? "bg-[#6F4534] text-[#FFF8EA] shadow-md"
                                            : "bg-[#FFF8EA] text-[#806653] hover:bg-[#E8D2B3]"
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tasks */}
                    <div className="space-y-3">

                        {filteredTasks.length === 0 ? (
                            <div className="bg-[#FFF8EA] rounded-2xl py-12 px-4 text-center">
                                <div className="text-5xl mb-4">
                                    {filter === "completed" ? "🎯" : "📋"}
                                </div>

                                <h3 className="text-lg font-bold text-[#6F4534]">
                                    {filter === "all"
                                        ? "No tasks yet!"
                                        : filter === "active"
                                        ? "All caught up!"
                                        : "Nothing completed yet!"}
                                </h3>

                                <p className="text-sm text-[#A66A45] mt-2">
                                    {filter === "all"
                                        ? "Add your first task and get started."
                                        : "Your tasks will appear here."}
                                </p>
                            </div>
                        ) : (
                            filteredTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`group flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 border ${
                                        task.completed
                                            ? "bg-[#EDE4D5] border-[#E3D1B5]"
                                            : "bg-[#FFF8EA] border-transparent hover:border-[#D8B894] hover:shadow-md"
                                    }`}
                                >
                                    {/* Checkbox */}
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggle(task.id)}
                                        className="w-5 h-5 accent-[#6F4534] cursor-pointer shrink-0"
                                    />

                                    {/* Task Text */}
                                    <span
                                        className={`flex-1 min-w-0 break-words font-semibold transition-all ${
                                            task.completed
                                                ? "line-through text-[#A68A72]"
                                                : "text-[#6F4534]"
                                        }`}
                                    >
                                        {task.text}
                                    </span>

                                    {/* Status */}
                                    {task.completed && (
                                        <span className="hidden sm:block text-xs font-bold text-[#A66A45]">
                                            Done ✓
                                        </span>
                                    )}

                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        aria-label={`Delete ${task.text}`}
                                        className="shrink-0 w-9 h-9 rounded-lg text-[#A66A45] hover:bg-red-100 hover:text-red-600 font-bold text-xl transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))
                        )}

                    </div>

                    {/* Clear Completed */}
                    {completedTasks > 0 && (
                        <button
                            onClick={handleClearCompleted}
                            className="w-full mt-6 bg-[#A66A45] hover:bg-[#6F4534] text-[#FFF8EA] font-bold py-3 rounded-xl transition-colors shadow-sm"
                        >
                            🗑 Clear Completed Tasks
                        </button>
                    )}

                    {/* Footer */}
                    <div className="border-t border-[#D8C3A5] mt-7 pt-5 text-center">
                        <p className="text-sm text-[#806653] font-semibold">
                            {remainingTasks === 0 && tasks.length > 0
                                ? "🎉 Amazing! All tasks completed!"
                                : "Stay focused and make today productive!"}
                        </p>
                    </div>

                </div>

                {/* Bottom Text */}
                <p className="text-center text-xs text-[#A68A72] mt-7">
                    Made with ♥ · PlaySpace Todo App
                </p>

            </div>
        </div>
    );
}
