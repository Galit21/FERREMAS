import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";

// Obtener el formulario de login
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Obtener el rol del usuario desde Firestore
    const docSnap = await getDoc(doc(db, 'usuarios', user.uid));
    if (docSnap.exists()) {
      const datos = docSnap.data();
      localStorage.setItem('rol', datos.rol || 'cliente');
    }

    // Redireccionar al inicio tras un login exitoso
    window.location.href = '/inicio';
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    alert('Error al iniciar sesión: Datos incorrectos');
  }
});