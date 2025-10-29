document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const navItems = sidebar.querySelectorAll('li');
    const contentSections = document.querySelectorAll('.entity-section');
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    const searchInput = document.getElementById('dashboard-search');
    const searchButton = document.getElementById('search-btn');
    const searchResultsDiv = document.getElementById('search-results');
    const body = document.body;

    // --- 1. Dark Mode Functionality ---
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

    // Check saved theme preference on load
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    } else {
        body.classList.add('light-mode');
        darkModeSwitch.checked = false;
    }

    // --- 2. Messenger-Style Menu Toggle (Mobile) ---
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    // --- 3. Navigation/Section Switching (Entities) ---
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // 3a. Update Active Class
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // 3b. Show Target Section
            const targetId = this.getAttribute('data-entity');
            
            contentSections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });

            // 3c. Close mobile menu after click
            if (window.innerWidth <= 900) {
                sidebar.classList.remove('open');
            }
        });
    });

    // --- 4. Search Functionality (Mock Data based on ERD) ---
    const mockData = [
        { type: "STUDENT", name: "Juan Dela Cruz", detail: "ID: S001, Program: BSIT" },
        { type: "PROGRAM", name: "Bachelor of Science in Information Technology", detail: "Duration: 4 Years" },
        { type: "COURSE", name: "Web Development (C301)", detail: "Credits: 3" },
        { type: "INSTRUCTOR", name: "Dr. Dela Rosa", detail: "Department: IT" },
        { type: "CLASSROOM", name: "C-201", detail: "Building: Centennial, Floor: 2" },
        { type: "ENROLLMENT", name: "2024-2025, First Semester", detail: "Course: C301" },
    ];

    const performSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        searchResultsDiv.innerHTML = '<h3>Search Results</h3>';

        if (query.length < 3) {
            searchResultsDiv.innerHTML += '<div class="result-item">Please enter at least 3 characters to search.</div>';
            searchResultsDiv.classList.remove('hidden');
            return;
        }

        const results = mockData.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.detail.toLowerCase().includes(query) || 
            item.type.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            results.forEach(result => {
                searchResultsDiv.innerHTML += `
                    <div class="result-item">
                        <strong>[${result.type}]</strong> ${result.name} - ${result.detail}
                    </div>`;
            });
            searchResultsDiv.classList.remove('hidden');
        } else {
            searchResultsDiv.innerHTML += `<div class="result-item">No results found for "${query}".</div>`;
            searchResultsDiv.classList.remove('hidden');
        }
        
        // Ensure Dashboard is visible when searching
        document.getElementById('dashboard').classList.remove('hidden');
        // Deactivate all navigation links except Dashboard
        navItems.forEach(nav => nav.classList.remove('active'));
        document.querySelector('[data-entity="dashboard"]').classList.add('active');
        contentSections.forEach(section => {
            if (section.id !== 'dashboard') {
                section.classList.add('hidden');
            }
        });
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Auto-hide search results when query is cleared
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            searchResultsDiv.classList.add('hidden');
        }
    });

    // --- 5. Logout Redirect ---
    document.getElementById('logout-btn').addEventListener('click', function() {
        alert('Logging out...');
        window.location.href = 'login.html';
    });
});

