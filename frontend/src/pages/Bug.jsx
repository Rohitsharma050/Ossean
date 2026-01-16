import React, { useContext, useState } from 'react'
import { Appcontext } from '../context/AppContext'
import{ toast } from 'react-toastify'

const Bug = () => {
  const { backendUrl } = useContext(Appcontext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [report, setReport] = useState("")
  const [screenshot, setScreenshot] = useState(null)
  const [loading, setLoading] = useState(false)

  const convertToBase64 = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB")
      return
    }

    setScreenshot(file)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!report.trim()) {
      toast.error("Bug description is required")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("report", report)
      if (screenshot) formData.append("screenshot", screenshot)

      const res = await fetch(`${backendUrl}/api/user/bug`, {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      if (data.success) {
        toast.success("Bug reported successfully")
        setEmail("")
        setName("")
        setReport("")
        setScreenshot(null)
      } else {
        toast.error(data.message || "Something went wrong")
      }

    } catch (error) {
      toast.error("Failed to submit bug report")
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
            disabled={loading}
            className="
              mt-2 bg-gray-800 text-white py-3 rounded-lg
              hover:bg-white/90 hover:text-black
              transition font-medium cursor-pointer
            "
          >
            {loading ? "Sending..." : "Send Report"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Bug
