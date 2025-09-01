// Area A Login JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');

    // Auto-fill demonstration for FormFiller plugin testing
    setTimeout(() => {
        // Simulate learning behavior - auto-fill after a short delay
        if (Math.random() > 0.7) { // 30% chance to demonstrate auto-fill
            usernameField.value = 'testuser';
            usernameField.dispatchEvent(new Event('input'));
        }
    }, 2000);

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameField.value;
        const password = passwordField.value;
        
        // Simple validation
        if (username && password) {
            // Store user info for dashboard
            localStorage.setItem('jira_username', username);
            localStorage.setItem('jira_login_time', new Date().toISOString());
            
            // Simulate loading
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Signing in...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            alert('Please enter both username and password');
        }
    });

    // Add random class names to test CSS selector robustness
    function addRandomClasses() {
        const elements = [usernameField, passwordField];
        elements.forEach(el => {
            const randomClass = 'dynamic-' + Math.random().toString(36).substr(2, 6);
            el.classList.add(randomClass);
        });
    }
    
    addRandomClasses();
});