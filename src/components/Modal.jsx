import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ imageUrl, onClose }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleShowDate = () => {
    setShowMessage(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img src={imageUrl} alt="Fecha Especial" className="modal-image" />
          <button className="modal-close" onClick={onClose}>Cerrar</button>
        </div>
        <div className="modal-footer">
          <button className="modal-show-date" onClick={handleShowDate}>Ver fecha</button>
          {showMessage && (
            <div className="modal-message-container">
              <div className="modal-message">
                Próximamente serás llevado a la fecha de publicación. Aún está en mantenimiento.
                <button className="modal-close" onClick={onClose}>Cerrar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
