import React, { useState } from "react";
import "./navbar.css";
import menuIcon from "../../assests/menu.svg"
import homeIcon from "../../assests/home.svg"
import saveIcon from "../../assests/save.svg"
import playlistIcon from "../../assests/playlist.svg"
import historyIcon from "../../assests/history.svg"
import likeIcon from "../../assests/like.svg"
import closeIcon from "../../assests/close.svg"
import { usePlaylistContext } from "../../Context/PlaylistProvider"
import { NavLink, useNavigate } from "react-router-dom"
export const Navbar = ({ isNavbarOpen, setNavbarToggle }) =>{
    // const [navState, setNavState] = useState(false);
    const { playlists } = usePlaylistContext();
    const navigate =  useNavigate()

    return(
        <>
            <nav className="row alg-ctr pad-16 w12 jst-spa-btw">
                <button className="link-btn" onClick={()=>{setNavbarToggle(!isNavbarOpen)}} >
                    <img src={menuIcon} alt=""/>
                </button>
                <div className="row">
                    <button className="sm-btn-pry" onClick={()=>navigate("/login")} >Login</button>
                </div>
            </nav>
            { isNavbarOpen && (
                <aside>
                    <div className="col links-container">
                        <NavLink 
                            to="/" 
                            className="link-btn txt-lft jst-str mag-16 mag-t-8 mag-b-8" 
                            // onClick={()=>{setNavState(false)}}
                        >
                            <img src={homeIcon} alt=""/>
                            <h5 className="mag-l-16">Explore</h5>
                        </NavLink>
                        <NavLink 
                            to="/xyz" 
                            className="link-btn txt-lft jst-str mag-16 mag-t-8 mag-b-8" 
                            // onClick={()=>{setNavState(false)}} 
                            >
                            <img src={historyIcon} alt=""/>
                            <h5 className="mag-l-16">History</h5>
                        </NavLink>
                        <NavLink 
                            to="/savevideos" 
                            className="link-btn txt-lft jst-str mag-16 mag-t-8 mag-b-8" 
                            // onClick={()=>{setNavState(false)}}
                        >
                            <img src={saveIcon} alt=""/>
                            <h5 className="mag-l-16">Saved Videos</h5>
                        </NavLink>
                        <NavLink 
                            to="/likevideos" 
                            className="link-btn txt-lft jst-str mag-16 mag-t-8 mag-b-8" 
                            // onClick={()=>{setNavState(false)}}
                        >
                            <img src={likeIcon} alt=""/>
                            <h5 className="mag-l-16">Liked Videos</h5>
                        </NavLink>
                        <fieldset className=" col pad-t-8 " >
                            {playlists.map((playlist)=>(
                                <NavLink 
                                    key={ playlist.id } 
                                    to={`/playlist/${playlist.id}`} 
                                    // onClick={()=>{setNavState(false)}} 
                                    className="link-btn txt-lft jst-str mag-16 mag-t-8 mag-b-8" 
                                >
                                    <img src={playlistIcon} alt=""/>
                                    <h5 className="mag-l-16">{playlist.name}</h5>
                                </NavLink>
                            ))}
                        </fieldset>
                    </div>
                </aside>
            )}
            {/* {navState && (
                <div className="mob-nav col pad-16">
                    <div className="row w12 jst-end" >
                        <button className="link-btn" onClick={()=>{setNavState(false)}}  > 
                            <img src={closeIcon} alt=""/>
                        </button>
                    </div>
                    <NavLink to="/" className="link-btn txt-lft jst-str mag-b-16" onClick={()=>{setNavState(false)}} >
                        <img src={homeIcon} alt=""/>
                        <h5 className="mag-l-16">Explore</h5>
                    </NavLink>
                    <NavLink to="/xyz" className="link-btn txt-lft jst-str mag-b-16" onClick={()=>{setNavState(false)}} >
                        <img src={historyIcon} alt=""/>
                        <h5 className="mag-l-16">History</h5>
                    </NavLink>
                    <NavLink  to="/savevideos" className="link-btn txt-lft jst-str mag-b-16" onClick={()=>{setNavState(false)}} >
                        <img src={saveIcon} alt=""/>
                        <h5 className="mag-l-16">Saved Videos</h5>
                    </NavLink>
                    <NavLink to="/likevideos" className="link-btn txt-lft jst-str mag-b-16" onClick={()=>{setNavState(false)}} >
                        <img src={likeIcon} alt=""/>
                        <h5 className="mag-l-16">Liked Videos</h5>
                    </NavLink>
                    <fieldset className=" col pad-t-8 " >
                        {playlists.map((playlist)=>(
                            <NavLink key={ playlist.id } to={`/playlist/${playlist.id}`} onClick={()=>{setNavState(false)}} className="link-btn txt-lft jst-str mag-b-16" >
                                <img src={playlistIcon} alt=""/>
                                <h5 className="mag-l-16">{playlist.name}</h5>
                            </NavLink>
                        ))}
                    </fieldset>
                </div>
            )} */}
        </>
    )
}