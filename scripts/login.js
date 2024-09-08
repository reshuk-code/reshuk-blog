const form = document.getElementById('login-form');
        
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Mock login/signup process
    if (username && password) {
        localStorage.setItem('logged-in', 'true');
        localStorage.setItem('username', username);

        // Redirect back to the post page
        window.location.href = 'admin.html';
    } else {
        alert('Please enter a valid username and password');
    }
});