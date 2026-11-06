
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Timer() {
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [time, setTime] = useState(300);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;

        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        } else if (time === 0) {
            setIsRunning(false);
            alert("Time's up!");
        }

        return () => clearInterval(interval);
    }, [isRunning, time]);

    const formatTime = (value) => {
        const min = Math.floor(value / 60);
        const sec = value % 60;

        return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };

    const handleStart = () => {
        if (time > 0) {
            setIsRunning(true);
        }
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(minutes * 60 + seconds);
    };

    const handleSetTime = () => {
        setIsRunning(false);
        setTime(minutes * 60 + seconds);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFDF7]">

            <Link
                to="/"
                className="absolute left-6 top-6 text-[#6F4534] hover:text-[#A66A45]"
            >
                ← Back to games
            </Link>

            <h1 className="text-4xl md:text-6xl font-black leading-tight text-[#A66A45] mb-8">
                Timer
            </h1>

            <div className="bg-[#F1E2CA] p-6 md:p-8 rounded-3xl shadow-lg w-80">

                {/* Timer Display */}
                <div className="bg-[#FFF8EA] p-6 rounded-xl mb-6 text-center">
                    <h2 className="text-5xl font-black text-[#6F4534]">
                        {formatTime(time)}
                    </h2>
                    <p className="text-[#A66A45] mt-2 font-semibold">
                        {isRunning ? "Timer Running..." : "Ready"}
                    </p>
                </div>

                {/* Set Time */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                        <label className="block text-[#6F4534] font-bold mb-2">
                            Minutes
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="999"
                            value={minutes}
                            disabled={isRunning}
                            onChange={(e) =>
                                setMinutes(Math.max(0, Number(e.target.value)))
                            }
                            className="w-full p-3 rounded-xl bg-[#FFF8EA] text-[#6F4534] text-center font-bold outline-none"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block text-[#6F4534] font-bold mb-2">
                            Seconds
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={seconds}
                            disabled={isRunning}
                            onChange={(e) =>
                                setSeconds(
                                    Math.min(59, Math.max(0, Number(e.target.value)))
                                )
                            }
                            className="w-full p-3 rounded-xl bg-[#FFF8EA] text-[#6F4534] text-center font-bold outline-none"
                        />
                    </div>
                </div>

                {/* Set Button */}
                <button
                    onClick={handleSetTime}
                    disabled={isRunning}
                    className="w-full bg-[#A66A45] hover:bg-[#6F4534] disabled:opacity-50 text-[#FFF8EA] font-bold py-3 rounded-xl mb-4 transition-colors"
                >
                    Set Timer
                </button>

                {/* Timer Controls */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleStart}
                        disabled={isRunning || time === 0}
                        className="bg-[#6F4534] hover:bg-[#A66A45] disabled:opacity-50 text-[#FFF8EA] font-bold py-4 rounded-xl shadow-md transition-colors"
                    >
                        ▶ Start
                    </button>

                    <button
                        onClick={handlePause}
                        disabled={!isRunning}
                        className="bg-[#6F4534] hover:bg-[#A66A45] disabled:opacity-50 text-[#FFF8EA] font-bold py-4 rounded-xl shadow-md transition-colors"
                    >
                        ⏸ Pause
                    </button>

                    <button
                        onClick={handleReset}
                        className="col-span-2 bg-[#6F4534] hover:bg-[#A66A45] text-[#FFF8EA] font-bold py-4 rounded-xl shadow-md transition-colors"
                    >
                        ↻ Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
