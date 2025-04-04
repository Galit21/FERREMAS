import React, { useState } from 'react';

export default function Hero() {
  const images = ['/img/Ferreteria.jpg', '/img/Ferreteria2.jpg', '/img/Ferreteria3.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextSlide() {
    setCurrentIndex((currentIndex + 1) % images.length);
  }

  function prevSlide() {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  }

  return (
    <div className="hero">
      <button className="btn-prev" onClick={prevSlide}>❮</button>
      <img src={images[currentIndex]} alt="Imagen Principal" />
      <button className="btn-next" onClick={nextSlide}>❯</button>
    </div>
  );
}