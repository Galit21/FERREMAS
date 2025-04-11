document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.querySelector('.btn-cart');
    const cartPopup = document.getElementById('cart-popup');
    const closeButton = document.querySelector('.btn-close-cart');
  
    // Función para mostrar/ocultar el popup del carrito
    function toggleCart() {
      cartPopup.classList.toggle('d-none');
    }
  
    // Eventos para abrir y cerrar el carrito
    cartButton.addEventListener('click', toggleCart);
    closeButton.addEventListener('click', toggleCart);
  });