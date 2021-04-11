import React, { useState } from "react";
import "./navbar.css";
import menuIcon from "../../assests/menu.svg"
import homeIcon from "../../assests/home.svg"
import saveIcon from "../../assests/save.svg"
import playlistIcon from "../../assests/playlist.svg"
import historyIcon from "../../assests/history.svg"
import likeIcon from "../../assests/like.svg"
import closeIcon from "../../assests/close.svg"
import { usePlaylistContext } from "../../context/PlaylistProvider"
import { NavLink } from "react-router-dom"
export const Navbar = () =>{
    const [navState, setNavState] = useState(false);
    const { playlists } = usePlaylistContext();
    return(
        <>
            <nav className="box-shd row alg-ctr pad-8 w12 ">
                <button className="link-btn" onClick={()=>{setNavState(true)}} >
                    <img src={menuIcon} alt=""/>
                </button>
            </nav>
            <div className="w2">
                <aside className="col pad-16 w12">
                    <NavLink to="/" className="link-btn txt-lft jst-str mag-b-16" onClick={()=>{setNavState(false)}} >
                        <img src={homeIcon} alt=""/>
                        <h4 className="mag-l-16">Explore</h4>
                    </NavLink>
                    <NavLink to="/xyz" className="link-btn txt-lft jst-str mag-b-16" onClick={()=>{setNavState(false)}} >
                        <img src={historyIcon} alt=""/>
                        <h4 className="mag-l-16">History</h4>
                    </NavLink>
                    <NavLink  to="/savevideos" className="link-btn txt-lft jst-str mag-b-16" onClick={()=>{setNavState(false)}} >
                        <img src={saveIcon} alt=""/>
                        <h4 className="mag-l-16">Saved Videos</h4>
                    </NavLink>
                    <NavLink to="/likevideos" className="link-btn txt-lft jst-str mag-b-16" onClick={()=>{setNavState(false)}} >
                        <img src={likeIcon} alt=""/>
                        <h4 className="mag-l-16">Liked Videos</h4>
                    </NavLink>
                    <fieldset className=" col pad-t-8 " >
                        {playlists.map((playlist)=>(
                            <NavLink key={ playlist.id } to={`/playlist/${playlist.id}`} onClick={()=>{setNavState(false)}} className="link-btn txt-lft jst-str mag-b-16" >
                                <img src={playlistIcon} alt=""/>
                                <h4 className="mag-l-16">{playlist.name}</h4>
                            </NavLink>
                        ))}
                    </fieldset>
                </aside>
            </div>
            {navState && (
                <div className="mob-nav col pad-16">
                    <div className="row w12 jst-end" >
                        <button className="link-btn" onClick={()=>{setNavState(false)}}  > 
                            <img src={closeIcon} alt=""/>
                        </button>
                    </div>
                    <NavLink to="/" className="link-btn txt-lft jst-str mag-b-16" onClick={()=>{setNavState(false)}} >
                        <img src={homeIcon} alt=""/>
                        <h4 className="mag-l-16">Explore</h4>
                    </NavLink>
                    <NavLink to="/xyz" className="link-btn txt-lft jst-str mag-b-16" onClick={()=>{setNavState(false)}} >
                        <img src={historyIcon} alt=""/>
                        <h4 className="mag-l-16">History</h4>
                    </NavLink>
                    <NavLink  to="/savevideos" className="link-btn txt-lft jst-str mag-b-16" onClick={()=>{setNavState(false)}} >
                        <img src={saveIcon} alt=""/>
                        <h4 className="mag-l-16">Saved Videos</h4>
                    </NavLink>
                    <NavLink to="/likevideos" className="link-btn txt-lft jst-str mag-b-16" onClick={()=>{setNavState(false)}} >
                        <img src={likeIcon} alt=""/>
                        <h4 className="mag-l-16">Liked Videos</h4>
                    </NavLink>
                    <fieldset className=" col pad-t-8 " >
                        {playlists.map((playlist)=>(
                            <NavLink key={ playlist.id } to={`/playlist/${playlist.id}`} onClick={()=>{setNavState(false)}} className="link-btn txt-lft jst-str mag-b-16" >
                                <img src={playlistIcon} alt=""/>
                                <h4 className="mag-l-16">{playlist.name}</h4>
                            </NavLink>
                        ))}
                    </fieldset>
                </div>
            )}
        </>
    )
}