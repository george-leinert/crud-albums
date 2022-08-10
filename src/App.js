import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from 'nanoid';
import React, {useState, useEffect} from 'react';
import AddAlbum from './Components/AddAlbum';
import _ from 'lodash';
import Album from './Components/Album';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



function App() {

  const [allAlbums, setAllAlbums] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  useEffect(() => {
    if(localStorage){
      const albumsLocalStorage = JSON.parse(localStorage.getItem('albums'));

      if(albumsLocalStorage){
        saveAlbums(albumsLocalStorage);
      } else {
        saveAlbums(albums);
      }
    }

  }, []);

  const saveAlbums = (albums) => {
    setAllAlbums(albums);
    setSearchResults(albums);

    if(localStorage){
      localStorage.setItem('albums', JSON.stringify(albums));

    }
  }

  const searchAlbums = () => {
    let keywordsArray = [];

    if (keywords){
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if(releaseYear){
      keywordsArray.push(releaseYear);
    }

    if (keywordsArray.length > 0){
      const searchResults = allAlbums.filter(album => {
        for(const word of keywordsArray){
          if(album.title.toLowerCase().includes(word) || album.artist.toLowerCase().includes(word) || album.releaseYear == (word)){
            return(true);
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    }
    else {
      setSearchResults(allAlbums);
    }
  }

  const removeAlbum = (albumToDelete) => {
    const updatedAlbumsArray = allAlbums.filter(album => album.id !== albumToDelete.id);
    saveAlbums(updatedAlbumsArray);
  }

  const updateAlbum = (updatedAlbum) => {
    const updatedAlbumsArray = allAlbums.map(album => album.id === updatedAlbum.id ? {...album, ...updatedAlbum} : album);
    saveAlbums(updatedAlbumsArray);
  }

  const albums = [{
    id:nanoid(),
    title: "Hardcore Heaven",
    artist: "Alice Gas",
    length: "18:51",
    releaseYear: "2021"}, 
    {
    id:nanoid(),
    title: "This User Has Gone Offline",
    artist: "Capoxxo",
    length: "26:48",
    releaseYear: "2018"
    },
    {
    id:nanoid(),
    title: "Red Light",
    artist: "Bladee",
    length: "40:08",
    releaseYear: "2018"}, 
    {
      id:nanoid(),
      title: "E",
      artist: "Ecco2k",
      length: "30:19",
      releaseYear: "2019"
    }
  ];

  const addAlbum = (newAlbum) => {
    const updatedAlbums = [...allAlbums, newAlbum];
    saveAlbums(updatedAlbums);
  }

  return (
    <div className="container">
      <div className="row" id="allAlbums">
        {searchResults && searchResults.map((album) => (
          <div className="col-lg-3" key={album.id}>
            <Album album={album} removeAlbum={removeAlbum} updateAlbum={updateAlbum}/>
        </div>
        ))}
      </div>
      <AddAlbum addAlbum={addAlbum}/>
      <div className="row mt-4" id="search">
        <h3>Search Albums</h3>
        <div className="col-lg-4">
          <label htmlFor="txtKeywords" className="form-label">Search By Title Or Artist</label>
          <input type="text" className="form-control" onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords}/>
        </div>
        <div className="col-lg-4">
          <label htmlFor="year" className="form-label">Search By Release Year</label>
          <select className="form-select" value={releaseYear} onChange={evt => setReleaseYear(evt.currentTarget.value)}>
            <option value="">Select Year</option>
            {_(allAlbums).map(album => album.releaseYear).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
          </select>
        </div>
        <div className="col-lg-4">
          <button type="button" className="btn btn-primary btn-lg" onClick={searchAlbums}>Search <FontAwesomeIcon icon={faSearch}/></button>
        </div>
      </div>
    </div>
  );
}

export default App;
