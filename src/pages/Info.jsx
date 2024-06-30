import React from "react";
import "../css/Info.css"; // Import the new CSS file

function Info({ user }) {
  if (!user) {
    return <div></div>;
  }

  return (
    <div className="info-container">
      <h1 className="info-title">User Information</h1>
      <hr className="info-hr" />
      <div className="info-details">
        <p className="info-field">
          <strong>ID:</strong> {user.id}
        </p>
        <p className="info-field">
          <strong>Name:</strong> {user?.name}
        </p>
        <p className="info-field">
          <strong>Username:</strong> {user?.username}
        </p>
        <p className="info-field">
          <strong>Email:</strong> {user?.email}
        </p>
        <p className="info-field">
          <strong>Address:</strong> {user?.address?.street}, {user?.address?.suite}, {user?.address?.city}, {user?.address?.zipcode}
        </p>
        <p className="info-field">
          <strong>Geo:</strong> Lat: {user?.address?.geo?.lat}, Lng: {user?.address?.geo?.lng}
        </p>
        <p className="info-field">
          <strong>Phone:</strong> {user?.phone}
        </p>
        <p className="info-field">
          <strong>Website:</strong> {user?.website}
        </p>
        <p className="info-field">
          <strong>Company:</strong> {user?.company?.name}, {user?.company?.catchPhrase}, {user?.company?.bs}
        </p>
      </div>
    </div>
  );
}

export default Info;
