import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
const firebaseConfig = {

  apiKey: "AIzaSyCTSAROvZAhn4omwyaR4xaLuRV1HTjKNHQ",

  authDomain: "crochet-corner-302a9.firebaseapp.com",

  projectId: "crochet-corner-302a9",

  storageBucket: "crochet-corner-302a9.appspot.com",

  messagingSenderId: "49405618553",

  appId: "1:49405618553:web:47ac966757f98b28a4e7a8"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Add this at the top of auth.js
function updateAuthButton() {
    const authLink = document.getElementById('authLink');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        authLink.style.display = 'none';
    } else {
        authLink.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', updateAuthButton);

// Login Form Submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      localStorage.setItem('isLoggedIn', 'true');
      updateAuthButton();
      window.location.href = 'index.html';
    })
    .catch((error) => {
      alert(`Login Error: ${error.message}`);
    });
});

// Signup Form Submission
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      localStorage.setItem('isLoggedIn', 'true');
      updateAuthButton();
      window.location.href = 'index.html';
    })
    .catch((error) => {
      alert(`Signup Error: ${error.message}`);
    });
});

function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    updateAuthButton();
}
