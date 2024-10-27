import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase, ref, query, limitToFirst, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyCTSAROvZAhn4omwyaR4xaLuRV1HTjKNHQ",
  authDomain: "crochet-corner-302a9.firebaseapp.com",
  projectId: "crochet-corner-302a9",
  storageBucket: "crochet-corner-302a9.appspot.com",
  messagingSenderId: "49405618553",
  appId: "1:49405618553:web:47ac966757f98b28a4e7a8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Reference to the patterns in the database
const patternsRef = ref(db, 'patterns');

// Create a query to limit the number of patterns to 3
const limitedPatternsQuery = query(patternsRef, limitToFirst(3));

// Fetch patterns data from Firebase
get(limitedPatternsQuery)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const patterns = snapshot.val();
      renderPatternGallery(patterns);
    } else {
      displayError('No patterns found in database');
    }
  })
  .catch((error) => {
    console.error('Failed to load patterns:', error);
    displayError('Failed to load patterns: ' + error.message);
  });

// Function to render the pattern gallery
function renderPatternGallery(patterns) {
  const gallery = document.getElementById('pattern-gallery');
  gallery.innerHTML = ''; // Clear any existing content

  const patternsArray = Object.values(patterns);

  patternsArray.forEach((pattern) => {
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
    const patternNameEncoded = encodeURIComponent(pattern.name);
    link.href = `pattern.html?name=${patternNameEncoded}`;
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
