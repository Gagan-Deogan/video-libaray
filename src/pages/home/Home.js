import React,{ useState, useEffect } from "react";
import { Card } from "../../components/cards/Card";
import axios from "axios";
import { AddPlaylist } from "../../components/add_playlist/AddPlaylist"
import "./home.css"

export const Home = () =>{
    const [ videosList , setVideosList ] = useState();
    const [ showAddPlaylist, setShowAddPlaylist ] = useState( { show:false, selectedVideo:{} } )
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        (async()=>{
            const { data:{ items } } = await axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=50&key=AIzaSyBsZof6jxUT9CDKHcp4QVQWOcB-95uDKxg");
            setVideosList(items)
        })()
        return () => {
            cancelToken.cancel();
        };
    }, []);
    return(
        <main className="col pad-8">
            <section>
                <ul className="dis-grid videos-container">
                    { videosList && videosList.map((video)=>(
                        <Card video={video} setShowAddPlaylist={setShowAddPlaylist} key={video.id} />
                    )) }
                </ul>
            </section>
            {showAddPlaylist.show && <AddPlaylist showAddPlaylist={showAddPlaylist} setShowAddPlaylist={setShowAddPlaylist} /> }
            
        </main>
    )
}