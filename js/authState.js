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
