import { useReviewCardContext } from '../Hooks/useReviewCardContext';
import {useAuthContext} from '../Hooks/useAuthContext';

export const ReviewCard=({review})=>{

    const {reviews,OutputReviews,dispatch}=useReviewCardContext();
    const {user}=useAuthContext();

    const handleDelete=async(id)=>{
        console.log(OutputReviews);
        const deleteItem=OutputReviews.find(obj=>obj.id==id);
        console.log(deleteItem);
        const response=await fetch("http://localhost:5000/reviews"+deleteItem._id.name,{
          method:'DELETE',
          headers:{
            'Authorization':`Bearer ${user.token}`
          }
        })
        const json=await response.json();
        console.log(json);
        if(response.ok){
          dispatch({type:'DELETE_REVIEW',payload:deleteItem})
        }
    }

    return <>
        <div>
        <p>{review._id.name}</p>
        <p>{review._id.city}</p>
        <p>{review.averageRating}</p>
        <button onClick={()=>handleDelete(review.id)}>Delete</button>
        </div>
    </>
}