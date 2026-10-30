import {useState} from "react";
import {Link} from "react-router-dom";

export default function Calculator() {

    const [display, setDisplay] = useState("0");

    const handleClick = (value) => {
        if (value === "C") {
            setDisplay("0");
        } else if (value === "=") {
            try {
                setDisplay(eval(display).toString());
            } catch (error) {
                setDisplay("Error");
            }
        } else {
            setDisplay((prev) => (prev === "0" ? value : prev + value));
        }
    };

    const buttons = [
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        "0", ".", "=", "+",
        "C"
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFDF7]">
            <Link to="/" className="absolute left-6 top-6 text-[#6F4534] hover:text-[#A66A45]">
                ← Back to games
            </Link>
            <h1 className="text-4xl md:text-6xl font-black leading-tight text-[#A66A45] mb-8">Calculator</h1>
            <div className="bg-[#F1E2CA] p-6 rounded-3xl shadow-lg">
                <div className="bg-[#FFF8EA] p-4 rounded-xl mb-4">
                    <input
                        type="text"
                        value={display}
                        readOnly
                        className="bg-transparent border-none focus:ring-0 text-right text-2xl font-bold"
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {buttons.map((button) => (
                        <button
                            key={button}
                            onClick={() => handleClick(button)}
                            className="bg-[#6F4534] hover:bg-[#A66A45] text-[#FFF8EA] font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-colors"
                        >
                            {button}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}