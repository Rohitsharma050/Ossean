import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import bgImage from "../assets/bluePurpleYellowGradient.png"
import { useContext } from "react"
import { useState } from "react"

export default function Layout() {

    const [token,setToken] = useState(true)
  return token &&  (
    <div
      className="relative min-h-screen bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})`, opacity:60 }}
    >
      <Navbar />
      <Sidebar />
      <div className="ml-60 pt-20 px-6">
        <Outlet />
      </div>
    </div>
  )
}
