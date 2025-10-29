document.addEventListener('DOMContentLoaded', function() {
    const authViews = document.querySelectorAll('.auth-view');
    const authHeader = document.getElementById('auth-header');
    const pageTitle = document.getElementById('page-title');
    const links = document.querySelectorAll('.auth-links a');
    const darkModeSwitch = document.getElementById('dark-mode-switch-auth');
    const body = document.body;

    // --- Theme Persistence ---
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    } else {
        body.classList.add('light-mode');
        darkModeSwitch.checked = false;
    }

    darkModeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // --- View Switching Function ---
    function switchView(targetViewId) {
        authViews.forEach(view => {
            view.classList.add('hidden');
            view.classList.remove('active');
        });

        const targetView = document.getElementById(targetViewId + '-view');
        if (targetView) {
            targetView.classList.remove('hidden');
            targetView.classList.add('active');
            
            // Update Header and Title
            let headerText = '';
            if (targetViewId === 'login') {
                headerText = 'Portal Login';
            } else if (targetViewId === 'register') {
                headerText = 'Create New Account';
            } else if (targetViewId === 'forgot') {
                headerText = 'Forgot Password';
            }
            authHeader.textContent = headerText;
            pageTitle.textContent = `${headerText} - Student Portal`;
        }
    }

    // Attach click listeners to links
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.dataset.view;
            if (target) {
                switchView(target);
            }
        });
    });

    // --- Form Submission Logic (MOCK) ---
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // MOCK LOGIN: In a real app, authentication happens here.
        alert('Login Successful! Redirecting to Dashboard...');
        window.location.href = 'dashboard.html'; 
    });

    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('reg-email').value;
        const code = document.getElementById('reg-code').value;
        
        if (code.length < 4) {
             alert('Error: Please enter the valid confirmation code sent to ' + email + '. (Mock Code: 1234)');
             return;
        }
        // MOCK REGISTER: Account created and confirmed.
        alert('Account created and confirmed! Redirecting to Login...');
        switchView('login');
    });

    document.getElementById('forgot-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // MOCK RESET: Email sent.
        alert('Password reset link sent to your email! Check your inbox.');
        switchView('login');
    });

    // Initialize to login view
    switchView('login');
});

