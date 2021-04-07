import React,{ useState, useEffect } from "react";
import { Card } from "../../components/cards/Card";
import axios from "axios";
import "./home.css"

export const Home = () =>{
    const [ videosList , setVideosList ] = useState()
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
            {/* <section className="hero-wall w12 bor-rad-8 col alg-ctr jst-ctr">
                <h1 className="clr pry-clr txt-ctr bold " >Plants Gonna Make you Happy</h1>
            </section> */}
            <section>
                <ul className="dis-grid videos-container">
                    { videosList && videosList.map((video)=>(
                        <Card video={video}  />
                    )) }
                </ul>
            </section>
        
        </main>
    )
}