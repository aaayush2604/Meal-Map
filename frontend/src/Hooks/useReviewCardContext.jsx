import { ReviewCardContext } from "../context/ReviewCardContext";
import { useContext } from "react";

export const useReviewCardContext=()=>{
    const context=useContext(ReviewCardContext);
    if(!context){
        throw Error('useReviewCardContext must be used inside ReviewCardContextProvider')
    }
    return context;
}