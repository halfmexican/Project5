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
    displayError('Failed to load patterns: ' + error.message);
  });

// Function to render the pattern gallery
function renderPatternGallery(patterns) {
  const gallery = document.getElementById('pattern-gallery');
  gallery.innerHTML = ''; // Clear any existing content

  patterns.forEach(pattern => {
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
    link.href = `pattern.html?name=${encodeURIComponent(pattern.name)}`;
    link.classList.add('button');
    link.textContent = 'View Pattern';
    article.appendChild(link);

    // Append the article to the gallery
    gallery.appendChild(article);
  });
}

// Function to display an error message
function displayError(message) {
  const gallery = document.getElementById('pattern-gallery');
  gallery.innerHTML = `<p>${message}</p>`;
}
