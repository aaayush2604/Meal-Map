import { createContext,useReducer } from "react";
import React from 'react';

export const ReviewCardContext=createContext();

const ReviewCardReducer=(state,action)=>{
    switch(action.type){
        case 'SET_REVIEWS':
            return{
                reviews:action.payload.reviews,
                OutputReviews:action.payload.OutputReviews
            }
        case 'CREATE_REVIEW':
            return{
                reviews:[action.payload.reviews,...state.reviews],
                OutputReviews:action.payload.OutputReviews
            }
        case 'DELETE_REVIEW':
            return{
                reviews:state.reviews.filter((r)=>r._id!=action.payload._id),
                OutputReviews:state.OutputReviews
            }
        default:
            return state;
    }
}

export const ReviewCardContextProvider=({children})=>{
    const [state,dispatch]=useReducer(ReviewCardReducer,{
        reviews:null,
        OutputReviews:null
    })

    return( <ReviewCardContext.Provider  value={{...state,dispatch}}>
        {children}
    </ReviewCardContext.Provider>
    )
}