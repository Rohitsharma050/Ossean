import React from 'react'

const Feature = () => {
  return (
   
      <div className='flex justify-center items-center'>

      <div className="bg-black/60  backdrop-blur-md p-10 mb-6 rounded-xl w-[900%] max-w-xl shadow-xl border border-white/20">

        <h2 className="text-white text-3xl font-medium text-center mb-6">Suggestion </h2>

        <form className="flex flex-col  space-y-5">

          <input 
            type="text" 
            placeholder="Name " 
            className="border border-white/40 bg-black/30 text-white placeholder-neutral-500 px-3 py-3 rounded-md focus:outline-none focus:border-white"
          />

          <input 
            type="email" 
            placeholder="Wanna hear back? Add your email" 
            className="border border-white/40 bg-black/30 text-white placeholder-neutral-500 px-3 py-3 rounded-md focus:outline-none focus:border-white"
          />

          <textarea 
            placeholder="Write your suggestion..."
            rows="5"
            className="border border-white/40 bg-black/30 text-white placeholder-neutral-500 px-3 py-3 rounded-md focus:outline-none focus:border-white"
          ></textarea>

          <button 
            type="submit" 
            className="bg-gray-800 text-white py-3  rounded-lg hover:bg-white/90 hover:text-black transition font-medium"
          >
            Send Suggestion
          </button>

        </form>

      </div>
      </div>

   
  )
}

export default Feature
