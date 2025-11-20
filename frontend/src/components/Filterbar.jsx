import React, { useContext } from "react";
import { Appcontext } from "../context/AppContext";

const Filterbar = () => {
  const { language, setLanguage, popularity, setPopularity } = useContext(Appcontext);

  return (
    <div
      className="
        flex justify-between items-center w-full 
        flex-wrap gap-3
        md:flex-nowrap
      "
    >
      {/* Dropdowns */}
      <div
        className="
          flex gap-3 
          w-full md:w-auto 
          flex-wrap md:flex-nowrap
        "
      >
        {/* Language Dropdown */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="
            border border-neutral-700 bg-black/50 text-white text-sm 
            px-2 py-2 w-full md:w-auto
            outline-none cursor-pointer
            hover:border-yellow-600 transition
          "
        >
          <option value="All Languages" className="bg-black text-white">
            All Languages
          </option>
          <option value="Go" className="bg-black text-white">Go</option>
          <option value="TypeScript" className="bg-black text-white">TypeScript</option>
          <option value="JavaScript" className="bg-black text-white">JavaScript</option>
          <option value="Python" className="bg-black text-white">Python</option>
          <option value="Rust" className="bg-black text-white">Rust</option>
          <option value="C%2B%2B" className="bg-black text-white">C++</option>
          <option value="HTML" className="bg-black text-white">HTML</option>
          <option value="Elixir" className="bg-black text-white">Elixir</option>
          <option value="Scala" className="bg-black text-white">Scala</option>
          <option value="Java" className="bg-black text-white">Java</option>
          <option value="Kotlin" className="bg-black text-white">Kotlin</option>
        </select>

        {/* Popularity Dropdown */}
        <select
          value={popularity}
          onChange={(e) => setPopularity(e.target.value)}
          className="
            border border-neutral-700 bg-black/50 text-white text-sm 
            px-2 py-2 w-full md:w-auto
            outline-none cursor-pointer
            hover:border-yellow-600 transition
          "
        >
          <option value="All Popularity" className="bg-black">All Popularity</option>
          <option value="Legendary" className="bg-black">Legendary</option>
          <option value="Famous" className="bg-black">Famous</option>
          <option value="Popular" className="bg-black">Popular</option>
          <option value="Rising" className="bg-black">Rising</option>
        </select>
      </div>
    </div>
  );
};

export default Filterbar;
