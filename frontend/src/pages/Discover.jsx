import React, { useContext, useState, useEffect } from 'react'
import { Appcontext } from '../context/AppContext'
import { Search } from 'lucide-react'

const Discover = () => {
  const { repoName, setRepoName, searchList, randomRepo } = useContext(Appcontext)
  const [repoList, setRepoList] = useState([])

  // ✅ FIX: state update inside useEffect
  useEffect(() => {
    if (repoName.trim().length === 0) {
      setRepoList(randomRepo)
    } else {
      setRepoList(searchList)
    }
  }, [repoName, randomRepo, searchList])

  return (
    <div className="text-white px-3 py-6">
      <div className="relative w-[320px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
        <input
          type="text"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          placeholder="Find project according to your niche"
          className="w-full bg-transparent border border-neutral-500 pl-10 pr-3 py-1 outline-none hover:border-yellow-600 transition"
        />
      </div>

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
            <div className="w-1/4 flex items-center space-x-3">
              <img
                src={item.owner.avatar_url}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-white/10 object-cover"
              />
              <a
                href={item.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold hover:underline"
              >
                {item.name}
              </a>
            </div>

            <div className="w-1/6 hidden sm:block text-sm">{item.language}</div>

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

            <div className="w-1/10 text-right hidden lg:block text-sm">
              {item.stars}
            </div>

            <div className="w-1/10 text-right hidden lg:block text-sm">
              {item.fork}
            </div>

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
  )
}

export default Discover
