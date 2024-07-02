import { FaRegUser, FaRegUserCircle } from "react-icons/fa";

export const UserProfileBox=({user})=>{
    return <div className='w-full h-full p-[10px] flex flex-col items-center justify-around border-4 border-[var(--primary-color)]'>
        <FaRegUserCircle className='h-[60%] w-auto'/>
        <div>{user.username}</div>
    </div>
}