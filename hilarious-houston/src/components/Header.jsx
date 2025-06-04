import React, { useEffect, useState } from 'react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`header ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="header-left">
        <button className="btn btn-header" onClick={() => (window.location.href = '/productos')}>Productos</button>
        <button className="btn btn-header" onClick={() => (window.location.href = '/contacto')}>Contacto</button>
      </div>
      <img src="/img/logo_sidenf.png" alt="Logo" className="logo" />
      <button className="login-button" onClick={() => (window.location.href = '/login')}>Iniciar sesión</button>
    </div>
  );
}