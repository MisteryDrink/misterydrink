// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBv1l_X-v8Pkx0SFlihX-MgaggDpLjszlo",
    authDomain: "misterydrink-793be.firebaseapp.com",
    projectId: "misterydrink-793be",
    storageBucket: "misterydrink-793be.firebasestorage.app",
    messagingSenderId: "573477951097",
    appId: "1:573477951097:web:7bf8fcd5dd343efceba6a8",
    measurementId: "G-GZBDHQN36Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

console.log('Firebase initialized');

// Registro
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let email = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    console.log('Registering user:', email);
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registro exitoso
            console.log('User registered:', userCredential.user);
            alert('Cuenta creada con éxito!');
            window.location.href = 'login.html';
        })
        .catch((error) => {
            // Manejo de errores
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error registering user:', errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
        });
});

// Inicio de Sesión
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let email = document.getElementById('loginUsername').value;
    let password = document.getElementById('loginPassword').value;

    console.log('Logging in user:', email);
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Inicio de sesión exitoso
            console.log('User logged in:', userCredential.user);
            window.location.href = 'menu.html';
        })
        .catch((error) => {
            // Manejo de errores
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error logging in user:', errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
        });
});

  