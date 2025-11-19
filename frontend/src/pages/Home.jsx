import React, { useContext } from "react";
import Filterbar from "../components/Filterbar";
import { Appcontext } from "../context/AppContext";

const Home = () => {
  const { repoList } = useContext(Appcontext);

  return (
    <div className="text-white px-3 py-6">
      <Filterbar />

      <div className="flex items-center bg-black/80 w-full py-3 px-4 mt-6 text-sm font-medium">
        <div className="w-1/4">Repository</div>
        <div className="w-1/6 hidden sm:block">Language</div>
        <div className="w-1/4 hidden md:block">Tags</div>
        <div className="w-1/10 text-right hidden lg:block">Stars</div>
        <div className="w-1/10 text-right hidden lg:block">Forks</div>
        <div className="w-1/10 text-right ml-4">Popularity</div>
      </div>

      <div className="divide-y">
        {repoList.map((item, index) => (
  <div
    key={index}
    className="flex items-center bg-black/70 backdrop-blur-sm py-2 px-2 border border-white/10"
  >
    {/* Profile Image + Repo Name */}
    <div className="w-1/4 flex items-center space-x-3">
      
      {/* GitHub Profile Picture */}
      <img
        src={item.owner.avatar_url}
        alt="avatar"
        className="w-8 h-8 rounded-full border border-white/10 object-cover"
      />

      <div>
        {/* Clickable Repo Name */}
        <a
          href={item.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold hover:underline"
        >
          {item.name}
        </a>
      </div>
    </div>

    {/* Language */}
    <div className="w-1/6 hidden sm:block text-sm">{item.language}</div>

    {/* Tags */}
    <div className="w-1/4 hidden md:flex flex-wrap gap-2">
      {item.tag?.slice(0, 3).map((t, i) => (
        <span
          key={i}
          className="text-xs px-2 py-1 rounded-md bg-white/10 border border-white/20"
        >
          {t}
        </span>
      ))}
    </div>

    {/* Stars */}
    <div className="w-1/10 text-right hidden lg:block text-sm">
      {item.stars}
    </div>

    {/* Forks */}
    <div className="w-1/10 text-right hidden lg:block text-sm">
      {item.fork}
    </div>

    {/* Popularity Badge */}
    <div className="w-1/10 text-right pl-8 hidden lg:block text-sm">
      <span
        className={`px-3 py-1 text-xs rounded-md border ${
          item.popularity === "Legendary"
            ? "border-yellow-600 text-yellow-400 bg-yellow-600/10"
            : item.popularity === "Famous"
            ? "border-purple-600 text-purple-400 bg-purple-600/10"
            : item.popularity === "Popular"
            ? "border-green-600 text-green-400 bg-green-600/10"
            : "border-gray-600 text-gray-300 bg-gray-600/10"
        }`}
      >
        {item.popularity}
      </span>
    </div>
  </div>
))}


        {repoList.length === 0 && (
          <div className="text-center text-neutral-400 py-8">
            No repositories to show.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
