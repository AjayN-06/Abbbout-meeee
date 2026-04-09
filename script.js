// Smooth scrolling for navigation links
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

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Profile photo loading (replace with your base64 encoded image)
window.addEventListener('load', () => {
    // Uncomment and replace with your actual base64 encoded image
    // const profileImg = document.getElementById('profileImg');
    // profileImg.src = 'data:image/jpeg;base64,YOUR_BASE64_IMAGE_HERE';
});

// Optional: Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe education, achievement, and skill items
document.querySelectorAll('.education-item, .achievement-item, .skill-category, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-link.active {
        color: var(--accent);
        font-weight: 600;
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (if needed in future)
function handleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const logo = document.querySelector('.logo');

    if (window.innerWidth <= 768) {
        // Mobile layout adjustments
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '60px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.backgroundColor = 'var(--bg)';
        navMenu.style.padding = '2rem';
        navMenu.style.borderBottom = '1px solid var(--border)';
        navMenu.style.display = 'none';
    }
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Highlight active section on scroll with debounce
window.addEventListener('scroll', debounce(() => {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 50));

// Prevent default form submission if needed
document.addEventListener('submit', (e) => {
    if (e.target.id === 'contactForm') {
        e.preventDefault();
        // Handle form submission here if contact form is added
    }
});