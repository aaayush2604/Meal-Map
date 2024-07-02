import {Link} from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';
import {useLogOut} from '../Hooks/useLogOut';
import { useEffect, useState } from 'react';
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { VscSignIn } from "react-icons/vsc";
import { FaHome } from "react-icons/fa";
import { useLayoutContext } from '../Hooks/useLayoutContext';


export const Navbar=()=>{
    const {user}=useAuthContext();
    const {logout}=useLogOut();
    const {NavBarExpanded,dispatch}=useLayoutContext();
    const [showNavBar,setShowNavBar]=useState(true);
    const [Expanded,setExpanded]=useState(false);
    const handleMouseEnter=()=>{
        setExpanded(true);
        dispatch({type:'UPDATE_LAYOUT',payload:{NavBarExpanded:true}})
    }
    const handleMouseLeave=()=>{
        setExpanded(false);
        dispatch({type:'UPDATE_LAYOUT',payload:{NavBarExpanded:false}})
    }

    const handleClick=()=>{
        logout();
    }

    useEffect(()=>{
        if(window.innerWidth<500){
            setShowNavBar(false);
            dispatch({type:'UPDATE_LAYOUT',payload:{ShowNavBar:false}})
        }
    },[])

    window.addEventListener("resize",()=>{
        if(window.innerWidth<500){
            setShowNavBar(false);
        }else{
            setShowNavBar(true);
        }
    })

    return <>
        {
            showNavBar &&
            <nav className={` navbar h-screen flex flex-col items-start justify-start bg-[var(--primary-color)] shadow-md duration-300 ease-in-out ${Expanded ? 'fixed w-36 sm:w-64 ' : 'w-16 z-1'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {Expanded && user &&  <div className='text-white'>{user.email}</div>}
            <Link to='/' className='text-white w-full flex items-center h-12 hover:text-black hover:bg-white'><FaHome className='w-[30px] h-[30px] m-2'/>{Expanded && <span className='w-1/2 text-center text-[5vw] sm:text-xl'>Home</span>}</Link>
            {user?
            <div className='w-[100%] h-24'>
                <button  className='text-white w-full flex items-center hover:text-black h-12 hover:bg-white' onClick={handleClick}><FiLogOut className='w-[30px] h-[30px] m-2'/>{Expanded && <span className='w-1/2 text-center test-[5vw] sm:text-xl'>LogOut</span>}</button>
                <Link to='/user' className='text-white w-full flex items-center hover:bg-white h-12 hover:text-black'><FaUserCircle className=' w-[30px] h-[30px] m-2'/>{Expanded && <span className='w-1/2 text-center text-[5vw] sm:text-xl'>User</span>} </Link>
            </div>
            :
            <div className='w-[100%] h-24'>
                <Link to='/login' className='text-white w-full flex items-center hover:text-black hover:bg-white'><FiLogIn className='w-[30px] h-[30px] m-2'/>{Expanded && <span className='w-1/2 text-center text-[5vw] sm:text-xl'>LogIn</span>}</Link>
                <Link to='/signup' className='text-white w-full flex items-center hover:text-black hover:bg-white'><VscSignIn className='w-[30px] h-[30px] m-2'/>{Expanded && <span className='w-1/2 text-center text-[5vw] sm:text-xl'>SignIn</span>}</Link>
            </div>}
            </nav>
        }
        
    </>
}