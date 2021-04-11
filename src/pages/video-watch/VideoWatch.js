import React, { useState, useEffect } from "react";
import "./watch.css"
import saveIcon from "../../assests/save.svg"
import addPlaylistIcon from "../../assests/playlistadd.svg"
import likeIcon from "../../assests/like.svg"
import dislikeIcon from "../../assests/dislike.svg"
import activeLikeIcon from "../../assests/active_like.svg"
import activeDislikeIcon from "../../assests/active_dislike.svg"
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { AddPlaylist } from "../../components/add_playlist/AddPlaylist"
import axios from "axios";
import { useLikedAndDisLikedVideosContext } from "../../context/LikedAndDislikedVideosProvide"
import { useSaveVideoContext } from "../../context/SaveVideosProvider"
export const VideoWatch = () =>{
    const { id } = useParams()
    const [ vidoeToPlaylist, setVideoToPlaylist ] = useState()
    const [videoDetails, setVideoDetails] = useState()
    const { likedVideos, disLikedVideos, likeAndDislikeVideosDispatch } = useLikedAndDisLikedVideosContext()
    const { saveDispatch } = useSaveVideoContext()
    useEffect(()=>{
        (async()=>{
            const { data:{items} } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${id}&key=AIzaSyBsZof6jxUT9CDKHcp4QVQWOcB-95uDKxg`)
            if(items){
                setVideoDetails(items[0]);
            }
        })()
    },[])
    const ddmmmyyyy = (date) =>{
        return new Date(date).toLocaleString("en-UG", {day: "numeric", month: "short", year:"numeric" });
    }
    const handleLikeToggle = (video,toggle) =>{
        if(toggle){
            likeAndDislikeVideosDispatch({ type:'ADD_TO_LIKE_VIDEOS', payload:video })
            likeAndDislikeVideosDispatch({ type:'REMOVE_FROM_DISLIKE_VIDEOS', payload:video.id })
        }
        else
            likeAndDislikeVideosDispatch({ type:'REMOVE_FROM_LIKE_VIDEOS', payload:video.id })
        
    }
    const handleDislikeToggle = (video, toggle )=>{
        if( toggle ){
            likeAndDislikeVideosDispatch({ type:'ADD_TO_DISLIKE_VIDEOS', payload:video })
            likeAndDislikeVideosDispatch({ type:'REMOVE_FROM_LIKE_VIDEOS', payload:video.id })
        }
        else
            likeAndDislikeVideosDispatch({ type:'REMOVE_FROM_DISLIKE_VIDEOS', payload:video.id })
    }
    const isInList = (videosList, videoId) =>{
        return !!videosList.find( video => video.id === videoId )
    }
    const isLiked = isInList( likedVideos, videoDetails?.id );
    const isDisLiked = isInList( disLikedVideos, videoDetails?.id )
    const handleAddTOSave = ( video ) =>{
        saveDispatch({ type:"ADD_TO_SAVE" , payload: video })
    }
    return(
        <section className="col pad-8" >
            { videoDetails && (
                <div className="crd-cont bor-rad-8 box-shd">
                    <div className="video-player bor-rad-8 ovr-flw-hide" >
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} style={{borderRadius:"8px"}} width="100%" height="100%" />
                    </div>
                    <h2 className="bold mag-t-16 mag-l-8" >{videoDetails.snippet.title}</h2>
                    <p className="gry mag-l-8 bold" >{videoDetails.statistics.viewCount} views • {ddmmmyyyy(videoDetails.snippet.publishedAt)}</p>
                    <p className="mag-l-8 bold" >{videoDetails.snippet.description.slice(0,250)}</p>
                    <div className="row w12 jst-end">
                        <button className="link-btn mag-8" 
                            onClick={()=>setVideoToPlaylist(videoDetails)} 
                            > <img src={addPlaylistIcon} alt=""/> </button>
                        <button className="link-btn mag-8" onClick={ ()=>handleAddTOSave(videoDetails) } > <img src={saveIcon} alt=""/> </button>
                        { !isLiked ? (
                                <button className="link-btn mag-8" onClick={ ()=>handleLikeToggle( videoDetails,true ) } > <img src={likeIcon} alt=""/> </button>
                            ):(
                                <button className="link-btn mag-8" onClick={ ()=>handleLikeToggle( videoDetails,false ) } > <img src={activeLikeIcon} alt=""/> </button>
                        )}
                        { !isDisLiked ? (
                                <button className="link-btn mag-8" onClick={ (e)=>handleDislikeToggle( videoDetails,true ) } > <img src={dislikeIcon} alt=""/> </button>
                            ):(
                                <button className="link-btn mag-8" onClick={ (e)=>handleDislikeToggle( videoDetails, false ) } > <img src={activeDislikeIcon} alt=""/> </button> 
                        )}
                    </div>
                </div>
            ) }
            {vidoeToPlaylist && <AddPlaylist vidoeToPlaylist={vidoeToPlaylist} setVideoToPlaylist={setVideoToPlaylist} /> }
        </section>
    )
}