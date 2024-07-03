import React, { useEffect,useState } from 'react'
import ReviewCardForm from '../components/ReviewCardForm';
import { useReviewCardContext } from '../Hooks/useReviewCardContext';
import { ReviewCard } from '../components/ReviewCard';
import { useGroupedData } from '../Hooks/useGroupedData';
import { useAuthContext } from '../Hooks/useAuthContext';
import { Link } from '@mui/material';

export const Home=()=>{
    const {reviews,OutputReviews,dispatch}=useReviewCardContext();
    const {user}=useAuthContext();
    const [showForm,setShowForm]=useState(false);

  useEffect(()=>{
    const fetchItem=async()=>{
      const response=await fetch('http://localhost:5000/reviews');
      const json=await response.json();
      console.log(json);
      const OutputReviews=useGroupedData(json).groupedData;
      if(response.ok){
        dispatch({type:'SET_REVIEWS',payload:{reviews:json,OutputReviews}})
       
      }
    }

    fetchItem();
  },[dispatch])

  const handleClick=()=>{
    const newShowForm=!showForm;
    setShowForm(newShowForm);
  }

  return <div className='w-full h-full pt-5 mt-3 px-[1vw] HomePage no-scrollbar'>
      
      {OutputReviews?<div className=' flex flex-wrap justify-around flex-col pl-[3vw] no-scrollbar'>
        {user && <div>
        {(showForm)?
          
          <ReviewCardForm handleClick={handleClick}/>
          :
          <div className='w-[60%] hover:scale-105 transition duration-300 min-w-[200px] my-3 min-h-[60px] ml-[1vw] pl-[3vw] sm:pl-[2vw] rounded-md p-[10px] bg-white flex flex-col justify-around text-[3vw] sm:text-[1.3vw]'><div>
          <span to='/user' className='text-[var(--secondary-color)] no-underline text-[5vw] sm:text-[2vw]' onClick={()=>handleClick()}>
            Click Here
          </span> to Leave your own Reviews</div></div>
        }
        </div>}
        {OutputReviews.map((review)=>{
        return <ReviewCard key={review.id} review={review}/>
      })}</div>:<h2>Loading....</h2>}
    </div>
}
