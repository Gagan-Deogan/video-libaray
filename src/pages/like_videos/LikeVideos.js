import React from "react";
import { Card } from "../../components/cards/Card"
import { useLikedAndDisLikedVideosContext } from "../../context/LikedAndDislikedVideosProvide"
export const LikeVideos = () =>{
    const { likedVideos } = useLikedAndDisLikedVideosContext();

    return(
        <>
            <section>
                <div className="crd-cont pad-16 bor-rad-8">
                    <h1 className="bold" >Liked Videos</h1>
                </div>
                <ul className="dis-grid videos-container mag-t-16">
                    { likedVideos.map((video)=>(
                        <Card key={ video.id } video={video} />
                    )) }
                </ul>
            </section>
        </>
    )
}