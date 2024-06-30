import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import "../css/Albums.css";

function Albums({ user }) {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const { userId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/albums?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
        localStorage.setItem("albums", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, [user]);

  const handleAddAlbum = () => {
    const newAlbum = {
      userId: user.id,
      id: `${Date.now()}`,
      title: newAlbumTitle
    };

    fetch('http://localhost:3000/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAlbum),
    })
      .then(response => response.json())
      .then(data => {
        const updatedAlbums = [...albums, data];
        setAlbums(updatedAlbums);
        localStorage.setItem("albums", JSON.stringify(updatedAlbums));
        setNewAlbumTitle('');
      })
      .catch(error => {
        console.error('Error adding album:', error);
      });
  };

  const filteredAlbums = albums.filter(album =>
    album.id.toString().includes(searchTerm) || album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Albums</h2>
      <input
        type="text"
        placeholder="Search albums"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="New album title"
        value={newAlbumTitle}
        onChange={(e) => setNewAlbumTitle(e.target.value)}
      />
      <button onClick={handleAddAlbum}>Add Album</button>
      <div className="albums-container">
        {filteredAlbums.map((album) => (
          <Link
            key={album.id}
            to={`/albums/${userId}/id/${album.id}`}
            className="album-link"
          >
            <div className="album">
              <FontAwesomeIcon icon={faFolder} className="folder-icon" style={{ fontSize: '150px' }} />
              <h5 className="album-id">{`Album Id: ${album.id}`}</h5>
              <h6 className="album-title">{album.title}</h6>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Albums;
