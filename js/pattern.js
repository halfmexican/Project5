document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const patternName = urlParams.get('name');

    if (patternName) {
        fetch('data/patterns.json')
            .then(response => response.json())
            .then(data => {
                const pattern = data.patterns.find(p => p.name === patternName);
                if (pattern) {
                    renderPattern(pattern);
                } else {
                    displayError('Pattern not found.');
                }
            })
            .catch(error => {
                console.error('Failed to load pattern:', error);
                displayError('Failed to load pattern data.');
            });
    } else {
        displayError('No pattern');
    }

    // Function to render the pattern details
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

        // Populate Details Section
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

        // Populate Instructions Section
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
});
