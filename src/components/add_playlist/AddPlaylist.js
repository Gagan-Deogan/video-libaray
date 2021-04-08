import React, { useState } from "react"
import "./addPlaylist.css"
import closeIcon from "../../assests/close.svg"
import { usePlaylistContext } from "../../context/PlaylistProvider"

export const AddPlaylist= ({ showAddPlaylist , setShowAddPlaylist }) =>{
    const [ createPlaylist, SetCreatePlaylist ] = useState(false)
    const [ newPlaylistName, setNewPlaylistName ] = useState();
    const { playlists, playlistDispatch } = usePlaylistContext()
    const getPlaylistsNamesIncludeVideo = () =>{
        try{
            const reducer = ( acc, playlist ) =>{
                const isAlreadyInclude = playlist.videos.find((video) => video.id === showAddPlaylist.selectedVideo.id ) ;
                return !!isAlreadyInclude ? acc.concat([playlist.name]) : acc;
            }
            return playlists.reduce(reducer,[]);
        }catch(err){
            console.log({playlists})
            return [];
        }
    };
    const includedPlaylist = getPlaylistsNamesIncludeVideo();
    const getAllPlaylistName = () =>{
        return playlists.map((playlist)=> playlist.name);
    }
    const isError = getAllPlaylistName().includes(newPlaylistName);
    const handlePlaylist = (playlist) =>{
        if(includedPlaylist.includes(playlist.name)){
            playlistDispatch({ type:"REMOVE_VIDEO_FROM_PLAYLIST",payload: { video:showAddPlaylist.selectedVideo , playlistId: playlist.id } })
        }else{
            playlistDispatch({ type:"ADD_VIDEO_TO_PLAYLIST",payload:{ video:showAddPlaylist.selectedVideo , playlistId: playlist.id }})
        }
    }
    const handelCreatePlaylist = () =>{
        console.log({includedPlaylist}, newPlaylistName)
        if(includedPlaylist.includes(newPlaylistName) || !!!newPlaylistName){
            console.log('Error');
        }else{
            playlistDispatch({ type:"CREATE_PLAYLIST", payload:newPlaylistName });
            SetCreatePlaylist(false)
        }
    }
    return(
        <div className="mod-con pos-f jst-ctr alg-ctr box-shd ">
            <div className="mod sm-w9 md-w5 w3 bor-rad-4 box-shd add-playlist-model">
                <div className="row jst-spa-btw alg-ctr">
                    <h3>{createPlaylist ? "Create Playlist": "Save to.." }</h3>
                    <button 
                        className="link-btn" 
                        onClick={ ()=>{ setShowAddPlaylist( {show:false, selectedVideo:{}} ) } } >
                        <img src={closeIcon} alt="cross icon"/>
                    </button>
                </div>
                <fieldset className="col mag-t-8 pad-t-8 pad-b-16" >
                    { createPlaylist && ( <>
                        <input type="text" placeholder="Name" name="new Playlist" className={isError ? "err-txt-area mag-t-8": "mag-t-8"} value={ newPlaylistName } onChange={(e)=>setNewPlaylistName(e.target.value)}></input>
                        <div className={ isError ? "err-txt": "hlp-txt"}>
                            { isError && "This Name already Exits"}
                            { !isError && "Enter Name of new Playlist"}
                        </div>
                    </>) }
                    { !createPlaylist && (
                        playlists.map((playlist)=>(
                            <label className="row mag-t-8 alg-ctr" key = { playlist.id } >
                                <input type="checkbox" onChange={()=>handlePlaylist(playlist)} 
                                    checked={ includedPlaylist.includes( playlist.name ) } 
                                />
                                <div className="check mag-r-16"></div>
                                <p>{ playlist.name }</p>
                            </label>
                        ))
                    ) }
                </fieldset>
                <fieldset className="pad-8 row jst-end" >
                    { createPlaylist && (
                        <>
                            <button className="sm-btn-pry mag-r-16" onClick={()=>SetCreatePlaylist(false)} >Cancel</button>
                            <button className={ !!!newPlaylistName || isError ? "sm-btn-pry-fil btn-dis" : "sm-btn-pry-fil"} onClick={ ()=>handelCreatePlaylist() } disabled={ !!!newPlaylistName || isError }  >Create</button>
                        </>
                    )} 
                    { !createPlaylist && (
                        <button className="sm-btn-pry" onClick={()=>SetCreatePlaylist(true)} >Create Playlist</button>
                    ) }
                </fieldset>
            </div>
        </div>
    )
}