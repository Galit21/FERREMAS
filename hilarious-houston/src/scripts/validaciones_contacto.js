// Función para cargar regiones y comunas desde el archivo JSON
async function cargarRegionesYComunas() {
  const regionSelect = document.getElementById("region");
  const comunaSelect = document.getElementById("comuna");

  try {
    // Cargar datos desde el archivo JSON
    const response = await fetch('/data/regiones_comunas.json');
    if (!response.ok) {
      throw new Error('Error al cargar los datos de regiones y comunas');
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
      comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>'; // Limpiar comunas

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
    console.error('Error al cargar regiones y comunas:', error);
  }
}

// Función para validar el RUT
function validarRUT(rut) {
  rut = rut.replace(/\./g, "").replace("-", "");
  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1).toUpperCase();

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplo * parseInt(cuerpo[i]);
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado =
    dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvCalculado;
}

// Validar RUT al perder el foco
document.getElementById("rut").addEventListener("blur", (e) => {
  const rut = e.target.value;
  if (!validarRUT(rut)) {
    alert("El RUT ingresado no es válido.");
    e.target.value = "";
  }
});

// Inicializar funciones al cargar la página
document.addEventListener("DOMContentLoaded", cargarRegionesYComunas);