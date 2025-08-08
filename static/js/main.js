// Main JavaScript file for website functionality


// Dark mode functionality
class DarkModeToggle {
    constructor() {
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.darkModeIcon = document.getElementById('darkModeIcon');
        this.currentTheme = localStorage.getItem('theme');
        
        this.init();
    }
    
    init() {
        // Set initial theme
        if (this.currentTheme) {
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            this.updateIcon();
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            this.updateIcon();
        }
        
        // Add event listener
        this.darkModeToggle?.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
                this.updateIcon();
            }
        });
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateIcon();
        
        // Add a nice transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    updateIcon() {
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            this.darkModeIcon.className = 'fas fa-sun';
            this.darkModeToggle.title = 'Switch to light mode';
        } else {
            this.darkModeIcon.className = 'fas fa-moon';
            this.darkModeToggle.title = 'Switch to dark mode';
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    new DarkModeToggle();
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to current nav item
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.nav-link');
    
    menuItems.forEach(item => {
        if(item.getAttribute('href') === currentLocation){
            item.classList.add('active');
        }
    });

    // Copy code to clipboard functionality
    document.querySelectorAll('.code-preview').forEach(codeBlock => {
        const copyButton = document.createElement('button');
        copyButton.className = 'btn btn-sm btn-outline-light position-absolute top-0 end-0 m-2';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.style.fontSize = '0.8rem';
        
        codeBlock.style.position = 'relative';
        codeBlock.appendChild(copyButton);
        
        copyButton.addEventListener('click', () => {
            const code = codeBlock.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
    });

    // Simple animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards for animation
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Function to filter publications by type
function filterPublications(type) {
    const publications = document.querySelectorAll('.publication-item');
    
    publications.forEach(pub => {
        if (type === 'all' || pub.dataset.type === type) {
            pub.style.display = 'block';
        } else {
            pub.style.display = 'none';
        }
    });
}

// Function to toggle research interests
function toggleResearchDetails(element) {
    const details = element.nextElementSibling;
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        element.querySelector('i').classList.replace('fa-plus', 'fa-minus');
    } else {
        details.style.display = 'none';
        element.querySelector('i').classList.replace('fa-minus', 'fa-plus');
    }
}