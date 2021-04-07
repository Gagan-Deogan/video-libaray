import React, { useState } from "react";
import "./navbar.css";
import menuIcon from "../../assests/menu.svg"
import homeIcon from "../../assests/home.svg"
import saveIcon from "../../assests/save.svg"
import playlistIcon from "../../assests/playlist.svg"
import historyIcon from "../../assests/history.svg"
import likeIcon from "../../assests/like.svg"
import closeIcon from "../../assests/close.svg"

export const Navbar = () =>{
    const [navState, setNavState] = useState(false);
    return(
        <>
            <nav className="box-shd row alg-ctr pad-8">
                <button className="link-btn" onClick={()=>{setNavState(true)}} >
                    <img src={menuIcon} alt=""/>
                </button>
            </nav>
            {navState && (
                <div className="mob-nav col pad-16">
                    <div className="row w12 jst-end" >
                        <button className="link-btn" onClick={()=>{setNavState(false)}}  > 
                            <img src={closeIcon} alt=""/>
                        </button>
                    </div>
                    <button className="link-btn txt-lft jst-str mag-b-16" >
                        <img src={homeIcon} alt=""/>
                        <h4 className="mag-l-16">Home</h4>
                    </button>
                    <button className="link-btn txt-lft jst-str mag-b-16" >
                        <img src={playlistIcon} alt=""/>
                        <h4 className="mag-l-16">My Playlist</h4>
                    </button>
                    <button className="link-btn txt-lft jst-str mag-b-16" >
                        <img src={saveIcon} alt=""/>
                        <h4 className="mag-l-16">Saved Videos</h4>
                    </button>
                    <button className="link-btn txt-lft jst-str mag-b-16" >
                        <img src={historyIcon} alt=""/>
                        <h4 className="mag-l-16">History</h4>
                    </button>
                    <button className="link-btn txt-lft jst-str mag-b-16" >
                        <img src={likeIcon} alt=""/>
                        <h4 className="mag-l-16">Liked Videos</h4>
                    </button>
                </div>
            )}
        </>
    )
}