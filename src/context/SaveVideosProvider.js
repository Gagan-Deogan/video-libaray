import React, {createContext, useContext, useReducer} from 'react';

const SaveVideoContext = createContext();

const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TO_SAVE":
            return !!!state.find( ( video )=> video.id === action.payload.id ) ? state.concat([action.payload]) : state ; 
        case "REMOVE_FROM_SAVE":
            return state.filter((video)=>video.id === action.payload)
        default:
            return state;
    }
}
const initial = [];
export const SaveVideosProvider = ({ children }) =>{
    const [saveVideos, saveDispatch] = useReducer(reducer,initial);
    return (
        <SaveVideoContext.Provider value={{saveVideos, saveDispatch}} >
            {children}
        </SaveVideoContext.Provider>
    )
}
export const useSaveVideoContext = () =>{
    return useContext(SaveVideoContext)
}