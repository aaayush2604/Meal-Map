import React, { useEffect,useState } from 'react'
import ReviewCardForm from '../components/ReviewCardForm';
import { useReviewCardContext } from '../Hooks/useReviewCardContext';
import { ReviewCard } from '../components/ReviewCard';
import { useGroupedData } from '../Hooks/useGroupedData';
import { useAuthContext } from '../Hooks/useAuthContext';

export const Home=()=>{
    const {reviews,OutputReviews,dispatch}=useReviewCardContext();
    const {user}=useAuthContext();
    console.log('Hi');

  useEffect(()=>{
    const fetchItem=async()=>{
      const response=await fetch('http://localhost:5000/reviews',{
        // headers:{
        //   'Authorization':`Bearer ${user.token}`
        // }
      });
      const json=await response.json();
      console.log(json);
      const OutputReviews=useGroupedData(json).groupedData;
      if(response.ok){
        console.log('Hello');
        dispatch({type:'SET_REVIEWS',payload:{reviews:json,OutputReviews}})
        console.log(OutputReviews);
      }
    }

    fetchItem();
  },[dispatch])

  return (
    <div>
      {OutputReviews?<div>{OutputReviews.map((review)=>{
        return <ReviewCard key={review.id} review={review}/>
      })}</div>:<h2>Loading....</h2>}
    </div>
  )
}