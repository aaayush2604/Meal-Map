import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp=()=>{
    const [error,setError]=useState('');
    const [IsLoading,setIsLoading]=useState(null);
    const {dispatch}=useAuthContext();

    const signUp=async(email,password,username)=>{
        setIsLoading(true);
        setError(null);

        const response=await fetch('http://localhost:5000/user/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password,username}),
        })
        const json=await response.json();
        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user',JSON.stringify(json))
            //update Auth Context
            dispatch({type:'LOGIN',payload:json});
            setIsLoading(false);
        }
    }
    return {signUp,IsLoading,error};
}

