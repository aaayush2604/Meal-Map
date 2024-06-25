import { useAuthContext } from "./useAuthContext"
import { useReviewCardContext } from "./useReviewCardContext";

export const useLogOut=()=>{
    const {user,dispatch}=useAuthContext();
    const {workouts,dispatch:ReviewCardDispatch}=useReviewCardContext();
    const logout=()=>{
    
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type:'LOGOUT'})
        ReviewCardDispatch({type:'SET_REVIEWS',payload:{reviews:null}})
    }

    return {logout};
}

