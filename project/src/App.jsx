import './App.css'
import { Link, Route, Routes } from "react-router-dom";
import Ludo from "./game/ludo.jsx";

const projects = [
  {
    name: "Ludo Game",
    description: "Play the classic Ludo board game.",
    icon: "🎲",
    path: "/game/ludo",
  },
  {
    name: "Tic Tac Toe",
    description: "Challenge yourself to a quick game.",
    icon: "⭕",
    path: "/game/tic-tac-toe",
  },
  {
    name: "Calculator",
    description: "A simple and useful calculator.",
    icon: "🧮",
    path: "/game/calculator",
  },
  {
    name: "Memory Game",
    description: "Test your memory and concentration.",
    icon: "🧠",
    path: "/game/memory",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8F0DF] text-[#4B2E24]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[#D8C3A5]">
        <h1 className="text-2xl font-black tracking-wide">
          Play<span className="text-[#A66A45]">Space</span>
        </h1>

        <span className="hidden sm:block text-sm text-[#806653]">
          Your little world of games
        </span>
      </nav>

      {/* Hero section */}
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#E9D8BD] px-4 py-2 rounded-full text-sm font-semibold mb-5">
            ✨ Welcome to PlaySpace
          </span>

          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Choose your
            <br />
            <span className="text-[#A66A45]">next adventure.</span>
          </h2>

          <p className="text-[#806653] mt-5 max-w-lg mx-auto">
            One place, many projects. Choose a game below
            and jump straight into the fun!
          </p>
        </div>

        {/* Project buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Link
              to={project.path}
              key={project.name}
              className="group text-left bg-[#FFFDF7] border border-[#E3D1B5] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#A66A45] transition-all duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-[#F1E2CA] rounded-2xl text-3xl group-hover:bg-[#E5C8A5] transition-colors">
                {project.icon}
              </div>

              <h3 className="text-xl font-bold mt-6">
                {project.name}
              </h3>

              <p className="text-sm text-[#806653] mt-2 min-h-10">
                {project.description}
              </p>

              <div className="mt-6 w-full rounded-xl bg-[#6F4534] text-[#FFF8EA] py-3 text-center font-semibold group-hover:bg-[#A66A45] transition-colors">
                Open Project →
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-[#806653] mt-14">
          Made with ♥ · Play, explore, and enjoy
        </p>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game/ludo" element={<Ludo />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App
