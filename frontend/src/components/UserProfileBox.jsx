import { FaRegUser, FaRegUserCircle } from "react-icons/fa";

export const UserProfileBox=({user})=>{
    return <div className='w-full h-[40vh] p-[10px] flex flex-col items-center justify-around'>
        <FaRegUserCircle className='h-[60%] w-auto'/>
        <div>{user.username}</div>
    </div>
}