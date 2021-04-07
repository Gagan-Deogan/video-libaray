import React from "react";
import "./watch.css"
import saveIcon from "../../assests/save.svg"
import addPlaylistIcon from "../../assests/playlistadd.svg"
import likeIcon from "../../assests/like.svg"
import dislikeIcon from "../../assests/dislike.svg"
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player/youtube';
export const VideoWatch = () =>{
    const { id } = useParams()
    return(
        <section className="col pad-8" >
            <div className="crd-cont bor-rad-8 box-shd">
                <div className="video-player bor-rad-8 ovr-flw-hide" >
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} style={{borderRadius:'8px'}} width='100%' height="100%" />
                </div>
                <h2 className="bold mag-t-16 mag-l-8" >The Big Bang Theory - Sheldon without sleep</h2>
                <p className="gry mag-l-8" >50,559,291 views • Oct 21, 2020</p>
                <p className="gry mag-l-8" >Gulshan Kumar & T-Series Films present, an Anurag Basu Productions in association with Ishana Movies the official song "Aabad Barbad" from bollywood movie of 2020 LUDO starring Abhishek A Bachchan, Aditya Roy Kapur, Rajkummar Rao, Pankaj Tripathi, Rohit Saraf, Fatima Sana Sheikh, </p>
                <div className="row w12 jst-end">
                    <button className="link-btn mag-8" > <img src={addPlaylistIcon} alt=""/> </button>
                    <button className="link-btn mag-8" > <img src={saveIcon} alt=""/> </button>
                    <button className="link-btn mag-8" > <img src={likeIcon} alt=""/> </button>
                    <button className="link-btn mag-8" > <img src={dislikeIcon} alt=""/> </button>
                </div>
            </div>
        </section>
    )
}