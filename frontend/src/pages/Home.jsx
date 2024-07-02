import React, { useEffect,useState } from 'react'
import ReviewCardForm from '../components/ReviewCardForm';
import { useReviewCardContext } from '../Hooks/useReviewCardContext';
import { ReviewCard } from '../components/ReviewCard';
import { useGroupedData } from '../Hooks/useGroupedData';
import { useAuthContext } from '../Hooks/useAuthContext';

export const Home=()=>{
    const {reviews,OutputReviews,dispatch}=useReviewCardContext();
    const {user}=useAuthContext();

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

  return <div className='w-full h-full pt-5 mt-3 px-[1vw] HomePage no-scrollbar'>
      {OutputReviews?<div className=' flex flex-wrap justify-around flex-col pl-[3vw] no-scrollbar'>{OutputReviews.map((review)=>{
        return <ReviewCard key={review.id} review={review}/>
      })}</div>:<h2>Loading....</h2>}
    </div>
}