import { useEffect,useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useReviewCardContext } from "../Hooks/useReviewCardContext"

export const UserReviews=()=>{
    const {reviews,OutputReviews,dispatch}=useReviewCardContext();
    const {user}=useAuthContext();
    const [localReviews,setLocalReviews]=useState(null);
    useEffect(()=>{
        const fetchUserReviews=async()=>{
            const response=await fetch("http://localhost:5000/user",{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json=await response.json();
            setLocalReviews(null);
            if(response.ok){
                dispatch({type:'SET_REVIEWS',payload:{reviews:json,OutputReviews}})
            }
        }
        fetchUserReviews();
    },[dispatch])

    useEffect(()=>{
        setLocalReviews(reviews);
    },[reviews])

    const handleDelete=async(review)=>{
        console.log(review._id);
        const response=await fetch("http://localhost:5000/"+review._id,{
          method:'DELETE',
          headers:{
            'Authorization':`Bearer ${user.token}`
          }
        })
        const json=await response.json();
        console.log(json);
        if(response.ok){
          dispatch({type:'DELETE_REVIEW',payload:json})
        }
    }


    return <>{localReviews && localReviews.map((review)=>{
    return (<div key={review._id}>
            <p>{review.Name}</p>
            <p>{review.City}</p>
            <p>{review.Rating.$numberDecimal}</p>
            <button onClick={()=>handleDelete(review)}>Delete</button>
        </div>)
    })}</>
}