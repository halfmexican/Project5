import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyCTSAROvZAhn4omwyaR4xaLuRV1HTjKNHQ",
  authDomain: "crochet-corner-302a9.firebaseapp.com",
  projectId: "crochet-corner-302a9",
  storageBucket: "crochet-corner-302a9.appspot.com",
  messagingSenderId: "49405618553",
  appId: "1:49405618553:web:47ac966757f98b28a4e7a8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const passwordResetSection = document.getElementById('password-reset-section');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToLoginLink = document.getElementById('back-to-login-link');

passwordResetSection.style.display = 'none';
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Hide login and signup sections
    loginSection.style.display = 'none';
    signupSection.style.display = 'none';

    // Show password reset section
    passwordResetSection.style.display = 'block';
});

// Event listener for "Back to Login" link
backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Hide password reset section
    passwordResetSection.style.display = 'none';

    // Show login and signup sections
    loginSection.style.display = 'block';
    signupSection.style.display = 'block';
});

// Handle the password reset form submission
const passwordResetForm = document.getElementById('password-reset-form');
const passwordResetMessage = document.getElementById('password-reset-message');

passwordResetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reset-email').value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            passwordResetMessage.textContent = 'Password reset email sent. Please check your inbox.';
            passwordResetMessage.style.color = 'green';
        })
        .catch((error) => {
            console.error('Error sending password reset email:', error);
            passwordResetMessage.textContent = 'Error sending password reset email: ' + error.message;
            passwordResetMessage.style.color = 'red';
        });
});

// Function to update the Auth button visibility
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

// Password Requirements Regex
const passwordRequirements = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const signupForm = document.getElementById('signupForm');
const signupPasswordInput = document.getElementById('signupPassword');
const signupConfirmPasswordInput = document.getElementById('signupConfirmPassword');
const signupPasswordError = document.getElementById('signupPasswordError');
const signupConfirmPasswordError = document.getElementById('signupConfirmPasswordError');

function validatePasswords() {
  const password = signupPasswordInput.value;
  const confirmPassword = signupConfirmPasswordInput.value;

  // Validate password requirements
  if (!passwordRequirements.test(password)) {
    signupPasswordError.textContent = 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.';
  } else {
    signupPasswordError.textContent = '';
  }

  // Check if passwords match
  if (confirmPassword && password !== confirmPassword) {
    signupConfirmPasswordError.textContent = 'Passwords do not match.';
  } else {
    signupConfirmPasswordError.textContent = '';
  }
}

signupPasswordInput.addEventListener('input', validatePasswords);
signupConfirmPasswordInput.addEventListener('input', validatePasswords);

// Signup Form Submission
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = signupPasswordInput.value;
  const confirmPassword = signupConfirmPasswordInput.value;

  // Validate password requirements
  if (!passwordRequirements.test(password)) {
    signupPasswordError.textContent = 'Password does not meet the requirements.';
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    signupConfirmPasswordError.textContent = 'Passwords do not match.';
    return;
  }

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