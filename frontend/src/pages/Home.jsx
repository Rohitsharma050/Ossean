import React from 'react'

import Filterbar from '../components/Filterbar'
import { repo } from '../assets/assets'

const Home = () => {
  const list = Array.isArray(repo) ? repo : []

  return (
    <div className="text-white px-3 py-6 ">

      <Filterbar />

      {/* header */}
      <div className="flex items-center bg-black/80 w-full mx-0 py-3 px-4 mt-6 text-sm font-medium">
        <div className="w-1/4">Repository</div>
        <div className="w-1/6 hidden sm:block">Language</div>
        <div className="w-1/4 hidden md:block">Tags</div>
        <div className="w-1/10 text-right hidden lg:block">Stars</div>
        <div className="w-1/10 text-right hidden lg:block">Forks</div>
        <div className="w-1/10 text-right ml-4">Popularity</div>
      </div>

      {/* rows */}
      <div className="divide-y">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-black/70 backdrop-blur-sm py-1 px-2  border border-white/10"
          >
            {/* Repository name + icon placeholder */}
            <div className="w-1/4 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs">
                {item.name?.charAt(0) ?? '?'}
              </div>
              <div>
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-xs text-neutral-400 hidden sm:block">{/* optional subtitle */}</div>
              </div>
            </div>

            {/* Language */}
            <div className="w-1/6 hidden sm:block text-sm">{item.language}</div>

            {/* Tags */}
            <div className="w-1/4 hidden md:flex flex-wrap gap-2">
              {Array.isArray(item.tag) && item.tag.slice(0, 3).map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-md bg-white/6 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Stars */}
            <div className="w-1/10 text-right hidden lg:block text-sm">{item.stars}</div>

            {/* Forks */}
            <div className="w-1/10 text-right hidden lg:block text-sm">{item.fork}</div>

            {/* Popularity badge */}
            <div className="w-1/10 text-right pl-8 hidden lg:block text-sm">
  <span
    className={
      `text-xs font-medium px-3 py-1 rounded-md inline-block ${
        item.popularity === 'Legendary' ? "px-3 py-1 text-xs font-medium rounded-md border border-yellow-600 text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 transition" :
        item.popularity === 'Famous' ? "px-3 py-1 text-xs font-medium rounded-md border border-purple-600 text-purple-500 bg-purple-500/10 hover:bg-purple-500/20 transition" :
        item.popularity === 'Trending' ? "px-3 py-1 text-xs font-medium rounded-md border border-green-600 text-green-500 bg-green-500/10 hover:bg-green-500/20 transition":
        'bg-white/10 text-white border border-white'
      }`
    }
  >
    {item.popularity}
  </span>
</div>

          </div>
        ))}

        {list.length === 0 && (
          <div className="text-center text-neutral-400 py-8">No repositories to show.</div>
        )}
      </div>
    </div>
  )
}

export default Home
