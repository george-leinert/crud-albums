import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faPencil} from '@fortawesome/free-solid-svg-icons';



function Album(props){

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [length, setLength] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  useEffect(() => {
    setTitle(props.album.title);
    setArtist(props.album.artist);
    setLength(props.album.length);
    setReleaseYear(props.album.releaseYear);
  }, []);

  const saveAlbum = () => {
    setEditMode(false);
    const updatedAlbum = {title:title, artist:artist, length:length, releaseYear:releaseYear, id:props.album.id};
    props.updateAlbum(updatedAlbum);
  }

  return(
    <div className="card">
    {!editMode && <ul className="list-group list-group-flush">
      <li className="list-group-item">{props.album.title}</li>
      <li className="list-group-item">{props.album.artist}</li>
      <li className="list-group-item">{props.album.length}</li>
      <li className="list-group-item">{props.album.releaseYear}</li>
      <button type="button" className="btn btn-danger" onClick={() => props.removeAlbum(props.album)}>Delete Album <FontAwesomeIcon icon={faWarning}/></button>
      <button type="button" className="btn btn-warning" onClick={() => setEditMode(true)}>Edit <FontAwesomeIcon icon={faPencil}/></button>
    </ul>}
    {editMode && <ul className="list-group list-group-flush">
      <li className="list-group-item"><input type="text" className="form-control" value={title} onChange={(evt) => setTitle(evt.currentTarget.value)}/></li>
      <li className="list-group-item"><input type="text" className="form-control" value={artist} onChange={(evt) => setArtist(evt.currentTarget.value)}/></li>
      <li className="list-group-item"><input type="text" className="form-control" value={length} onChange={(evt) => setLength(evt.currentTarget.value)}/></li>
      <li className="list-group-item"><input type="text" className="form-control" value={releaseYear} onChange={(evt) => setReleaseYear(evt.currentTarget.value)}/></li>
      <li className="list-group-item"><button type="button" className="btn btn-secondary" onClick={saveAlbum}>Save</button></li>
    </ul>
    }
  </div>

  )};


export default Album;