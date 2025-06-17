// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"; // Usando 10.11.1 como ejemplo, ajusta a tu versión
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// ¡Importa el SDK de Realtime Database también!
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js"; // <- Añadimos esta línea

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBU9FvaoF5MGqn4CCRhlUhsxkAhroXwI30",
    authDomain: "ecma-bank.firebaseapp.com",
    projectId: "ecma-bank",
    storageBucket: "ecma-bank.firebasestorage.app",
    messagingSenderId: "160930340797",
    appId: "1:160930340797:web:47bd449fdeea57dd8cfcd4",
    measurementId: "G-FBVZRWFKJX",
    // Opcional: Añade la URL de tu base de datos por defecto si no es la estándar
    // databaseURL: "https://ecma-bank-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Opcional: Si no pusiste databaseURL en config, obtén la instancia aquí si la necesitas globalmente
// const database = getDatabase(app);


// ¡Haz la instancia 'app' accesible globalmente!
window.firebaseApp = app;
// Opcional: Si obtuviste la instancia de DB, hazla global también
// window.firebaseDatabase = database;


console.log("Firebase app inicializada y accesible en window.firebaseApp");
// console.log("Firebase Database inicializada y accesible en window.firebaseDatabase");
