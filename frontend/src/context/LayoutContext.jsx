import { useContext,useReducer,createContext,useEffect} from "react";

export const LayoutContext=createContext();

export const layoutReducer=(state,action)=>{


    switch(action.type){
        case 'UPDATE_LAYOUT':
            return {
                NavBarExpanded:action.payload.NavBarExpanded,
            }
        default:
            state;
    }
}

export const LayoutContextProvider=({children})=>{
    const [state,dispatch]=useReducer(layoutReducer,{
        NavBarExpanded:false,
    });

    return <LayoutContext.Provider value={{...state,dispatch}}>
        {children}
    </LayoutContext.Provider>
}