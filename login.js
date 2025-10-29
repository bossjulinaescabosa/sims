document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.querySelector('.auth-container');
    const darkModeSwitch = document.getElementById('dark-mode-switch-auth');
    const registerForm = document.getElementById('register-form');
    const verifyEmailDisplay = document.getElementById('verify-email-display');
    const body = document.body;

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

    // Listener para sa mga navigation links (data-view="[login|register|forgot]")
    authContainer.addEventListener('click', (e) => {
        if (e.target.matches('[data-view]')) {
            e.preventDefault();
            const targetViewId = e.target.getAttribute('data-view') + '-view';
            showView(targetViewId);
        }
    });

    // --- 2. Dark Mode Toggle ---
    darkModeSwitch.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode'); 
    });

    // --- 3. Registration Success Flow ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // ** SIMULATED REGISTRATION SUCCESS **
        // Dito mo ilalagay ang actual code para sa server registration (e.g., Fetch API).
        
        // Kunin ang email na ginamit
        const registeredEmail = document.getElementById('reg-email').value;

        // Ipakita ang Verification View
        verifyEmailDisplay.textContent = registeredEmail; // Ipakita ang email sa instruction
        showView('verify-view'); // I-display ang Verification Form
        
        // I-reset ang register form fields
        registerForm.reset(); 
    });

    // --- 4. Iba pang Form Submissions (Para lang may action) ---
    document.getElementById('login-form').addEventListener('submit', (e) => { e.preventDefault(); console.log('Login Submitted'); alert('Login submitted!'); });
    document.getElementById('forgot-form').addEventListener('submit', (e) => { e.preventDefault(); console.log('Forgot Submitted'); alert('Reset link sent!'); });
    document.getElementById('verify-form').addEventListener('submit', (e) => { e.preventDefault(); console.log('Verification Submitted'); alert('Account Verified!'); });
    
});
