import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
const patternsRef = ref(db, 'patterns');

function renderSkillGallery() {
  const gallery = document.getElementById('pattern-gallery');
  gallery.innerHTML = ''; // Clear existing content

  const skillLevels = [
      { name: 'Beginner', color: '#4CAF50' },
      { name: 'Intermediate', color: '#2196F3' },
      { name: 'Advanced', color: '#F44336' },
      { name: 'Members Only', color: '#9C27B0' }
  ];

  skillLevels.forEach(skill => {
      const article = document.createElement('article');
      article.classList.add('pattern');
      
      const colorBlock = document.createElement('div');
      colorBlock.style.backgroundColor = skill.color;
      colorBlock.style.height = '200px';
      colorBlock.style.width = '100%';
      article.appendChild(colorBlock);

      const title = document.createElement('h3');
      title.textContent = skill.name;
      article.appendChild(title);

      article.addEventListener('click', () => {
          get(patternsRef).then((snapshot) => {
              if (snapshot.exists()) {
                  const patterns = snapshot.val();
                  const filteredPatterns = patterns.filter(pattern => 
                      pattern.details.some(detail => 
                          detail.title === 'Skill Level' && 
                          detail.content === skill.name
                      )
                  );
                  renderPatternGallery(filteredPatterns);
              }
          });
      });

      gallery.appendChild(article);
  });
}

function renderPatternGallery(patterns) {
  const gallery = document.getElementById('pattern-gallery');
  gallery.innerHTML = ''; 

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

    gallery.appendChild(article);
  });
}

function displayError(message) {
  const gallery = document.getElementById('pattern-gallery');
  gallery.innerHTML = `<p>${message}</p>`;
}

get(patternsRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            renderSkillGallery();
        } else {
            displayError('No patterns found in database');
        }
    })
    .catch((error) => {
        displayError('Failed to load patterns: ' + error.message);
    });