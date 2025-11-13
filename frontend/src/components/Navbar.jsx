import React from 'react'

const Navbar = () => {
  return (
   <div className="fixed top-0 left-0 w-full flex px-12 py-3 
                    backdrop-blur-xl bg-black/10 
                    border-b border-black/20 shadow-lg 
                    z-50">
      <h1 className="text-white tracking-tight text-3xl font-serif">
        Oss<span className="text-neutral-300 tracking-tight text-3xl">ean</span>
      </h1>
    </div>
  )
}

export default Navbar