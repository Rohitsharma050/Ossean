import axios from 'axios'
import { createContext, useContext,  useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export const Appcontext = createContext()

const AppContextProvider = (props)=>{

    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token ,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)

    const signOut = ()=>{
        setToken(false)
        localStorage.removeItem("token")
        navigate('/')
    } 

    const sendSuggestion  = async (name,email,suggestion)=>{
        try {
            const {data} = await axios.post(backendUrl+'/api/user/suggestion',{name,email,suggestion},{headers:{token}})
            if(data.success)
            {
                console.log(data.message)
                toast.success(data.message)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            
            console.log(error.message)
             toast.error(error.message)
        }
    }
    
    const reportBug =  async (name,email,report,screenshot)=>{
        try {
            const {data} = await axios.post(backendUrl+'/api/user/bug',{name,email,report,screenshot},{headers:{token}})
            if(data.success)
            {
                console.log()
                toast.success(data.message)
            }
            else{
                toast.error(data.error)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
        
    }

    const values = {

        backendUrl,token,signOut,setToken,sendSuggestion,reportBug
    }
    return (
        <Appcontext.Provider value={values}>
            {props.children}
        </Appcontext.Provider>
    )
}

export default AppContextProvider