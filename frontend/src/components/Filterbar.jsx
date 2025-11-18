import React from "react";
import { Search } from "lucide-react"; // Make sure lucide-react is installed

const Filterbar = () => {
  return (
    <div className="flex justify-between items-center w-full">

      {/* Search Box */}
      <div className="relative w-[40%]">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />

        <input
          type="text"
          placeholder="Curate Open Source projects easily"
          className="border border-neutral-700 bg-black/50 text-sm w-full pl-8 pr-3 py-1 
                     text-white outline-none 
                     focus:border-yellow-600 transition"
        />
      </div>

      {/* Dropdowns */}
      <div className="flex gap-3">

        {/* Language Dropdown */}
        <select
          className="border border-neutral-700 bg-black/50 text-white text-sm px-2 py-1 
                      outline-none cursor-pointer
                     hover:border-yellow-600 transition"
        >
          <option className="bg-black text-white">All Languages</option>
          <option className="bg-black text-white">Go</option>
          <option className="bg-black text-white">TypeScript</option>
          <option className="bg-black text-white">JavaScript</option>
          <option className="bg-black text-white">Python</option>
          <option className="bg-black text-white">Rust</option>
          <option className="bg-black text-white">C++</option>
          <option className="bg-black text-white">HTML</option>
          <option className="bg-black text-white">Elixir</option>
          <option className="bg-black text-white">Scala</option>
          <option className="bg-black text-white">Java</option>
          <option className="bg-black text-white">Kotlin</option>
        </select>

        {/* Popularity Dropdown */}
        <select
          className="border border-neutral-700 bg-black/50 text-white text-sm px-2 py-1 
                     outline-none cursor-pointer
                     hover:border-yellow-600 transition"
        >
          <option className="bg-black">All Popularity</option>
          <option className="bg-black ">Legendary</option>
          <option className="bg-black">Famous</option>
          <option className="bg-black">Popular</option>
          <option className="bg-black">Rising</option>
        </select>

      </div>
    </div>
  );
};

export default Filterbar;
