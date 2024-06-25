import { useReviewCardContext } from '../Hooks/useReviewCardContext';
import {useAuthContext} from '../Hooks/useAuthContext';

export const ReviewCard=({review})=>{

    return <>
        <div>
        <p>{review._id.name}</p>
        <p>{review._id.city}</p>
        <p>{review.averageRating}</p>
        </div>
    </>
}