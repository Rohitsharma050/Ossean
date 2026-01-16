import React, { useContext, useState } from 'react'
import { Appcontext } from '../context/AppContext'
import {toast} from 'react-toastify'
const Feature = () => {
  const { backendUrl } = useContext(Appcontext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await fetch(`${backendUrl}/api/user/suggestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message: suggestion
        })
      })

      const data = await res.json()

      if (data.success) {
        setSuggestion("")
        setEmail("")
        setName("")
        toast.success("Suggestion sent successfully")
      } else {
        toast.error(data.message || "Something went wrong")
      }

    } catch (error) {
      toast.error("Failed to send suggestion")
    } finally {
      setLoading(false)
    }
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
          Suggest a Feature
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
            placeholder="Write your suggestion..."
            required
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="input-style resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="
              mt-2 bg-gray-800 text-white py-3 rounded-lg
              hover:bg-white/90 hover:text-black
              transition font-medium cursor-pointer
            "
          >
            {loading ? "Sending..." : "Send Suggestion"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Feature
