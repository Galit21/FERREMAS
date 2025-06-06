import React, { useEffect, useState } from 'react';

export default function CartPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [carrito, setCarrito] = useState([]);

  // Función para abrir/cerrar el popup
  function toggleCart() {
    setIsOpen(!isOpen);
  }

  // Escucha el evento "carritoActualizado" y sincroniza con localStorage
  useEffect(() => {
    // Cargar el carrito al montar
    const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(storedCarrito);

    // Listener para el evento personalizado
    const handleCarritoActualizado = () => {
      const actualizado = JSON.parse(localStorage.getItem('carrito')) || [];
      setCarrito(actualizado);
    };

    window.addEventListener('carritoActualizado', handleCarritoActualizado);

    return () => {
      window.removeEventListener('carritoActualizado', handleCarritoActualizado);
    };
  }, []);

  return (
    <div>
      <div className="cart-button">
        <button className="btn btn-cart" onClick={toggleCart}>🛒 Carrito ({carrito.length})</button>
      </div>

      {isOpen && (
        <div className="cart-popup">
          <h5>Carrito de Compras</h5>

          {carrito.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <ul>
              {carrito.map((item) => (
                <li key={item.id}>
                  {item.nombre} x{item.cantidad} - ${item.precio}
                </li>
              ))}
            </ul>
          )}

          <div className="popup-buttons">
            <button className="btn btn-close-cart" onClick={toggleCart}>Cerrar</button>
            <a href="/carro_compra" className="btn btn-pay">Ir a pagar</a>
          </div>
        </div>
      )}
    </div>
  );
}
