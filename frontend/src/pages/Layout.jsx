import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import bgImage from "../assets/bluePurpleYellowGradient.png"
import { useContext, useState } from "react"
import { Appcontext } from "../context/AppContext"

export default function Layout() {
  const { token } = useContext(Appcontext)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (!token) return null

  return (
    <div className="relative min-h-screen bg-black">
      
      {/* Background Image */}
     <div
  className="fixed inset-0 bg-center bg-cover opacity-60"
  style={{ backgroundImage: `url(${bgImage})` }}
/>


      {/* Content Wrapper */}
      <div className="relative z-10">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />


        <div className="flex">
          
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            closeSidebar={() => setIsSidebarOpen(false)}
          />

          {/* Main Content */}
          <main className="flex-1 pt-20 px-4 md:px-6 lg:ml-60">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  )
}
