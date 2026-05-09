import React, { useContext } from 'react'
import { Appcontext } from '../context/AppContext'
import { Search } from 'lucide-react'
const SearchBar = ({placeholder,keyword,setKeyword}) => {
   
  return (
    <div className="relative w-full sm:max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          size={18}
        />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={placeholder}
          className={`
          text-white w-full bg-transparent border border-neutral-500
            pl-10 pr-3 py-2 outline-none 
            hover:border-yellow-600 transition
             placeholder:text-neutral-400
          `}
        />
      </div>
  )
}

export default SearchBar