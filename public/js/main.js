// public/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Check if the hamburger and navMenu exist before adding event listeners
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Toggle 'active' class on hamburger and nav menu
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // --- Active Nav Link Highlighter ---
    // Get the current page path
    const currentPage = window.location.pathname.split('/').pop();

    // Find all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        
        // Remove active class from all links first
        link.classList.remove('active');

        // Add active class if the link's href matches the current page
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    console.log("SLANGE website scripts loaded successfully.");
});
