import React, { useState } from 'react'
import { useReviewCardContext } from '../Hooks/useReviewCardContext';
import { useGroupedData } from '../Hooks/useGroupedData';
import {useAuthContext} from '../Hooks/useAuthContext';

const ReviewCardForm =() => {
    const [Name,setName]=useState('');
    const [City,setCity]=useState('');
    const [Rating,setRating]=useState('');
    const {reviews,OutputReviews,dispatch}=useReviewCardContext();
    const {user}=useAuthContext();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const ReviewCard={Name,City,Rating};
        const response=await fetch("http://localhost:5000",{
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
            setRating('');
            console.log('New Review Added',ReviewCard);
            dispatch({type:'CREATE_REVIEW',payload:{reviews:json,OutputReviews}})
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add a Review</h1>
        <label>Name of Restaurent:</label>
        <input
            type="text"
            onChange={(e)=>{setName(e.target.value)}}
            value={Name}
        />
        <label>City:</label>
        <input
            type="text"
            onChange={(e)=>{setCity(e.target.value)}}
            value={City}
        />
        <label>Rating:</label>
        <input
            type="text"
            onChange={(e)=>{setRating(e.target.value)}}
            value={Rating}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default ReviewCardForm
