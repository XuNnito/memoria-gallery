import React, { useState } from 'react';
import './Encabezado.css';
import OjitoImg from '../imagenes/dibujo ojito.jpg';

const Encabezado = () => {
  const [expanded, setExpanded] = useState(false);

  const handleImageClick = () => {
    setExpanded(!expanded);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2>HAY QUE CREAR RECUERDOS</h2>
      </div>
      <div className="header-right">
        <img
          src={OjitoImg}
          alt="Usuario"
          className={`profile-pic ${expanded ? 'expanded' : ''}`}
          onClick={handleImageClick}
        />
        {expanded && (
          <div className="popup-message">
            <p>Para cambiar foto del perfil o iniciar sesión, próximamente, aún está en mantenimiento.</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Encabezado;

