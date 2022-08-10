import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddAlbum.css';


function AddAlbum(props){
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [length, setLength] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  const add = () =>{
    const newAlbum = {"id":nanoid(), "title":title, "artist":artist, "length":length, "releaseYear":releaseYear};
    props.addAlbum(newAlbum);
  }

  return (
    <div className="row mt-5" id="addAlbum">
      <h2>Add Album</h2>
      <div className="col-lg-2">
        <label htmlFor="txtTitle" className="form-label">Album Title</label>
        <input type="text" id="txtTitle" placeholder="Title" className="form-control" onChange={(evt) => setTitle(evt.currentTarget.value)} value={title}/>
      </div>
      <div className="col-lg-2">
        <label htmlFor="txtArtist" className="form-label">Artist</label>
        <input type="text" id="txtArtist" placeholder="Artist" className="form-control" onChange={(evt) => setArtist(evt.currentTarget.value)} value={artist}/>
      </div>
      <div className="col-lg-2">
        <label htmlFor="txtLength" className="form-label">Length</label>
        <input type="text" id="txtLength" placeholder="Length" className="form-control" onChange={(evt) => setLength(evt.currentTarget.value)} value={length}/>
      </div>
      <div className="col-lg-2">
        <label htmlFor="txtReleaseYear" className="form-label">Release Year</label>
        <input type="text" id="txtReleaseYear" placeholder="Release Year" className="form-control" onChange={(evt) => setReleaseYear(evt.currentTarget.value)} value={releaseYear}/>
      </div>
      <div className="col-lg-2">
        <button type="button" id="btnAdd" className="btn btn-success btn-lg" onClick={add}>Add Album <FontAwesomeIcon icon={faPlusCircle}/></button>
      </div>
    </div>
  )
}

export default AddAlbum;