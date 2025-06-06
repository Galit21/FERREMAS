document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.querySelector(".btn-cart");
  const cartPopup = document.getElementById("cart-popup");
  const closeButton = document.querySelector(".btn-close-cart");

  function toggleCart() {
    cartPopup.classList.toggle("d-none");
  }

  if (cartButton && closeButton && cartPopup) {
    cartButton.addEventListener("click", toggleCart);
    closeButton.addEventListener("click", toggleCart);
  }
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

export function agregarProductoLocal(producto) {
  const existente = carrito.find((p) => p.id === producto.id);

  if (existente) {
    existente.cantidad += 1;
    console.log(
      `✅ Producto actualizado: ${existente.nombre} x${existente.cantidad}`
    );
  } else {
    carrito.push({ ...producto, cantidad: 1 });
    console.log(`✅ Producto agregado: ${producto.nombre}`);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  window.dispatchEvent(new CustomEvent("carritoActualizado"));
  console.log("🛒 Carrito actual:", carrito);
}

export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function quitarUnidad(productoId) {
  console.log("🛠️ Entrando a quitarUnidad con ID:", productoId);

  const carrito = obtenerCarrito();
  const index = carrito.findIndex((p) => p.id === productoId);

  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
      console.log(`🔻 Se quitó una unidad de: ${carrito[index].nombre}`);
    } else {
      console.log(
        `❌ Producto eliminado del carrito: ${carrito[index].nombre}`
      );
      carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("🛒 Carrito actualizado:", carrito);
    window.dispatchEvent(new CustomEvent("carritoActualizado"));
  } else {
    console.warn("⚠️ Producto no encontrado en el carrito");
  }
}

function eliminarProducto(productoId) {
  console.log("🗑️ Eliminando producto con ID:", productoId);

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex((p) => p.id === productoId);
  if (index !== -1) {
    const eliminado = carrito[index];
    carrito.splice(index, 1); // Elimina del array
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza localStorage
    console.log(`❌ Producto eliminado del carrito: ${eliminado.nombre}`);
    console.log("🛒 Carrito actualizado:", carrito);

    window.dispatchEvent(new CustomEvent("carritoActualizado"));
  } else {
    console.warn("⚠️ Producto no encontrado en el carrito");
  }
}

function actualizarResumen() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const resumenContainer = document.querySelector(".cart-summary .card-body");

  const subtotal = carrito.reduce((acc, producto) => {
    return acc + producto.precio * producto.cantidad;
  }, 0);

  resumenContainer.innerHTML = `
  <h5 class="card-title mb-4">Resumen</h5>
  <div class="d-flex justify-content-between mb-3">
    <span>Subtotal</span>
    <span>$${subtotal.toFixed()}</span>
  </div>
  <hr />
  <form id="form-webpay" action="http://localhost:3000/webpay/crear" method="POST">
    <input type="hidden" name="amount" id="amountInput" />
    <button type="submit" class="btn btn-warning w-100">Comprar</button>
  </form>

`;
  document.querySelector("#amountInput").value = subtotal.toFixed(0);
}

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".card-body");
  const resumenContainer = document.querySelector(".cart-summary .card-body");

  if (!contenedor || !resumenContainer) return;

  carrito = obtenerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>🛒 Tu carrito está vacío.</p>";
    resumenContainer.innerHTML = "";
    return;
  }

  contenedor.innerHTML = "";
  let subtotal = 0;

  carrito.forEach((producto) => {
    const total = producto.precio * producto.cantidad;
    subtotal += total;

    const item = document.createElement("div");
    item.className = "row cart-item mb-3";
    item.innerHTML = `
      <div class="col-md-3">
        <img src="${producto.imagen}" alt="${
      producto.nombre
    }" class="img-fluid rounded" />
      </div>
      <div class="col-md-5">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="text-muted">${producto.descripcion.slice(0, 40)}...</p>
      </div>
      <div class="col-md-2">
        <div class="input-group">
            <button class="btn btn-outline-secondary btn-quitar" data-quitar-id="${
              producto.id
            }">-</button>
            <input type="text" class="form-control form-control-sm text-center" value="${
              producto.cantidad
            }" disabled />
            <button class="btn btn-outline-secondary btn-sm btn-agregar" data-agregar-id="${
              producto.id
            }">+</button>
        </div>
      </div>
      <div class="col-md-2 text-end">
        <p class="fw-bold">$${total.toFixed(0)}</p>
        <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${
          producto.id
        }">

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
        </button>
      </div>
    `;

    item.querySelector(".btn-quitar").addEventListener("click", () => {
      quitarUnidad(producto.id);
      const cantidadActualizada = obtenerCarrito().find(
        (p) => p.id === producto.id
      )?.cantidad;

      if (!cantidadActualizada) {
        item.remove();
      } else {
        item.querySelector("input").value = cantidadActualizada;
        const precioTotal = cantidadActualizada * producto.precio;
        item.querySelector(".fw-bold").textContent = `$${precioTotal.toFixed(
          2
        )}`;
      }
      actualizarResumen();
    });

    item.querySelector(".btn-agregar").addEventListener("click", () => {
      agregarProductoLocal(producto);
      const cantidadActualizada = obtenerCarrito().find(
        (p) => p.id === producto.id
      )?.cantidad;

      item.querySelector("input").value = cantidadActualizada;
      const precioTotal = cantidadActualizada * producto.precio;
      item.querySelector(".fw-bold").textContent = `$${precioTotal.toFixed(2)}`;
      actualizarResumen();
    });

    // Botón de eliminar (tarro)
    item.querySelector(".btn-eliminar").addEventListener("click", () => {
      eliminarProducto(producto.id);
      item.remove();
      actualizarResumen();
    });

    contenedor.appendChild(item);
  });

  actualizarResumen();
});
