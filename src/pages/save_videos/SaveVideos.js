import React from "react";
import { Card } from "../../components/cards/Card"
import { useSaveVideoContext } from "../../context/SaveVideosProvider"
export const SaveVideos = () =>{
    const { saveVideos } = useSaveVideoContext();
    return(
        <>
            <section>
                <div className="crd-cont pad-16 bor-rad-8 ">
                    <h1 className="bold" >Save Videos</h1>
                </div>
                <ul className="dis-grid videos-container mag-t-16">
                    { saveVideos.map((video)=>(
                        <Card key={ video.id } video={video} />
                    )) }
                </ul>
            </section>
        </>
    )
}