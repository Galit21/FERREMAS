function mostrarContenido(tipo) {
  const contenido = document.getElementById("contenido");
  if (tipo === "pedidos") {
    contenido.innerHTML = "<h2>Gestión de Pedidos</h2><p>Aquí puedes gestionar los pedidos.</p>";
  } else if (tipo === "inventario") {
    contenido.innerHTML = "<h2>Gestión de Inventario</h2><p>Aquí puedes gestionar el inventario.</p>";
  } else if (tipo === "crearOrden") {
    contenido.innerHTML = "<h2>Crear Orden</h2><p>Aquí puedes crear una nueva orden.</p>";
  }
}