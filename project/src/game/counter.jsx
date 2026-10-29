import { useState } from "react";
import { Link } from "react-router-dom";

export default function Counter() {
    const [count, setCount] = useState(0);
    const handleIncrement = () => setCount((prev) => prev + 1);
    const handleDecrement = () => setCount((prev) => Math.max(0, prev - 1));
    const handleReset = () => setCount(0);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFDF7]">
            <Link to="/" className="absolute left-6 top-6 text-[#6F4534] hover:text-[#A66A45]">
                ← Back to games
            </Link>
            <h1 className="text-4xl md:text-6xl font-black leading-tight text-[#A66A45] mb-8">Counter</h1>
            <div className="flex items-center space-x-4">
                <button
                    onClick={handleDecrement}
                    disabled={count === 0}
                    className="px-4 py-2 bg-[#E3D1B5] text-[#6F4534] rounded-lg hover:bg-[#A66A45] hover:text-[#FFF8EA] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                    Decrease
                </button>
                <output aria-live="polite" className="text-4xl font-bold text-[#6F4534]">{count}</output>
                <button
                    onClick={handleIncrement}
                    className="px-4 py-2 bg-[#E3D1B5] text-[#6F4534] rounded-lg hover:bg-[#A66A45] hover:text-[#FFF8EA] transition-colors"
                >
                    Increase
                </button>
            </div>
            <button
                onClick={handleReset}
                className="mt-8 px-4 py-2 bg-[#6F4534] text-[#FFF8EA] rounded-lg hover:bg-[#A66A45] transition-colors"
            >
                Reset
            </button>
        </div>
    );
}