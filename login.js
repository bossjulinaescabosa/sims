document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.querySelector('.auth-container');
    const darkModeSwitch = document.getElementById('dark-mode-switch-auth');
    const registerForm = document.getElementById('register-form');
    const verifyEmailDisplay = document.getElementById('verify-email-display');
    const body = document.body;

    // --- 1. View Switching Logic (Functionality for changing forms) ---
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

    // Listener para sa mga navigation links (Forgot, Register, Login)
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

    // --- 3. Registration Success Flow (Logic para lumabas ang Verification View) ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // ** SIMULATED SUCCESS ** - Dito magaganap ang actual server communication
        
        // Kunin ang email na ginamit
        const registeredEmail = document.getElementById('reg-email').value;

        // Ipakita ang Verification View
        verifyEmailDisplay.textContent = registeredEmail; 
        showView('verify-view'); // Ang nagpapagana para lumabas ang verification
        
        // I-reset ang register form fields
        registerForm.reset(); 
    });

    // --- 4. Iba pang Form Submissions (Demo purposes) ---
    document.getElementById('
