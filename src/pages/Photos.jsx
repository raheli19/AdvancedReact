/*This component allows users to view, add, delete, and update photos in an album. 
It fetches photos from the server based on the album ID, displays them, and provides functionality to add, delete, and update photos.
 */


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../css/Photos.css";

const Photos = () => {

  //Extracts albumId from the URL parameters.
  const { albumId } = useParams();

  //State for storing the list of photos.
  const [photos, setPhotos] = useState([]);

  //State for storing the URL of a new photo being added.
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  
  //State for storing the title of a new photo being added
  const [newPhotoTitle, setNewPhotoTitle] = useState('');

  useEffect(() => {
    fetchPhotos();
  }, [albumId]);

  //Makes a GET request to fetch photos for the specified album
  const fetchPhotos = () => {
    fetch(`http://localhost:3000/photos?albumId=${albumId}`)
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error('Error fetching photos:', error));
  };

  //This function is called when the user clicks the "Add Photo" button.
  const handleAddPhoto = () => {

    //Ensures that the photo title and URL are not empty
    if (newPhotoTitle.trim() === "" || newPhotoUrl.trim() === "") return;

    //Creates a new photo object with the album ID, title, URL, and thumbnail URL.
    const newPhoto = {
      albumId: parseInt(albumId, 10),
      title: newPhotoTitle,
      url: newPhotoUrl,
      thumbnailUrl: newPhotoUrl
    };

    //Makes a POST request to add the new photo to the server.
    fetch('http://localhost:3000/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPhoto),
    })
      .then(response => response.json())
      .then(data => {
        //Updates the photos state with the newly added photo
        setPhotos([...photos, data]);
        setNewPhotoTitle('');
        setNewPhotoUrl('');
      })
      .catch(error => {
        console.error('Error adding photo:', error);
      });
  };

  //This function is called when the user clicks the "Delete" button on a photo.
  const handleDeletePhoto = (id) => {
    //Makes a DELETE request to remove the photo from the server.
    fetch(`http://localhost:3000/photos/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      const updatedPhotos = photos.filter((photo) => photo.id !== id);
      setPhotos(updatedPhotos);
    })
    .catch(error => {
      console.error('Error deleting photo:', error);
    });
  };

  //This function is called when the user updates a photo
  const handleUpdatePhoto = (id, updatedTitle, updatedUrl) => {
    //Creates an updated photo object with the new title and URL
    const updatedPhoto = {
      ...photos.find((photo) => photo.id === id),
      title: updatedTitle,
      url: updatedUrl,
      thumbnailUrl: updatedUrl
    };

    //Makes a PUT request to update the photo on the server.
    fetch(`http://localhost:3000/photos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPhoto),
    })
    .then(response => response.json())
    .then(data => {
      const updatedPhotos = photos.map((photo) =>
        photo.id === id ? data : photo
      );
      setPhotos(updatedPhotos);
    })
    .catch(error => {
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
