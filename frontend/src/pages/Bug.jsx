import React, { useContext, useState } from 'react'
import { Appcontext } from '../context/AppContext'

const Bug = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [report, setReport] = useState("")
  const [screenshot, setScreenshot] = useState(null)
  const {reportBug} = useContext(Appcontext)

  const convertToBase64 =(e)=> {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onload=()=>{
       setScreenshot(reader.result); 
    }
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()
    reportBug(name,email,report,screenshot)

  }

  return (
    <div className='flex justify-center items-center'>
      <div className="bg-black/60 backdrop-blur-md p-10 mb-6 rounded-xl w-[900%] max-w-xl shadow-xl border border-white/20">

        <h2 className="text-white text-3xl font-medium text-center mb-6">Report</h2>

        <form className="flex flex-col space-y-5" onSubmit={onSubmitHandler}>

          <input 
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="border border-white/40 bg-black/30 text-white placeholder-neutral-500 px-3 py-3 rounded-md focus:outline-none focus:border-white"
          />

          <input 
            type="email"
            placeholder="Wanna hear back? Add your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="border border-white/40 bg-black/30 text-white placeholder-neutral-500 px-3 py-3 rounded-md focus:outline-none focus:border-white"
          />

          <textarea 
            rows="5"
            placeholder="Explain the bug you have encountered..."
            value={report}
            onChange={(e)=>setReport(e.target.value)}
            className="border border-white/40 bg-black/30 text-white placeholder-neutral-500 px-3 py-3 rounded-md focus:outline-none focus:border-white"
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={(e)=>convertToBase64(e)}
            className="border border-white/40 bg-black/30 text-white placeholder-neutral-500 px-3 py-3 rounded-md file:bg-white file:text-black file:px-4 file:py-2 file:rounded-md file:border-none file:mr-4 focus:outline-none focus:border-white"
          />

          <button 
            type="submit" 
            className="bg-gray-800 text-white py-3 rounded-lg hover:bg-white/90 hover:text-black transition font-medium"
          >
            Send Suggestion
          </button>

        </form>

      </div>
    </div>
  )
}

export default Bug
