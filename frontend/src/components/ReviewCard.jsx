import { useReviewCardContext } from '../Hooks/useReviewCardContext';
import {useAuthContext} from '../Hooks/useAuthContext';
import Rating from '@mui/material/Rating';

export const ReviewCard=({review})=>{

    return <>
        <div className='w-[60%] hover:scale-105 transition duration-300 min-w-[200px] my-3 min-h-[120px] ml-[1vw] pl-[3vw] sm:pl-[2vw] rounded-md p-[10px] bg-white flex flex-col justify-around hover:bg-gradient-to-r hover:from-[#ffffff] hover:to-[#8decff]'>
        <div className='h-3/5'>
        <p className='text-[var(--secondary-color)] font-semibold text-xl italic'>{review._id.name}</p>
        <p className='text-sm italic'>{review._id.city}</p>
        </div>
        <p className='flex items-end h-2/5'><Rating className='text-blue' value={review.averageRating} readOnly/></p> 
        </div>
    </>
}