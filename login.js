document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.querySelector('.auth-container');
    const darkModeSwitch = document.getElementById('dark-mode-switch-auth');
    const registerForm = document.getElementById('register-form');
    const verifyEmailDisplay = document.getElementById('verify-email-display');

    // --- 1. View Switching Logic ---
    function showView(viewId) {
        // Itago lahat ng views
        document.querySelectorAll('.auth-view').forEach(view => {
            view.classList.add('hidden');
            view.classList.remove('active');
        });
        
        // Ipakita ang napiling view
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.remove('hidden');
            targetView.classList.add('active');
        }
    }

    // Listener para sa mga navigation links (data-view)
    authContainer.addEventListener('click', (e) => {
        if (e.target.matches('[data-view]')) {
            e.preventDefault();
            const targetViewId = e.target.getAttribute('data-view') + '-view';
            showView(targetViewId);
        }
    });

    // --- 2. Dark Mode Toggle ---
    darkModeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });

    // --- 3. Registration Success Logic (Para Lumabas ang Verification) ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Dito mo ilalagay ang actual registration logic (AJAX/Fetch API)
        
        // For demonstration: Assume registration is successful
        const registeredEmail = document.getElementById('reg-email').value;

        // **Ito ang mahalagang part:** Ipakita ang Verification View
        verifyEmailDisplay.textContent = registeredEmail; // Ipakita ang email
        showView('verify-view'); // Lumabas ang Verification View
        
        // Optional: I-reset ang register form fields
        registerForm.reset(); 
    });

    // --- 4. Iba pang Form Submissions (Login, Forgot, Verify) ---
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login attempt initiated...');
        // Add actual login logic here
    });

    document.getElementById('forgot-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Password reset link sent...');
        // Add actual forgot password logic here
    });

    document.getElementById('verify-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Verification code submitted...');
        // Add actual verification logic here
    });
    
});
