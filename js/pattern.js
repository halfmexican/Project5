import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

const firebaseConfig = {
  apiKey: "AIzaSyCTSAROvZAhn4omwyaR4xaLuRV1HTjKNHQ",
  authDomain: "crochet-corner-302a9.firebaseapp.com",
  projectId: "crochet-corner-302a9",
  storageBucket: "crochet-corner-302a9.appspot.com",
  messagingSenderId: "49405618553",
  appId: "1:49405618553:web:47ac966757f98b28a4e7a8"
};

document.addEventListener('DOMContentLoaded', function() {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    
    const urlParams = new URLSearchParams(window.location.search);
    const patternIndex = urlParams.get('index');

    if (patternIndex) {
        const patternRef = ref(db, `patterns/${patternIndex}`);
        
        get(patternRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const pattern = snapshot.val();
                    renderPattern(pattern);
                } else {
                    displayError('Pattern not found.');
                }
            })
            .catch(error => {
                displayError('Failed to load pattern data: ' + error.message);
            });
    } else {
        displayError('No pattern specified.');
    }
});

function renderPattern(pattern) {
    document.getElementById('pattern-title').textContent = `${pattern.name} | Crochet Corner`;
    document.getElementById('pattern-name').textContent = pattern.name;

    const imagesSection = document.getElementById('images-section');
    const galleryTitle = document.createElement('h3');
    galleryTitle.textContent = 'Gallery';
    imagesSection.appendChild(galleryTitle);

    const galleryGrid = document.createElement('div');
    galleryGrid.classList.add('gallery-grid');

    pattern.images.forEach(image => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.classList.add('responsive-image');
        figure.appendChild(img);

        if (image.caption) {
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = image.caption;
            figure.appendChild(figcaption);
        }

        galleryGrid.appendChild(figure);
    });

    imagesSection.appendChild(galleryGrid);

    const detailsSection = document.getElementById('details-section');
    const detailsTitle = document.createElement('h3');
    detailsTitle.textContent = 'Pattern Details';
    detailsSection.appendChild(detailsTitle);

    const detailsList = document.createElement('ul');
    pattern.details.forEach(detail => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${detail.title}:</strong> ${detail.content}`;
        detailsList.appendChild(li);
    });
    detailsSection.appendChild(detailsList);

    const instructionsSection = document.getElementById('instructions-section');
    const instructionsTitle = document.createElement('h3');
    instructionsTitle.textContent = 'Instructions';
    instructionsSection.appendChild(instructionsTitle);

    pattern.instructionsSections.forEach(section => {
        const sectionTitle = document.createElement('h4');
        sectionTitle.textContent = section.title;
        instructionsSection.appendChild(sectionTitle);

        const stepsListTag = section.isOrdered ? 'ol' : 'ul';
        const stepsList = document.createElement(stepsListTag);

        section.steps.forEach(step => {
            const li = document.createElement('li');
            li.innerHTML = step;
            stepsList.appendChild(li);
        });
        instructionsSection.appendChild(stepsList);
    });
}

function displayError(message) {
    document.body.innerHTML = '';
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    document.body.appendChild(errorMessage);
}