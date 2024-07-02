import { useContext } from "react"
import { LayoutContext } from "../context/LayoutContext"

export const useLayoutContext=()=>{
    const context=useContext(LayoutContext);
    if(!context){
        throw Error('useLayOutContext must be used inside LayOutContextProvider')
    }
    return context;
}