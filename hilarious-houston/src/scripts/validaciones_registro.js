// Función para cargar regiones y comunas desde el archivo JSON
async function cargarRegionesYComunas() {
  const regionSelect =
    typeof document !== "undefined" ? document.getElementById("region") : null;
  const comunaSelect =
    typeof document !== "undefined" ? document.getElementById("comuna") : null;
  if (!regionSelect || !comunaSelect) return;

  try {
    // Cargar datos desde el archivo JSON
    const response = await fetch("/data/regiones_comunas.json");
    if (!response.ok) {
      throw new Error("Error al cargar los datos de regiones y comunas");
    }
    const regionesComunas = await response.json();

    // Llenar el desplegable de regiones
    regionesComunas.forEach((region) => {
      const option = document.createElement("option");
      option.value = region.codigo;
      option.textContent = region.nombre;
      regionSelect.appendChild(option);
    });

    // Actualizar comunas según la región seleccionada
    regionSelect.addEventListener("change", () => {
      const regionCodigo = regionSelect.value;
      comunaSelect.innerHTML =
        '<option value="">Selecciona una comuna</option>'; // Limpiar comunas

      const region = regionesComunas.find((r) => r.codigo === regionCodigo);
      if (region) {
        region.comunas.forEach((comuna) => {
          const option = document.createElement("option");
          option.value = comuna;
          option.textContent = comuna;
          comunaSelect.appendChild(option);
        });
      }
    });
  } catch (error) {
    console.error("Error al cargar regiones y comunas:", error);
  }
}

// Función para validar el formato del RUT
function validarRUT(rut) {
  const regex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/; // Formato: 12.345.678-9
  return regex.test(rut);
}

// Función para validar el número de teléfono en formato chileno
function validarTelefono(telefono) {
  const regex = /^\+56(9\d{8})$/; // Formato: +56912345678
  return regex.test(telefono);
}

// Función para validar la contraseña
function validarContrasena(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Al menos 1 mayúscula, 1 número, y 8 caracteres
  return regex.test(password);
}

// Función para validar los campos del formulario
function validarFormulario() {
  const rut = document.getElementById("rut").value;
  const telefono = document.getElementById("telefono").value;
  const password = document.getElementById("password").value;

  if (!validarRUT(rut)) {
    alert("El RUT no es válido. Debe tener el formato 12.345.678-9.");
    return false;
  }

  if (!validarTelefono(telefono)) {
    alert(
      "El número de teléfono no es válido. Debe tener el formato +56912345678."
    );
    return false;
  }

  if (!validarContrasena(password)) {
    alert(
      "La contraseña debe tener al menos 1 mayúscula, 1 número y 8 caracteres."
    );
    return false;
  }

  return true; // Si todo está bien, retorna true
}

// Mostrar un mensaje debajo del campo de contraseña
if (typeof document !== "undefined") {
  document.getElementById("password").addEventListener("focus", () => {
    let mensaje = document.getElementById("password-help");
    if (!mensaje) {
      mensaje = document.createElement("div");
      mensaje.id = "password-help";
      mensaje.style.color = "gray";
      mensaje.style.fontSize = "0.8rem";
      mensaje.textContent =
        "La contraseña debe tener al menos 1 mayúscula, 1 número y 8 caracteres.";
      document.getElementById("password").parentNode.appendChild(mensaje);
    }
  });

  // Eliminar el mensaje cuando el usuario salga del campo
  document.getElementById("password").addEventListener("blur", () => {
    const mensaje = document.getElementById("password-help");
    if (mensaje) {
      mensaje.remove();
    }
  });

  // Inicializar funciones al cargar la página
  document.addEventListener("DOMContentLoaded", cargarRegionesYComunas);
}

// Exportar las funciones para usarlas en otros archivos
export { validarFormulario };
