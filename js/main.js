// ===================================
// Savori Masterclass - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initAccordion();
    initFAQ();
    initSignupForm();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const nav = document.querySelector('.nav');
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Accordion for Program
function initAccordion() {
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            items.forEach(i => i.classList.remove('active'));

            // Open clicked (if wasn't active)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');

    items.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            items.forEach(i => i.classList.remove('active'));

            // Open clicked (if wasn't active)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Signup Form
function initSignupForm() {
    const form = document.getElementById('signup-form');
    const successMessage = document.getElementById('success-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = form.querySelector('input[type="email"]').value;

            if (!email || !isValidEmail(email)) {
                showError('Podaj poprawny adres email.');
                return;
            }

            // Save
            saveSignup({ email, timestamp: new Date().toISOString() });

            // Show success
            form.parentElement.style.display = 'none';
            successMessage.classList.remove('hidden');
        });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(message) {
    const existing = document.querySelector('.form-error');
    if (existing) existing.remove();

    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;

    const form = document.getElementById('signup-form');
    form.insertBefore(error, form.firstChild);

    setTimeout(() => error.remove(), 4000);
}

function saveSignup(data) {
    const signups = JSON.parse(localStorage.getItem('savori-signups') || '[]');
    signups.push(data);
    localStorage.setItem('savori-signups', JSON.stringify(signups));
    console.log('Signup saved:', data);
}
