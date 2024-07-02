import { useLayoutContext } from '../Hooks/useLayoutContext';
import logo from '../assets/logo.png';
import { RiMenu3Fill } from "react-icons/ri";
import { useState,useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { useAuthContext } from '../Hooks/useAuthContext';
import { useLogOut } from '../Hooks/useLogOut';
import { Link } from 'react-router-dom';

export const Logo=()=>{
    const [ShowNavBar,SetShowNavBar]=useState(true);
    const [displayMenu,setDisplayMenu]=useState(false);
    const {user}=useAuthContext();
    const {logout}=useLogOut();

    useEffect(()=>{
        if(window.innerWidth<500){
            SetShowNavBar(false);
        }
    },[])

    window.addEventListener("resize",()=>{
        if(window.innerWidth<500){
            SetShowNavBar(false);
        }else{
            SetShowNavBar(true);
        }
    })

    const handleClick=()=>{
        logout();
    }

    return <>
        <div className={`w-full h-32 flex items-center ${!ShowNavBar && 'justify-between'}`}>
            <img src={logo} alt="" className='h-full' />
            <div className='text-[8vw] sm:text-[5vw] font-[Font1] text-[var(--primary-color)] '>Meal Map</div>
            {!ShowNavBar && <div >
                {displayMenu?
                    <IoMdClose className='w-[25px] h-[25px] m-2 text-black' onClick={()=>setDisplayMenu(false)}/>
                        :
                    <RiMenu3Fill className='w-[25px] h-[25px] m-2 text-black' onClick={()=>setDisplayMenu(true)}/>
                }           
                </div>}
            {!ShowNavBar && displayMenu && 
                <div className='miniNav  fixed right-3 top-[12vh] bg-[var(--primary-color)] w-[30vw] h-[25vh] rounded-md' onClick={()=>setDisplayMenu(false)}>
                     <Link to='/' className='text-white w-full flex items-center h-10 hover:text-black hover:bg-white'> <span className='w-full text-center text-[5vw] sm:text-xl'>Home</span></Link>
                    {user?
                        <div className='w-[100%] flex  flex-col justify-start'>
                        <button  className='text-white w-full flex items-center hover:text-black h-10 hover:bg-white' onClick={handleClick}><span className='w-full text-center test-[5vw] sm:text-xl'>LogOut</span></button>
                        <Link to='/user' className='text-white w-full flex items-center hover:bg-white h-10 hover:text-black'><span className='w-full text-center text-[5vw] sm:text-xl'>User</span> </Link>
                        </div>
                        :
                        <div className='w-[100%] flex flex-col justify-start'>
                        <Link to='/login' className='text-white w-full flex items-center hover:text-black hover:bg-white h-10'><span className='w-full text-center text-[5vw] sm:text-xl'>LogIn</span></Link>
                        <Link to='/signup' className='text-white w-full flex items-center hover:text-black hover:bg-white h-10'><span className='w-full text-center text-[5vw] sm:text-xl'>SignIn</span></Link>
                        </div>
                    }
                </div>
            }
        </div>
    </>
}