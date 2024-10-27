function updateAuthButton() {
    const authLink = document.getElementById('authLink');
    const logoutLink = document.getElementById('logoutLink');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        authLink.classList.add('hidden');
        logoutLink.classList.remove('hidden');
    } else {
        authLink.classList.remove('hidden');
        logoutLink.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', updateAuthButton);

document.getElementById('logoutLink').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', 'false');
    updateAuthButton(); 
    window.location.href = 'index.html';
});
