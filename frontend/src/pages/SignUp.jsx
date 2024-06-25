import { useState } from "react";
import { useSignUp } from "../Hooks/useSignUp";

export const SignUp=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {signUp,IsLoading,error}=useSignUp();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await signUp(email,password)
    }

    return <>
        <form onSubmit={handleSubmit}>
            <h3>SignUp</h3>
            <label>Email:</label>
            <input 
                type='email'
                onChange={(e)=>{setEmail(e.target.value)}}
                value={email}
            ></input>
            <label>Password:</label>
            <input 
                type='password'
                onChange={(e)=>{setPassword(e.target.value)}}
                value={password}
            ></input>
            <button type='submit' disabled={IsLoading}>SignUp</button>
            {error && <div>{error}</div>}
        </form>
    </>
}

export default SignUp;