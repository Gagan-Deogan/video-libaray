import React, { createContext,useContext, useReducer} from "react";

const PlaylistContext = createContext();

const initialPlaylist = [ { name:'My playlist', id:"123", videos: [] } ]

const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
const reducer = (state, action) =>{
    switch(action.type){
        case "ADD_VIDEO_TO_PLAYLIST":
            return state.map((playlist)=> playlist.id === action.payload.playlistId ? {...playlist, videos: playlist.videos.concat(action.payload.video) } : playlist );
        case "REMOVE_VIDEO_FROM_PLAYLIST":
            return state.map((playlist)=> playlist.id === action.payload.playlistId ? {...playlist, videos: playlist.videos.filter((video)=> video.id !== action.payload.video.id )} : playlist );
        case "CREATE_PLAYLIST":
            return state.concat([{ name: action.payload , id:uuidv4(), videos:[] }])
        default:
            return state
    }
    
}

export const PlaylistProvider = ({children}) =>{
    const [ playlists , playlistDispatch ] = useReducer( reducer ,initialPlaylist )
    return(
        <PlaylistContext.Provider value={{ playlists, playlistDispatch }}>
            {children}
        </PlaylistContext.Provider>
    )
}
export const usePlaylistContext = () =>{
    return useContext(PlaylistContext);
}
