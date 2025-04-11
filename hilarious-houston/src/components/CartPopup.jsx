import React, { useState } from 'react';

export default function CartPopup() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleCart() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <div className="cart-button">
        <button className="btn btn-cart" onClick={toggleCart}>🛒 Carrito</button>
      </div>

      {isOpen && (
        <div className="cart-popup">
          <h5>Carrito de Compras</h5>
          <p>No hay productos en el carrito.</p>
          <div className="popup-buttons">
            <button className="btn btn-close-cart" onClick={toggleCart}>Cerrar</button>
            <button className="btn btn-pay">Ir a pagar</button>
          </div>
        </div>
      )}
    </div>
  );
}