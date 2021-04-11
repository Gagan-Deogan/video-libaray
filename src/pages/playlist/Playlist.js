import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { usePlaylistContext } from "../../context/PlaylistProvider"
import { Card } from "../../components/cards/Card"
import editIcon from "../../assests/edit.svg"
export const Playlist = () =>{
    const { id } = useParams();
    const { playlists, playlistDispatch } = usePlaylistContext();
    const getPlaylistDetails = (playlists, id) =>{
        return playlists.find((playlist) => playlist.id === id );
    }
    const playlistDetails = getPlaylistDetails(playlists, id);
    const [editdescription, setEditdescription] = useState(false);
    const [editeddescriptionText, setEditeddescriptionText] = useState('');
    const descriptionWord = () =>{
        return editeddescriptionText.slice().length;
    }
    const handleEditsIndescription = (e) =>{
        if( descriptionWord() < 500 )
            setEditeddescriptionText(e.target.value);
    }
    const handleDescriptionSave = () =>{
        playlistDispatch({type:'EDIT_DESCRIPTION', payload:{ description:editeddescriptionText, playlistId:id }});
        setEditdescription(false)
    }
    return(
        <section className="col pad-8" >
            <div className="crd-cont pad-16 bor-rad-8 box-shd ">
                <h1 className="bold mag-b-16" >{playlistDetails.name}</h1>
                { !editdescription && (
                    <div className="row alg-ctr mag-b-16">
                        { !!playlistDetails.description && (
                            <h2>{playlistDetails.description}</h2>
                        )}
                        {  !!!playlistDetails.description && (
                            <h2 className="gry " >No description</h2>
                        )}
                        <button className="link-btn mag-l-8" onClick={ ()=> setEditdescription(true)} > <img src={editIcon} alt=""/> </button>
                    </div>
                )}
                { editdescription && (
                    <div className="col alg-str mag-b-16">
                        <input type='text' name="description" placeholder="description" value={editeddescriptionText} onChange={handleEditsIndescription}  />
                        <div class="hlp-txt">{descriptionWord()}/500</div>
                        <div className="row w12 jst-end mag-t-16">
                            <button className="sm-btn-pry" onClick={ ()=> setEditdescription(false)} >Cancel</button>
                            <button className="sm-btn-pry-fil mag-l-16" onClick={ ()=> handleDescriptionSave() } >Save</button>
                        </div>
                    </div>
                )}
            </div>
            <ul className="dis-grid videos-container mag-t-16">
                { playlistDetails.videos.map((video)=>(
                    <Card key={ video.id } video={video} />
                )) }
            </ul>
        </section>
    )
}