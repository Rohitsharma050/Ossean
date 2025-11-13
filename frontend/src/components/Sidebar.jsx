export default function Sidebar() {
  return (
    <div className="fixed  left-0 h-screen w-55 
                    bg-black/30 backdrop-blur-xl 
                    border-r border-white/10 
                    shadow-xl text-gray-300 
                    py-25 px-8 z-40">

      <h1 className="text-xs text-gray-500 mb-4">GENERAL</h1>

      <div className="flex flex-col gap-4 mb-10">
        <p className="hover:text-white cursor-pointer">Home</p>
        <p className="hover:text-white cursor-pointer">Trending</p>
        <p className="hover:text-white cursor-pointer">Discover</p>
      </div>

      <h1 className="text-xs text-gray-500 mb-4">SOCIAL</h1>

      <div className="flex flex-col gap-4">
        <p className="hover:text-white cursor-pointer">GitHub</p>
      </div>

    </div>
  )
}
