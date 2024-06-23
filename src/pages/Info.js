import React from "react";

function Info({ user }) {
  if (!user) {
    return <div></div>;
  }

  const infoContainerStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "20px auto",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const infoTitleStyle = {
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  };

  const infoDetailsStyle = {
    lineHeight: "1.6",
  };

  const infoFieldStyle = {
    marginBottom: "10px",
  };

  const strongStyle = {
    color: "#555",
  };

  const hrStyle = {
    border: "1px solid #ddd",
    margin: "20px 0",
  };

  return (
    <div style={infoContainerStyle}>
      <h1 style={infoTitleStyle}>User Information</h1>
      <hr style={hrStyle} />
      <div style={infoDetailsStyle}>
        <p style={infoFieldStyle}>
          <strong style={strongStyle}>ID:</strong> {user.id}
        </p>
        <p style={infoFieldStyle}>
          <strong style={strongStyle}>Name:</strong> {user.name}
        </p>
        <p style={infoFieldStyle}>
          <strong style={strongStyle}>Username:</strong> {user.username}
        </p>
        <p style={infoFieldStyle}>
          <strong style={strongStyle}>Email:</strong> {user.email}
        </p>
        <p style={infoFieldStyle}>
          <strong style={strongStyle}>Address:</strong> {user.address.street},{" "}
          {user.address.suite}, {user.address.city}, {user.address.zipcode}
        </p>
        <p style={infoFieldStyle}>
          <strong style={strongStyle}>Geo:</strong> Lat: {user.address.geo.lat},
          Lng: {user.address.geo.lng}
        </p>
        <p style={infoFieldStyle}>
          <strong style={strongStyle}>Phone:</strong> {user.phone}
        </p>
        <p style={infoFieldStyle}>
          <strong style={strongStyle}>Website:</strong> {user.website}
        </p>
        <p style={infoFieldStyle}>
          <strong style={strongStyle}>Company:</strong> {user.company.name},{" "}
          {user.company.catchPhrase}, {user.company.bs}
        </p>
      </div>
    </div>
  );
}

export default Info;
