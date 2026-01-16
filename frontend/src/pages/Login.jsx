import { useContext, useState } from 'react'
import statue from '../assets/statue.png'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isGuestLogin, setIsGuestLogin] = useState(false)
  const [loading, setLoading] = useState(false)

  const { backendUrl, setToken } = useContext(Appcontext)
  const navigate = useNavigate()
  // ================= NORMAL / GUEST / REGISTER =================
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (loading) return

    try {
      setLoading(true)

      if (isGuestLogin) {
        const { data } = await axios.post(
          backendUrl + '/api/user/login',
          { email, password }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          navigate('/home')
        } else {
          toast.error(data.message)
        }
      }

      else if (isLogin) {
        const { data } = await axios.post(
          backendUrl + '/api/user/login',
          { email, password }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          navigate('/home')
        } else {
          toast.error(data.message)
        }
      }

      else {
        const { data } = await axios.post(
          backendUrl + '/api/user/register',
          { name, email, password }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          navigate('/home')
        } else {
          toast.error(data.message)
        }
      }

    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
      setIsGuestLogin(false)
    }
  }

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async (credential) => {
    if (loading) return

    try {
      setLoading(true)

      const { data } = await axios.post(
        backendUrl + "/api/user/google",
        { credential }
      )

      if (data.success) {
        localStorage.setItem("token", data.token)
        setToken(data.token)
        navigate("/home")
      } else {
        toast.error(data.message)
      }

    } catch {
      toast.error("Google login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler}>

      {/* 🔄 GLOBAL LOADER OVERLAY */}
      {loading && (
      <div className="fixed inset-0 z-50 flex flex-col gap-6 items-center justify-center bg-black/80">
      <div className="w-6 h-6 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
    </div>
      )}
      <div className="relative bg-black min-h-screen overflow-hidden flex justify-center items-center">
        <img
          src={statue}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        <div className="relative z-10 flex flex-col justify-center items-center text-center">
          <p className="text-neutral-400 tracking-[0.4em] mb-6 text-sm">
            WELCOME
          </p>
          {/* GOOGLE LOGIN */}
          <div className="mb-2 px-10">
            <GoogleLogin
              onSuccess={(res) => handleGoogleLogin(res.credential)}
              onError={() => toast.error("Google login failed")}
            />
          </div>
          <div className="bg-white/11000 text-white backdrop-blur-md rounded-sm shadow-lg w-[380px] px-6 py-8">
            <h2 className="text-2xl font-semibold text-center mb-6">
              {isLogin ? 'Login' : 'Register'}
            </h2>
            {!isLogin && (
              <div className="mb-4 flex flex-col items-start">
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border border-gray-300 w-full p-2 outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            )}
            <div className="mb-4 flex flex-col items-start">
              <label className="block text-sm mb-1">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 w-full p-2 outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="mb-6 flex flex-col items-start">
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 w-full p-2 outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-white/90 hover:text-black transition disabled:opacity-50"
              >
                {loading ? "Signing in..." : isLogin ? "Login" : "Register"}
              </button>
              <button
                type="submit"
                disabled={loading}
                onClick={() => {
                  setIsGuestLogin(true)
                  setEmail("guest@example.com")
                  setPassword("12345678")
                }}
                className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-white/90 hover:text-black transition disabled:opacity-50"
              >
                Guest login
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 cursor-pointer hover:underline"
              >
              {isLogin ? 'Register' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
export default Login
