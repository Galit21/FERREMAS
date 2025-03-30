// Evento que cambia el titulo a usuarios
document.getElementById("gestor_usuario").addEventListener("click", function () {
  document.getElementById('titulo_admin').textContent = "Gestor de Usuarios"
});

// Evento que cambia el titulo a inventario
document.getElementById("gestor_inventorio").addEventListener("click", function () {
    document.getElementById('titulo_admin').textContent = "Gestor de Inventario"
  });

// Evento que cambia el titulo a usuarios
document.getElementById("gestor_compras").addEventListener("click", function () {
    document.getElementById('titulo_admin').textContent = "Gestor de Compras"
  });