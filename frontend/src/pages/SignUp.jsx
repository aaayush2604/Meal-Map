import { useState } from "react";
import { useSignUp } from "../Hooks/useSignUp";
import { Link } from "react-router-dom";

export const SignUp=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {signUp,IsLoading,error}=useSignUp();
    const [username,setUsername]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await signUp(email,password,username)
    }

    return <>
        <div className='w-full h-full loginPage flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='fixed bg-white mx-auto my-auto  h-[60%] sm:h-[80%] w-[30%] flex flex-col items-center justify-around min-w-60 rounded-md z-100 text-[4vw] sm:text-[1.3vw]'>
            <div className='h-1/5 text-[3vw] sm:text-[1vw]'><span className='block text-[6vw] sm:text-[3vw] text-[var(--secondary-color)] text-center'>SignUp</span> ...to Start Your Food Adventure</div>
            <div className=' h-[15%] sm:h-1/6 flex flex-col w-full items-center my-1'>
            <label className='w-[90%] text-left h-1/2'>Username:</label>
            <input 
                type='text'
                onChange={(e)=>{setUsername(e.target.value)}}
                value={username}
                className='border-black border-[1px] w-[90%] rounded-md h-1/2'
            ></input>
            </div>
            <div className=' h-[15%] sm:h-1/6 flex flex-col w-full items-center my-1'>
            <label className='w-[90%] text-left h-1/2'>Email:</label>
            <input 
                type='email'
                onChange={(e)=>{setEmail(e.target.value)}}
                value={email}
                className='border-black border-[1px] w-[90%] rounded-md h-1/2'
            ></input>
            </div>
            <div className='h-[15%] sm:h-1/6 flex flex-col w-full items-center my-1'>
            <label className='w-[90%] text-left h-1/2'>Password:</label>
            <input 
                type='password'
                onChange={(e)=>{setPassword(e.target.value)}}
                value={password}
                className='border-black border-[1px] w-[90%] rounded-md h-1/2'
            ></input>
            </div>
            <button type='submit' disabled={IsLoading} className='w-[90%] bg-[var(--secondary-color)] rounded-md h-[8%]'>SignUp</button>
            {error && <div className="text-[2vw] sm:text-sm">{error}</div>}
            <div className=' text-[3vw] sm:text-sm p-5 text-center'>Already Have an Account?<br></br> <Link to='/login'><span className='text-[var(--secondary-color)]'>Log In</span></Link></div>
        </form>
        </div>
    </>
}

export default SignUp;