import {Link} from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';
import {useLogOut} from '../Hooks/useLogOut';
import { useEffect, useState } from 'react';
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { VscSignIn } from "react-icons/vsc";
import { FaHome } from "react-icons/fa";
import { useLayoutContext } from '../Hooks/useLayoutContext';
import { UserProfileBox } from './UserProfileBox';

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
            {Expanded && user &&  <div className='text-white w-full'><UserProfileBox user={user}/></div>}
            <Link to='/' className='text-white w-full flex items-center h-12 hover:text-black hover:bg-white'><FaHome className='w-[30px] h-[30px] m-2'/>{Expanded && <span className='w-3/4 text-center text-[5vw] sm:text-xl'>Home</span>}</Link>
            {user?
            <div className='w-[100%] h-24'>
                <button  className='text-white w-full flex items-center hover:text-black h-12 hover:bg-white' onClick={handleClick}><FiLogOut className='w-[30px] h-[30px] m-2'/>{Expanded && <span className='w-3/4 text-center test-[5vw] sm:text-[1.5vw]'>LogOut</span>}</button>
                <Link to='/user' className='text-white w-full flex items-center hover:bg-white h-12 hover:text-black no-scrollbar'><FaUser className=' w-[30px] h-[30px] m-2 '/>{Expanded && <span className='w-3/4 text-center text-[5vw] sm:text-[1.4vw]'>Your Reviews</span>} </Link>
            </div>
            :
            <div className='w-[100%] h-24'>
                <Link to='/login' className='text-white w-full flex items-center hover:text-black hover:bg-white'><FiLogIn className='w-[30px] h-[30px] m-2'/>{Expanded && <span className='w-3/4 text-center text-[5vw] sm:text-[1.5vw]'>LogIn</span>}</Link>
                <Link to='/signup' className='text-white w-full flex items-center hover:text-black hover:bg-white'><VscSignIn className='w-[30px] h-[30px] m-2'/>{Expanded && <span className='w-3/4 text-center text-[5vw] sm:text-[1.5vw]'>SignIn</span>}</Link>
            </div>}
            </nav>
        }
        
    </>
}