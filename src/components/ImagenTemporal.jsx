import React, { useState, useEffect } from 'react';
import './ImagenTemporal.css';

const ImagenTemporal = ({ imageUrl, onClose }) => {
  const [progress, setProgress] = useState(0); // Inicia la barra de progreso en 0%

  useEffect(() => {
    const startTime = Date.now();
    const duration = 7000; // Duración en milisegundos (7 segundos)
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = (elapsed / duration) * 100;
      
      setProgress(percentage);

      if (elapsed >= duration) {
        clearInterval(interval);
        onClose(); // Cierra el componente cuando la barra de progreso llega a 100%
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onClose]);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  return (
    <div className="imagen-temporal-overlay" onClick={onClose}>
      <div className="imagen-temporal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Imagen Temporal" className="imagen-temporal-image" />
        <div className="imagen-temporal-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ImagenTemporal;
