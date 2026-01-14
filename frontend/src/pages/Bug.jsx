import React, { useContext, useState } from 'react'
import { Appcontext } from '../context/AppContext'

const Bug = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [report, setReport] = useState("")
  const [screenshot, setScreenshot] = useState(null)
  const convertToBase64 = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setScreenshot(reader.result)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setEmail("")
    setName("")
    setReport("")
    setScreenshot(null)
  }

  return (
    <div className="min-h-screen flex justify-center items-start
                    pt-24 pb-10 px-4 sm:px-6">

      <div
        className="
          bg-black/60 backdrop-blur-md
          p-5 sm:p-8
          w-full max-w-xl
          rounded-xl shadow-xl
          border border-white/20
        "
      >
        <h2 className="text-white text-2xl sm:text-3xl font-medium text-center mb-6">
          Report a Bug
        </h2>

        <form
          className="flex flex-col gap-4 sm:gap-5"
          onSubmit={onSubmitHandler}
        >
          <input
            type="text"
            placeholder="Name (Optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-style"
          />

          <input
            type="email"
            placeholder="Wanna hear back? Add your email (Optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-style"
          />

          <textarea
            rows="5"
            placeholder="Explain the bug you have encountered..."
            value={report}
            onChange={(e) => setReport(e.target.value)}
            className="input-style resize-none"
          />

          <input
            type="file"
            accept="image/*"
            onChange={convertToBase64}
            className="
              input-style
              file:bg-white file:text-black
              file:px-3 file:py-2 file:rounded-md
              file:border-none file:mr-3
              text-sm
            "
          />

          <button
            type="submit"
            className="
              mt-2 bg-gray-800 text-white py-3 rounded-lg
              hover:bg-white/90 hover:text-black
              transition font-medium
            "
          >
            Send Report
          </button>
        </form>
      </div>
    </div>
  )
}

export default Bug
