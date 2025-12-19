import { NavLink } from "react-router-dom"
import {
  Home,
  Flame,
  ChevronLeft,
  Compass,
  Lightbulb,
  Bug,
  Github,
  Linkedin,
  Mail,
  LogOut
} from "lucide-react"
import { useContext } from "react"
import { Appcontext } from "../context/AppContext"

export default function Sidebar({ isOpen, closeSidebar }) {
  const { signOut } = useContext(Appcontext)

  return (
    <>
      {/* Overlay (mobile only) */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity lg:hidden
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-5 h-screen w-56
        bg-black/30 backdrop-blur-xl
        border-r border-white/10
        shadow-xl text-gray-300
        py-14 px-6 z-40
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Close button (mobile) */}
        <div className="flex justify-end mb-2 lg:hidden">
          <ChevronLeft
            size={20}
            onClick={closeSidebar}
            className="cursor-pointer hover:text-white"
          />
        </div>

        {/* GENERAL */}
        <h1 className="text-xs text-gray-500 mb-2 tracking-wide">GENERAL</h1>

        <div className="flex flex-col gap-1 mb-10">
          <NavItem to="/home" icon={<Home size={16} />} text="Home" onClick={closeSidebar} />
          <NavItem to="/trending" icon={<Flame size={16} />} text="Trending" onClick={closeSidebar} />
          <NavItem to="/discover" icon={<Compass size={16} />} text="Discover" onClick={closeSidebar} />
        </div>

        {/* FEEDBACK */}
        <h1 className="text-xs text-gray-500 mb-2 tracking-wide">FEEDBACK</h1>

        <div className="flex flex-col gap-1 mb-10">
          <NavItem to="/feature" icon={<Lightbulb size={16} />} text="Suggest Feature" onClick={closeSidebar} />
          <NavItem to="/bug" icon={<Bug size={16} />} text="Report Bug" onClick={closeSidebar} />
        </div>

        {/* SOCIAL */}
        <h1 className="text-xs text-gray-500 mb-2 tracking-wide">SOCIAL</h1>

        <div className="flex flex-col gap-1">
          <SocialLink href="https://github.com/Rohitsharma050" icon={<Github size={16} />} text="Github" />
          <SocialLink href="https://www.linkedin.com/in/rohitsharma50/" icon={<Linkedin size={16} />} text="LinkedIn" />
          <SocialLink href="mailto:rohitsharmasa120111@gmail.com" icon={<Mail size={16} />} text="Email" />
        </div>

        {/* SIGN OUT */}
        <button
          onClick={() => {
            closeSidebar()
            signOut()
          }}
          className="text-sm text-neutral-400 mt-10 hover:text-white flex items-center gap-2"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </>
  )
}

/* Reusable components */

function NavItem({ to, icon, text, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `px-3 py-1 flex items-center gap-2 text-sm 
        ${isActive ? "text-white border border-neutral-600" : "text-neutral-400"}
        hover:text-white`
      }
    >
      {icon}
      {text}
    </NavLink>
  )
}

function SocialLink({ href, icon, text }) {
  return (
    <a
      href={href}
      target="_blank"
      className="px-3 py-1 flex items-center gap-2 text-neutral-400 hover:text-white text-sm"
    >
      {icon}
      {text}
    </a>
  )
}
