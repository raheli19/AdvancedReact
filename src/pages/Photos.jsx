import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../css/Photos.css";

const Photos = () => {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/photos?albumId=${albumId}`)
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error('Error fetching photos:', error));
  }, [albumId]);

  const handleAddPhoto = () => {
    const newPhoto = {
      albumId: parseInt(albumId),
      id: Date.now(),
      title: newPhotoTitle,
      url: newPhotoUrl,
      thumbnailUrl: newPhotoUrl
    };

    fetch('http://localhost:3000/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPhoto),
    })
      .then(response => response.json())
      .then(data => {
        const updatedPhotos = [...photos, data];
        setPhotos(updatedPhotos);
        localStorage.setItem(`photos_album_${albumId}`, JSON.stringify(updatedPhotos));
        setNewPhotoTitle('');
        setNewPhotoUrl('');
      })
      .catch(error => {
        console.error('Error adding photo:', error);
      });
  };

  const handleDeletePhoto = (id) => {
    fetch(`http://localhost:3000/photos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const updatedPhotos = photos.filter((photo) => photo.id !== id);
      setPhotos(updatedPhotos);
      localStorage.setItem(`photos_album_${albumId}`, JSON.stringify(updatedPhotos));
    }).catch(error => {
      console.error('Error deleting photo:', error);
    });
  };

  const handleUpdatePhoto = (id, updatedTitle, updatedUrl) => {
    const updatedPhoto = {
      ...photos.find((photo) => photo.id === id),
      title: updatedTitle,
      url: updatedUrl,
      thumbnailUrl: updatedUrl
    };

    fetch(`http://localhost:3000/photos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPhoto),
    }).then(response => response.json())
      .then(() => {
        const updatedPhotos = photos.map((photo) =>
          photo.id === id ? { ...photo, title: updatedTitle, url: updatedUrl, thumbnailUrl: updatedUrl } : photo
        );
        setPhotos(updatedPhotos);
        localStorage.setItem(`photos_album_${albumId}`, JSON.stringify(updatedPhotos));
      }).catch(error => {
        console.error('Error updating photo:', error);
      });
  };

  return (
    <div>
      <h2>Photos in Album {albumId}</h2>
      <input
        type="text"
        placeholder="New photo URL"
        value={newPhotoUrl}
        onChange={(e) => setNewPhotoUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="New photo title"
        value={newPhotoTitle}
        onChange={(e) => setNewPhotoTitle(e.target.value)}
      />
      <button onClick={handleAddPhoto}>Add Photo</button>
      <div className="photos-container">
        {photos.map((photo) => (
          <div key={photo.id} className="photo">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <h5>{photo.title}</h5>
            <input
              type="text"
              value={photo.title}
              onChange={(e) => handleUpdatePhoto(photo.id, e.target.value, photo.url)}
            />
            <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
