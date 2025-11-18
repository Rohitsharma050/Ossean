import React, { useContext, useState } from 'react'
import { Appcontext } from '../context/AppContext'

const Feature = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [suggestion,setSuggestion] = useState()
  const {sendSuggestion} = useContext(Appcontext)
  const onSubmitHandler =(e)=>{
    e.preventDefault()
    sendSuggestion(name,email,suggestion)

  }
  return (
   
      <div className='flex justify-center items-center'>

      <div className="bg-black/60  backdrop-blur-md p-10 mb-6 rounded-xl w-[900%] max-w-xl shadow-xl border border-white/20">

        <h2 className="text-white text-3xl font-medium text-center mb-6">Suggestion </h2>

        <form className="flex flex-col  space-y-5" onSubmit={onSubmitHandler}>

          <input 
            type="text" 
            placeholder="Name "  onChange={(e)=>{setName(e.target.value)}} value={name}
            className="border border-white/40 bg-black/30 text-white placeholder-neutral-500 px-3 py-3 rounded-md focus:outline-none focus:border-white"
          />

          <input 
            type="email" 
            placeholder="Wanna hear back? Add your email" onChange={(e)=>{setEmail(e.target.value)}} value={email}
            className="border border-white/40 bg-black/30 text-white placeholder-neutral-500 px-3 py-3 rounded-md focus:outline-none focus:border-white"
          />

          <textarea 
            placeholder="Write your suggestion..."
            rows="5" required onChange={(e)=>{setSuggestion(e.target.value)}} value={suggestion}
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
