import React, { useState } from 'react'
import { useReviewCardContext } from '../Hooks/useReviewCardContext';
import { useGroupedData } from '../Hooks/useGroupedData';
import {useAuthContext} from '../Hooks/useAuthContext';
import Rating from '@mui/material/Rating';

const ReviewCardForm =({handleClick}) => {
    const [Name,setName]=useState('');
    const [City,setCity]=useState('');
    const [Stars,setStars]=useState(0);
    const {reviews,OutputReviews,dispatch}=useReviewCardContext();
    const {user}=useAuthContext();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const ReviewCard={Name,City,Rating:Stars};
        const response=await fetch("http://localhost:5000/reviews",{
            method:"POST",
            body:JSON.stringify(ReviewCard),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json=await response.json();
        const OutputReviews=useGroupedData([json,...reviews]).groupedData;
        if(response.ok){
            setName('');
            setCity('');
            setStars(0);
            console.log('New Review Added',ReviewCard);
            dispatch({type:'CREATE_REVIEW',payload:{reviews:json,OutputReviews}})
        }
    }

  return (
    <div className='sm:h-[60vh] h-[40vh] w-[60%] bg-white ml-[1vw] my-[1vh] min-w-[200px] rounded-md flex flex-col justify-around items-center text-[3vw] sm:text-[1.2vw]'>
      <h1 className='text-center  h-[12%] mt-[3px]'>Add a <span className='text-[4vw] sm:text-[2vw] text-[var(--secondary-color)]'>Review</span></h1>
      <form onSubmit={handleSubmit} className='w-[90%] sm:w-[70%] h-[80%] flex flex-col justify-around items-center'>
        
        <div className='w-full flex justify-between'>
        <label>Name of Restaurant:</label>
        
        <input
            type="text"
            onChange={(e)=>{setName(e.target.value)}}
            value={Name}
            className='rounded-md border-[1px] border-black'
        />
        </div>
        <div className='w-full flex justify-between'>
        <label>City:</label>
        
        <input
            type="text"
            onChange={(e)=>{setCity(e.target.value)}}
            value={City}
            className='rounded-md border-[1px] border-black'
        />
        </div>
        <div className='w-full flex justify-between'>
        <label>Rating:</label>
        
        {/* <input
            type="text"
            onChange={(e)=>{setRating(e.target.value)}}
            value={Rating}
            className='rounded-md border-[1px] border-black'
        /> */}
        <Rating
          value={Stars}
          onChange={(event,newStars) => {
            setStars(newStars);
          }}
          sx={{
            '& .MuiRating-iconHover': {
              transform: 'none', // Remove the transform effect on hover
            },
          }}
        />
        </div>
        <button type='submit' className='w-[90%] bg-[var(--secondary-color)] rounded-md h-[10%] text-[3vw] sm:text-[1vw]'>Submit</button>
      </form>
      <div onClick={handleClick} className='text-[3vw] sm:text-[1vw] text-[var(--secondary-color)] underline'>Go Back</div>
    </div>
  )
}

export default ReviewCardForm
