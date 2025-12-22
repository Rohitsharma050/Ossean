import { useContext, useEffect, useState } from 'react'
import statue from '../assets/statue.png'
import googleIcon from '../assets/googleIcon.png'
import { Navigate, useNavigate } from 'react-router-dom'
import { Appcontext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {backendUrl,token,setToken} = useContext(Appcontext)
    const navigate= useNavigate()
    const onSubmitHandler = async (e)=>{
          e.preventDefault()
        try {
            if(isLogin)
            {
                const {data} = await axios.post(backendUrl+'/api/user/login',{email,password})
                if(data.success)
                {
                    
                    localStorage.setItem('token',data.token)
                    setToken(data.token)
                }
                else{
                    toast.error(data.message)
                }
            }
            else{
                const {data} = await axios.post(backendUrl+'/api/user/register',{name,email,password})
                if(data.success)
                {
                    const token = data.token
                    localStorage.setItem('token',token)
                    setToken(token)
                }
                else{
                    toast.error(data.message)
                }
            }
                
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(token)
        {
            navigate('/home')
        }
    },[token])

   const handleCredential = async (response) => {
  try {
    const googleToken = response?.credential; // ✅ FIXED

    const res = await axios.post(
      backendUrl + "/api/user/googleLogin",
      { googleToken }
    );

    if (res.data.success) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Google login failed");
  }
};

   useEffect(() => {
    if (!window.google) return;
  
    window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredential,
    });
}, []);


const handleGoogleLogin = () => {
    if (!window.google) {
        toast.error("Google not loaded yet");
        return;
    }
    window.google.accounts.id.prompt();
};

  
 return (
    
    <form  onSubmit={onSubmitHandler}>

    <div className="relative bg-black min-h-screen overflow-hidden flex justify-center items-center">
        <img
            src={statue}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 flex flex-col justify-center items-center text-center">
            <p className="text-neutral-400 tracking-[0.4em] mb-6 text-sm">WELCOME</p>
            <div onClick={handleGoogleLogin} className='bg-white px-8 py-1 flex gap-2 text-sm cursor-pointer  font-semibold  hover:bg-white/90 hover:text-black transition'>
                <img src={googleIcon} alt="" className='w-5 ' />
                <p>Continue with Google</p>
            </div>
              
            <div className="bg-white/11000  text-white backdrop-blur-md rounded-sm shadow-lg w-[380px] px-6 py-8">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isLogin ? 'Login' : 'Register'}
                </h2>

                {!isLogin && (
                    <div className="mb-4  text-white flex flex-col items-start">
                        <label htmlFor="name" className="block text-sm  mb-1">Name</label>
                        <input
                            type="text"
                            id="name" onChange={(e)=>setName(e.target.value)}
                            value={name} required
                            className="border border-gray-300  w-full p-2 outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                )}

                <div className="mb-4 flex  text-white flex-col items-start">
                    <label htmlFor="email" className="block text-sm mb-1">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                         onChange={(e)=>setEmail(e.target.value)}
                        className="border border-gray-300  w-full p-2 outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div className="mb-6  text-white flex flex-col items-start">
                    <label htmlFor="password" className="block text-sm  mb-1">Password</label>
                    <input
                        type="password"
                        id="password" value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="border border-gray-300  w-full p-2 outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div className='flex flex-col gap-2'>
                       <button
                    type='submit'
                    className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-white/90 hover:text-black transition"
                >
                    {isLogin ? 'Login' : 'Register'}
                </button>
                   <button
                   type='button'
                   onClick={()=>setToken(true) }
                    
                    className="w-full bg-gray-800 text-white py-2  rounded-lg hover:bg-white/90 hover:text-black transition"
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
