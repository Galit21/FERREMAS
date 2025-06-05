import { createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { validarFormulario } from "./validaciones_registro.js";

// Función para registrar un usuario
export async function registrarUsuario(email, password, datosAdicionales) {
  try {
    // Registrar al usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      nombre: datosAdicionales.nombre,
      apellido: datosAdicionales.apellido,
      fechaNacimiento: datosAdicionales.fechaNacimiento,
      telefono: datosAdicionales.telefono,
      region: datosAdicionales.region,
      comuna: datosAdicionales.comuna,
      rut: datosAdicionales.rut,
      email: user.email,
      id_rol: 2, // Asignar rol de usuario por defecto
    });

    return userCredential;
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    alert("Error al registrar usuario: " + error.message);
    return null;
  }
}

// Función para enviar verificación de correo
async function enviarVerificacionCorreo(user) {
  try {
    await sendEmailVerification(user);
    alert("Se ha enviado un correo de verificación. Por favor, revisa tu bandeja de entrada.");
  } catch (error) {
    console.error("Error al enviar correo de verificación:", error.message);
  }
}

// Función para validar el formato del RUT
function validarRUT(rut) {
  const regex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/; // Formato: 12.345.678-9
  return regex.test(rut);
}

// Función para validar el número de teléfono
function validarTelefono(telefono) {
  const regex = /^\+56\d{9}$/; // Formato: +56912345678
  return regex.test(telefono);
}

// Función para validar la contraseña
function validarContrasena(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Al menos 1 mayúscula, 1 número, y 8 caracteres
  return regex.test(password);
}

// Verificar si el correo ya está registrado
async function verificarCorreo(email) {
  const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  return signInMethods.length > 0; // Retorna true si el correo ya está registrado
}

// Manejar el evento de envío del formulario
document.getElementById("registroForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evitar que la página se recargue

  const email = document.getElementById("email").value;

  // Verificar si el correo ya está registrado
  if (await verificarCorreo(email)) {
    alert("El correo electrónico ya está en uso. Por favor, utiliza otro correo.");
    return;
  }

  // Validar los campos del formulario
  if (!validarFormulario()) {
    return; // Detener el registro si hay errores
  }

  // Obtener los valores del formulario
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const password = document.getElementById("password").value;
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const telefono = document.getElementById("telefono").value;
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;
  const rut = document.getElementById("rut").value;

  // Registrar al usuario
  const userCredential = await registrarUsuario(email, password, {
    nombre,
    apellido,
    fechaNacimiento,
    telefono,
    region,
    comuna,
    rut,
  });

  // Enviar correo de verificación
  if (userCredential) {
    await enviarVerificacionCorreo(userCredential.user);
  }
});

