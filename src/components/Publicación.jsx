// src/components/Publicación.jsx
import React from 'react';
import './Publicación.css'; // Asegúrate de que los estilos están bien importados

const Publicación = ({ username, imageUrl, caption, onClick }) => {
  return (
    <div className="publicación" onClick={onClick}>
      <div className="publicación-header">
        <h3>{username}</h3>
      </div>
      <div className="publicación-image">
        <img src={imageUrl} alt="Publicación" />
      </div>
      <div className="publicación-caption">
        <p>{caption}</p>
      </div>
    </div>
  );
};

export default Publicación;
