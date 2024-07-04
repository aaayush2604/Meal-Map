import { useEffect,useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useReviewCardContext } from "../Hooks/useReviewCardContext"
import Rating from '@mui/material/Rating';
import { MdDelete } from "react-icons/md";
import ReviewCardForm from "../components/ReviewCardForm"

export const UserReviews=()=>{
    const {reviews,OutputReviews,dispatch}=useReviewCardContext();
    const {user}=useAuthContext();
    const [localReviews,setLocalReviews]=useState(null);
    useEffect(()=>{
        const fetchUserReviews=async()=>{
            const response=await fetch("https://meal-map-backend.vercel.app/reviews/user",{
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
        const response=await fetch("https://meal-map-backend.vercel.app/reviews/"+review._id,{
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

    const [ShowForm, setShowForm]=useState(false);

    const handleClick=()=>{
        const newShowForm=!ShowForm;
        setShowForm(newShowForm);
    }


    return <div className='flex flex-wrap justify-around my-4 flex-col pl-[3vw] overflow-y-auto' >
        {ShowForm?
                <ReviewCardForm handleClick={handleClick}/>
                    :
                <div className='bg-white w-[60%] h-[30vh] rounded-md min-w-[200px] text-center flex flex-col justify-around text-[3vw] sm:text-[1vw] items-center ml-[1vw]'>
                <div>
                <div className="">Leave a <span className='text-[6vw] sm:text-[2vw] text-[var(--secondary-color)]'>Review</span></div>
                <div>and Help People Map their Perfect Food Adventures</div>
                </div>
                <div className='bg-[var(--secondary-color)] text-white w-[30%] my-[4px] max-w-[150px] min-w-[130px] rounded-md h-[5vh] flex justify-center items-center' onClick={handleClick}>Click Here!</div>
                </div>
                
        }
        {localReviews && localReviews.map((review)=>{
            return (
            <div key={review._id} className='w-[60%] hover:scale-105 transition duration-300 min-w-[200px] my-3 min-h-[120px] ml-[1vw] pl-[3vw] sm:pl-[2vw] rounded-md p-[10px] flex justify-between bg-white  hover:bg-gradient-to-r hover:from-[#ffffff] hover:to-[#8decff]' >
                <div className='flex flex-col justify-around'>
                <div className="h-3/5">
                <p className='text-[var(--secondary-color)] font-semibold text-xl italic'>{review.Name}</p>
                <p className='text-sm italic'>{review.City}</p>
                </div>
                <p className='flex items-center h-2/5'><Rating value={parseInt(review.Rating.$numberDecimal)} readOnly/></p>
                </div>
                <div className='flex items-center'>
                <MdDelete onClick={()=>handleDelete(review)} className="w-[20px] h-[20px]"/>
                </div>
            </div>
        )
    })}</div>
}