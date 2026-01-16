import { Menu } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom"

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate()
  return (
    <div
      className="fixed top-0 left-0 w-full flex items-center
                 px-4 sm:px-8 py-3
                 backdrop-blur-xl bg-black/10
                 border-b border-black/20 shadow-lg
                 z-50"
    >
      {/* Hamburger - mobile only */}
      <button
        onClick={toggleSidebar}
        className="mr-4 text-white lg:hidden"
      >
        <Menu size={26} />
      </button>

      {/* Logo */}
      
      <h1 className="text-white tracking-tight text-3xl font-serif cursor-pointer">
        Oss<span className="text-neutral-300 tracking-tight text-3xl cursor-pointer">ean</span>
      </h1>
    
    </div>
  )
}

export default Navbar
