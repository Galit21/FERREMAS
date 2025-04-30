// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (obtén esto desde Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyDPi_8hN1XbqUFpk2Uv7U4vdJuS2R8UgKY",
    authDomain: "ferremas-d854c.firebaseapp.com",
    projectId: "ferremas-d854c",
    storageBucket: "ferremas-d854c.firebasestorage.app",
    messagingSenderId: "624463978544",
    appId: "1:624463978544:web:dcdb625728e70704220df5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };