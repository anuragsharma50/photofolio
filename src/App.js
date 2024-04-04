import { useState } from 'react';
import './App.css';
import AlbumsList from './Components/AlbumsList';
import Album from './Components/Album';

function App() {
  const [selectedAlbum,setSelectedAlbum] = useState(null);

  const updateSelectedAlbum = (album) => {
    setSelectedAlbum(album);
  }

  return (
    <div className="App">
      <header className='header'>Photofolio</header>
      {
        selectedAlbum 
          ? <Album selectedAlbum={selectedAlbum} updateSelectedAlbum={updateSelectedAlbum} /> 
          : <AlbumsList updateSelectedAlbum={updateSelectedAlbum} />
      }
      
    </div>
  );
}

export default App;
