document.addEventListener('DOMContentLoaded', function() {
    
    // --- 0. MOCK SESSION CHECK & REDIRECT (Security Layer) ---
    const mockLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (mockLoggedIn !== 'true') {
        // Redirect to login page if not logged in
        window.location.href = 'login.html';
        return; // Stop executing dashboard script if no session
    }

    // Tiyakin na ang sessionStorage ay nalilinis sa logout para hindi ito mag-persist
    // at hindi ma-access ang dashboard sa susunod na refresh.

    const sidebar = document.getElementById('sidebar');
    const navItems = sidebar.querySelectorAll('li');
    const contentSections = document.querySelectorAll('.entity-section');
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    const body = document.body;
    
    // Global Search elements
    const searchInputGlobal = document.getElementById('dashboard-search');
    const searchButtonGlobal = document.getElementById('search-btn');
    const searchResultsDiv = document.getElementById('search-results');

    // Modal elements
    const modal = document.getElementById('entity-form-modal');
    const modalTitle = document.getElementById('modal-title');
    const closeBtn = document.querySelector('.close-btn');
    const allForms = document.querySelectorAll('.modal-content .entity-form');

    // --- 1. Dark Mode Functionality ---
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

    // --- 2. Navigation/Section Switching ---
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.getAttribute('data-entity');
            contentSections.forEach(section => {
                section.classList.toggle('hidden', section.id !== targetId);
            });
            
            // Scroll to the top of the main content on section switch (especially for mobile)
            document.getElementById('content').scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // --- 3. Modal & Form Handling (Add/Edit) ---
    document.querySelectorAll('.new-record-btn, .edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const formId = this.dataset.formId;
            const isEdit = this.classList.contains('edit-btn');
            
            allForms.forEach(form => form.classList.add('hidden'));

            const targetForm = document.getElementById(formId);
            if (targetForm) {
                targetForm.classList.remove('hidden');
                targetForm.reset(); 

                let entityName = targetForm.id.replace('-form', '').replace('_', ' ').toUpperCase();
                
                if (isEdit) {
                    modalTitle.textContent = `EDIT Existing ${entityName} (ID: ${this.dataset.id})`;
                    alert(`MOCK: Loading data for ${this.dataset.id}. Please fill the form to simulate data.`);
                } else {
                    modalTitle.textContent = `ADD NEW ${entityName} Record`;
                }

                modal.style.display = 'block';
            }
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Mock Form Submission - With Confirmation Message
    allForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formId = this.id;
            const entityName = formId.replace('-form', '').replace('_', ' ').toUpperCase();
            
            const isEditing = modalTitle.textContent.includes('EDIT');
            const actionType = isEditing ? "UPDATED" : "ADDED";

            alert(`✅ SUCCESS! New/Updated data for ${entityName} has been ${actionType} and is ready to be stored.`);
            
            modal.style.display = 'none'; 
        });
    });

    // --- 4. TABLE SEARCH FUNCTIONALITY (Filtering per Entity) ---
    function performTableSearch(input) {
        const filter = input.value.toUpperCase();
        const tableId = input.dataset.tableId;
        const table = document.getElementById(tableId);
        if (!table) return;

        const rows = table.getElementsByTagName('tr');
        
        for (let i = 1; i < rows.length; i++) { 
            if (!rows[i].querySelector('.no-data-row')) {
                 let rowText = rows[i].textContent.toUpperCase();
                 rows[i].style.display = (rowText.indexOf(filter) > -1) ? "" : "none";
            } else {
                 rows[i].style.display = (filter.length === 0) ? "" : "none";
            }
        }
    }

    document.querySelectorAll('.table-search-box .blue-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            performTableSearch(this.previousElementSibling);
        });
    });

    document.querySelectorAll('.table-search-input').forEach(input => {
        input.addEventListener('keyup', function(e) {
            performTableSearch(this); 
        });
    });

    // --- 5. GLOBAL DASHBOARD SEARCH (MOCK - No Data) ---
    const performGlobalSearch = () => {
        const query = searchInputGlobal.value.toLowerCase().trim();
        searchResultsDiv.innerHTML = '<h3>Global Search Results</h3>';

        if (query.length < 3) {
            searchResultsDiv.innerHTML += '<div class="result-item">Please enter at least 3 characters to search.</div>';
            searchResultsDiv.classList.remove('hidden');
            return;
        }

        searchResultsDiv.innerHTML += `<div class="result-item">No records found for "${query}" in the database yet. Tables are currently empty.</div>`;
        searchResultsDiv.classList.remove('hidden');
    };

    searchButtonGlobal.addEventListener('click', performGlobalSearch);
    searchInputGlobal.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performGlobalSearch();
        }
    });
    searchInputGlobal.addEventListener('input', function() {
        if (this.value.trim() === '') {
            searchResultsDiv.classList.add('hidden');
        }
    });

    // --- 6. Logout Redirect ---
    document.getElementById('logout-btn').addEventListener('click', function() {
        alert('Logging out...');
        // Tiyakin na tinatanggal ang session flag sa logout
        sessionStorage.removeItem('isLoggedIn'); 
        window.location.href = 'login.html';
    });
});
