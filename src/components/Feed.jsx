import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Publicación from './Publicación';
import Modal from './Modal'; // Importa el componente Modal
import './Feed.css';
import AlmitaImg from '../imagenes/Almita.jpg';
import oImg from '../imagenes/o.jpg';
import AenfeImg from '../imagenes/enfermera.jpg';

const Feed = () => {
  const postsData = [
    { id: 1, username: 'Distraida', imageUrl: AenfeImg, caption: '¡Tomada en la prepa!' },
    { id: 2, username: 'Almita', imageUrl: AlmitaImg, caption: '¡Distraida 29/May/2024!' },
    { id: 3, username: 'Mas', imageUrl: oImg, caption: '¡Quema de libro 2022!' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ imageUrl: '', caption: '' });

  const handleSwipeLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % postsData.length);
  };

  const handleSwipeRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + postsData.length) % postsData.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  const getVisiblePosts = () => {
    const visiblePosts = [];
    for (let i = 0; i < 2; i++) {
      visiblePosts.push(postsData[(currentIndex + i) % postsData.length]);
    }
    return visiblePosts;
  };

  const openModal = (imageUrl, caption) => {
    setModalContent({ imageUrl, caption });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="feed" {...handlers}>
      <button className="carousel-button carousel-button-left" onClick={handleSwipeRight}>{'<'}</button>
      <div className="carousel">
        {getVisiblePosts().map((post) => (
          <Publicación
            key={post.id}
            username={post.username}
            imageUrl={post.imageUrl}
            caption={post.caption}
            onClick={() => openModal(post.imageUrl, post.caption)} // Agrega el evento onClick para abrir el modal
          />
        ))}
      </div>
      <button className="carousel-button carousel-button-right" onClick={handleSwipeLeft}>{'>'}</button>
      {isModalOpen && (
        <Modal
          imageUrl={modalContent.imageUrl}
          caption={modalContent.caption}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Feed;
