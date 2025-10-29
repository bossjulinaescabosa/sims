document.addEventListener('DOMContentLoaded', function() {
    const authViews = document.querySelectorAll('.auth-view');
    const authHeader = document.getElementById('auth-header');
    const pageTitle = document.getElementById('page-title');
    const links = document.querySelectorAll('.auth-links a');
    const darkModeSwitch = document.getElementById('dark-mode-switch-auth');
    const body = document.body;
    const verifyEmailDisplay = document.getElementById('verify-email-display');

    // Tiyakin na walang "isLoggedIn" status na naiwan sa sessionStorage kapag nasa login page
    sessionStorage.removeItem('isLoggedIn');
    
    // MOCK DATA storage for Verification (real code = '123456')
    let mockVerificationEmail = '';

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
            } else if (targetViewId === 'verify') {
                headerText = 'Account Verification';
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

    // --- 1. Login Submission (MOCK) ---
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // MOCK LOGIN
        alert('Login Successful! Redirecting to Dashboard...');
        sessionStorage.setItem('isLoggedIn', 'true'); 
        window.location.href = 'dashboard.html'; 
    });

    // --- 2. Registration Submission (NEW FLOW) ---
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('reg-email').value;
        
        // Save the email for the verification screen
        mockVerificationEmail = email;
        verifyEmailDisplay.textContent = email;

        alert(`✅ SUCCESS! Account created. 
            \n\nA 6-digit verification code has been sent to ${email}. 
            \n\n(MOCK CODE: 123456)`);
        
        // Redirect to the new verification view
        switchView('verify');
    });

    // --- 3. Verification Submission (MOCK) ---
    document.getElementById('verify-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const enteredCode = document.getElementById('verify-code').value.trim();
        
        if (enteredCode === '123456') { // Mock verification code
            alert('🎉 Verification Successful! Your account is now active. Please log in.');
            // Clear mock data and go to login
            mockVerificationEmail = '';
            switchView('login');
        } else {
            alert('❌ Error: Invalid verification code. Please try again.');
        }
    });
    
    // --- 4. Resend Code Link (MOCK) ---
    document.getElementById('resend-code-link').addEventListener('click', function(e) {
        e.preventDefault();
        if (mockVerificationEmail) {
            alert(`New code sent to ${mockVerificationEmail}. (MOCK CODE: 123456)`);
        } else {
            alert('Please register first.');
            switchView('register');
        }
    });

    document.getElementById('forgot-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // MOCK RESET
        alert('Password reset link sent to your email! Check your inbox.');
        switchView('login');
    });

    // Initialize to login view
    switchView('login');
});
