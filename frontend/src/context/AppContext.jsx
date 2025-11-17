import axios from 'axios'
import { createContext, useContext,  useState } from 'react'

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
    

    const values = {

        backendUrl,token,signOut,setToken
    }
    return (
        <Appcontext.Provider value={values}>
            {props.children}
        </Appcontext.Provider>
    )
}

export default AppContextProvider