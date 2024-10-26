
// Import the functions you need from the Firebase SDKs
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

// Fetch patterns data from the JSON file
fetch('data/patterns.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    renderPatternGallery(data.patterns);
  })
  .catch(error => {
    console.error('Failed to load patterns:', error);
    displayError('Failed to load patterns: ' + error.message);
  });

// Function to render the pattern gallery
function renderPatternGallery(patterns) {
  const gallery = document.getElementById('pattern-gallery');
  gallery.innerHTML = ''; // Clear any existing content

  patterns.forEach((pattern, index) => {
    // Create the pattern article
    const article = document.createElement('article');
    article.classList.add('pattern');

    // Pattern Image
    const img = document.createElement('img');
    img.src = pattern.images[0].src;
    img.alt = pattern.images[0].alt;
    article.appendChild(img);

    // Pattern Title
    const title = document.createElement('h3');
    title.textContent = pattern.name;
    article.appendChild(title);

    // Pattern Description
    const description = document.createElement('p');
    description.textContent = pattern.description;
    article.appendChild(description);

    // View Pattern Button
    const link = document.createElement('a');
    link.href = `pattern.html?index=${index}`;
    link.classList.add('button');
    link.textContent = 'View Pattern';
    article.appendChild(link);

    // Append the article to the gallery
    gallery.appendChild(article);
  });
}

function displayError(message) {
  const gallery = document.getElementById('pattern-gallery');
  gallery.innerHTML = `<p>${message}</p>`;
}
export { auth };
