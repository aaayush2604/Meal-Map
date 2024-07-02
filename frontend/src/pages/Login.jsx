import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";
import LoginBg from '../assets/login_bg.jpg';
import { useLayoutContext } from "../Hooks/useLayoutContext";
import {Link} from 'react-router-dom';

export const Login = () => {
  const {login,IsLoading,error}=useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {NavBarExpanded,dispatch}=useLayoutContext();
  const backgroundImage="url('../assets/login_bg.jpg')";
  
  console.log(NavBarExpanded);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email,password);
  };

  return (
    <div className='w-full h-full loginPage flex items-center justify-center'>
      {/* <div><img src={LoginBg} alt="" className={`w-full h-[100vh] z-1 ${NavBarExpanded? 'static bg-cover':'fixed'}`} /></div> */}
      <form className='fixed bg-white mx-auto my-auto  h-[50%] sm:h-[70%] w-[30%] flex flex-col items-center justify-around min-w-60 rounded-md' onSubmit={handleSubmit}>
        <div className='h-1/6 text-[3vw] sm:text-[1vw]'><span className='text-[6vw] sm:text-[3vw] text-[var(--secondary-color)]'>Login</span> to Leave A Review</div>
        <div className=' h-1/6 sm:h-1/5 flex flex-col w-full items-center'>
        <label className='w-[90%] text-left h-1/2 text-[3vw] sm:text-[1.5vw]'>Email:</label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          className='border-black border-[1px] w-[90%] rounded-md h-1/2'
        ></input>
        </div >
        <div className='h-1/6 sm:h-1/5 flex flex-col w-full  items-center'>
        <label className='w-[90%] text-left h-1/2 text-[3vw] sm:text-[1.5vw]'>Password:</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          className='border-black border-[1px] w-[90%] rounded-md h-1/2'
        ></input>
        </div>
        <button type="submit" disabled={IsLoading} className='w-[90%] bg-[var(--secondary-color)] rounded-md h-[10%] text-[3vw] sm:text-[1.5vw]'>Login</button>
        {error && <div className="text-[2vw] sm:text-sm">{error}</div>}
        <div className=' text-[3vw] sm:text-sm p-5 text-center'>Don't Have an Existing Account?<br></br> <Link to='/signup'><span className='text-[var(--secondary-color)]'>Create Account</span></Link></div>
      </form>
    </div>
  );
};

export default Login;
