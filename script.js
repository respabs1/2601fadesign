// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .step-card, .goal-card, .creation-card, .creator-card, .goal-content, .steps-container, .creation-grid, .creators-grid').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== ADD ANIMATION KEYFRAMES =====
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(style);

// ===== COUNTER ANIMATION =====
// This function animates numbers counting up (optional feature)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== KEYBOARD SHORTCUT NAVIGATION =====
// You can navigate to sections using keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 1 for Goal, 2 for How to Use, 3 for Creation, etc.
    const shortcuts = {
        '1': '#goal',
        '2': '#how-to-use',
        '3': '#creation',
        '4': '#prototype',
        '5': '#creators'
    };

    if (shortcuts[e.key]) {
        const element = document.querySelector(shortcuts[e.key]);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

// ===== LAZY LOADING FOR IMAGES =====
// When you add real screenshot images, you can use this for lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

highlightActiveSection();

// ===== FORM VALIDATION (FOR FUTURE SIGN-UP) =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateSignupForm(formData) {
    const errors = [];

    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!formData.password || formData.password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (formData.password !== formData.confirmPassword) {
        errors.push('Passwords do not match');
    }

    return errors;
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.className = 'scroll-to-top';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    display: none;
    z-index: 999;
    opacity: 0;
    transition: opacity 0.3s ease;
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.style.display = 'block';
        setTimeout(() => scrollTopButton.style.opacity = '1', 10);
    } else {
        scrollTopButton.style.opacity = '0';
        setTimeout(() => scrollTopButton.style.display = 'none', 300);
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== STATS COUNTER (OPTIONAL: Update with your own stats) =====
// Use this if you want to add statistics to your hero or other sections
const stats = {
    studentsLearning: 5000,
    problemsSolved: 50000,
    hoursSpent: 100000,
    successRate: 95
};

// You can display these stats by calling them in your HTML if you add a stats section

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%cWelcome to MathOlympiad! 🧮', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cCreated by Yertore and Zh. Ilyas from Astana BIL', 'color: #764ba2; font-size: 14px;');
console.log('%cLet\'s make math learning fun and productive!', 'color: #666; font-size: 12px;');

// ===== FEATURE: DARK MODE TOGGLE (OPTIONAL) =====
// Uncomment to add dark mode functionality
/*
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
*/

// ===== PERFORMANCE MONITORING =====
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}
