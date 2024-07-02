import ReviewCardForm from "../components/ReviewCardForm"
import { UserReviews } from "../components/UserReviews"
import { useState } from "react"

export const UserPage=()=>{


    return <>
        <div className='UserPage no-scrollbar w-full h-full flex flex-col items-start py-[3vh]'> 
            <div className='w-full pt-5 mt-3 px-[1vw] no-scrollbar'>
            <UserReviews/>
            </div>
        </div>
    </>
}