import React, { useState } from "react";
import "./card.css"
import threeDotsIcon from "../../assests/threedots.svg" 
import playlistAddIcon from "../../assests/playlistadd.svg"
import saveIcon from "../../assests/save.svg"
import { useNavigate } from "react-router-dom"
export const Card = ({ video, setVideoToPlaylist, cardFor, handleAddTOSave }) =>{
    const navigate = useNavigate();
    const [expandDropDown, setExpandDropDown] = useState(false)
    const callSave = (video) =>{
        handleAddTOSave(video)
        setExpandDropDown(false)
    }
    return(
    <>
        <li className="col crd-cont pos-r  hov-box-shd bor-rad-8 bor-sol" 
            
        >
            <img src={video.snippet.thumbnails.high.url} className="w12 bor-rad-8" alt="" 
                onClick={()=>{ 
                    navigate(`/watch/${video.id}`)
                }} 
            />
            <div className="row pad-8 pad-t-16 alg-str">
                <div className="avtr-clr">
                    <h4>{video.snippet.channelTitle.slice(0,1)}</h4>
                </div>
                <div className="col crd-title w9 mag-l-8">
                    <h6 className="bold">{ video.snippet.title.slice(0,65) } { video.snippet.title.length > 75 ? "..." : "" } </h6>
                    <h6 className="gry" >{video.snippet.channelTitle} </h6>
                </div>
                { cardFor ==="EXPLORE_PAGE" && (
                    <button className="link-btn" 
                        onClick={ ()=> setExpandDropDown(!expandDropDown) } 
                    >
                        <img src={threeDotsIcon} alt=""/>
                        { expandDropDown && (
                            <ul className="drop-down" >
                                <li className="row alg-ctr" onClick={ ()=> setVideoToPlaylist(video) } >
                                    <img src={playlistAddIcon} alt=""/>
                                    <h6 className="bold mag-l-8">
                                        Add to Playlist
                                    </h6>
                                </li>
                                <li className="row alg-ctr" 
                                    onClick={()=>callSave(video)} 
                                    >
                                    <img src={saveIcon} alt=""/>
                                    <h6 className="bold mag-l-8">
                                        Save to Watch Later
                                    </h6>
                                </li>
                            </ul>
                        ) }
                    </button>
                )}
            </div>
        </li>
    </>
    )
}