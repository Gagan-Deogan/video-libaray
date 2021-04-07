import React from "react";
import { useNavigate } from "react-router-dom"
export const Card = ({ video }) =>{
    const navigate = useNavigate()
    return(
    <>
        <li class="col crd-cont pos-r  hov-box-shd bor-rad-8 bor-sol" 
            onClick={()=> navigate(`/watch/${video.id}`)} 
        >
            <img src={video.snippet.thumbnails.high.url} classname="w12 bor-rad-8" alt=""/>
            <div class="col crd-title">
                <h4 className="bold">{video.snippet.title.slice(0,35)}</h4>
                <h6 class="bold" >{video.snippet.description.slice(0,40) + "..." }</h6>
            </div>
        </li>
    </>
    )
}