import { NavLink } from "react-router-dom"
import { Home, Flame, ChevronLeft, Compass, Lightbulb, Bug, Github, Linkedin, Mail, LogOut } from "lucide-react"
import { useContext } from "react"
import { Appcontext } from "../context/AppContext"

export default function Sidebar() {

  const {signOut} = useContext(Appcontext)
  return (
    <div className="fixed left-0 top-0 h-screen w-56
                    bg-black/30 backdrop-blur-xl 
                    border-r border-white/10 
                    shadow-xl text-gray-300 
                    py-14 px-6 z-40">

      <div>

        {/* Arrow Top Right */}
        <div className="flex justify-end mb-1">
          <ChevronLeft 
            size={20} 
            className="cursor-pointer text-gray-300 hover:text-white"
          />
        </div>

        {/* GENERAL */}
        <h1 className="text-xs text-gray-500 mb-2 tracking-wide">GENERAL</h1>

        <div className="flex flex-col gap-1 mb-10">

          {/* HOME */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `px-3 py-1 flex items-center gap-2 text-sm transition-all duration-200 hover:text-white
              ${
                isActive
                  ? "text-white border border-neutral-600"
                  : "text-neutral-400 border border-transparent"
              }`
            }
          >
            <Home size={16} />
            Home
          </NavLink>

          {/* TRENDING */}
          <NavLink
            to="/trending"
            className={({ isActive }) =>
              `px-3 py-1 flex items-center gap-2 text-sm transition-all duration-200 hover:text-white
              ${
                isActive
                  ? "text-white border border-neutral-600"
                  : "text-neutral-400 border border-transparent"
              }`
            }
          >
            <Flame size={16} />
            Trending
          </NavLink>

          {/* DISCOVER */}
          <NavLink
            to="/discover"
            className={({ isActive }) =>
              `px-3 py-1 flex items-center gap-2 text-sm transition-all duration-200 hover:text-white
              ${
                isActive
                  ? "text-white border border-neutral-600"
                  : "text-neutral-400 border border-transparent"
              }`
            }
          >
            <Compass size={16} />
            Discover
          </NavLink>

        </div>

        {/* FEEDBACK */}
        <h1 className="text-xs text-gray-500 mb-2 tracking-wide">FEEDBACK</h1>

        <div className="flex flex-col gap-1 mb-10">

          {/* FEATURE */}
          <NavLink
            to="/feature"
            className={({ isActive }) =>
              `px-3 py-1 flex items-center gap-2 text-sm transition-all duration-200 hover:text-white
              ${
                isActive
                  ? "text-white border border-neutral-600"
                  : "text-neutral-400 border border-transparent"
              }`
            }
          >
            <Lightbulb size={16} />
            Suggest Feature
          </NavLink>

          {/* BUG */}
          <NavLink
            to="/bug"
            className={({ isActive }) =>
              `px-3 py-1 flex items-center gap-2 text-sm transition-all duration-200 hover:text-white
              ${
                isActive
                  ? "text-white border border-neutral-600"
                  : "text-neutral-400 border border-transparent"
              }`
            }
          >
            <Bug size={16} />
            Report Bug
          </NavLink>

        </div>

        {/* SOCIAL */}
        <h1 className="text-xs text-gray-500 mb-2 tracking-wide">SOCIAL</h1>

        <div className="flex flex-col gap-1">

          <a
            href="https://github.com/Rohitsharma050" target="blank"
            className="px-3 py-1 flex items-center gap-2 text-neutral-400 
                       hover:text-white transition-all duration-200 text-sm"
          >
            <Github size={16} />
            Github
          </a>

          <a
            href="https://www.linkedin.com/in/rohitsharma50/" target="blank"
            className="px-3 py-1 flex items-center gap-2   text-neutral-400 
                       hover:text-white transition-all duration-200 text-sm"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>

          <a
            href="mailto:rohitsharmasa120111@gmail.com" target = "blank"
            className="px-3 py-1 flex items-center gap-2 text-neutral-400 
                       hover:text-white transition-all duration-200 text-sm"
          >
            <Mail size={16} />
            Email
          </a>

        </div>

        {/* SIGN OUT */}
        <button onClick={signOut} className="text-sm text-neutral-400 mt-10 cursor-pointer hover:text-white flex items-center gap-2">
          <LogOut size={16} />
          Sign Out
        </button>

      </div>
    </div>
  )
}
