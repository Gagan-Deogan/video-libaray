import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"
import { useNavigate  } from "react-router-dom"
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const navigate = useNavigate();
    const [ user, setUser ] = useState();

    useEffect(()=>{
        const isAlreadyLoggedIn = JSON.parse(localStorage.getItem("user"))  ;
        if(!!isAlreadyLoggedIn){
            setUser(isAlreadyLoggedIn)
        }
    },[])

    const handleLogin = async( email, password, from="/" ) =>{
        const res = await axios.post("https://serverjs.gagandeogan.repl.co/logins",{
            email , password 
        },
        { 
            headers: { 'Content-Type': 'application/json' },
            timeout: 2000,
        }
        )
        if(res.status === 200){
            const { userDetails } =  res.data;
            setUser(userDetails)
            localStorage.setItem( "user",JSON.stringify( userDetails ) )
            navigate(from)
        }
    }

    return(
        <AuthContext.Provider value={{
            user, handleLogin
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () =>{
    return useContext(AuthContext)
}