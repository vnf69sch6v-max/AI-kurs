/* ===================================
   DAG Furniture Hardware - JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initMobileMenu();
    initSmoothScroll();
    initCounterAnimation();
    initScrollReveal();
    initContactForm();
});

// Sticky Header
function initStickyHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Mobile Menu
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');

            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 10);
        } else {
            counter.innerText = target;
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Scroll Reveal
function initScrollReveal() {
    const reveals = document.querySelectorAll('.timeline-item, .trust-item, .audience-card, .product-showcase, .product-custom');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    const modal = document.getElementById('success-modal');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            const name = form.querySelector('#name');
            const email = form.querySelector('#email');
            const message = form.querySelector('#message');
            const rodo = form.querySelector('#rodo');

            let isValid = true;

            // Clear previous errors
            form.querySelectorAll('.error').forEach(el => el.remove());
            form.querySelectorAll('.form-group').forEach(el => el.classList.remove('has-error'));

            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Podaj imię i nazwę firmy');
                isValid = false;
            }

            // Validate email
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Podaj poprawny adres email');
                isValid = false;
            }

            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Wpisz wiadomość');
                isValid = false;
            }

            // Validate RODO
            if (!rodo.checked) {
                showError(rodo, 'Zaakceptuj zgodę RODO');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('.btn-submit');
                submitBtn.textContent = 'Wysyłanie...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = 'Wyślij zapytanie';
                    submitBtn.disabled = false;

                    // Show success modal
                    if (modal) {
                        modal.classList.add('active');
                    }
                }, 1500);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });

            input.addEventListener('input', () => {
                const group = input.closest('.form-group') || input.closest('.checkbox-group');
                if (group) {
                    group.classList.remove('has-error');
                    const error = group.querySelector('.error');
                    if (error) error.remove();
                }
            });
        });
    }
}

function validateField(input) {
    const name = input.getAttribute('name');
    const value = input.value.trim();

    switch (name) {
        case 'email':
            if (!isValidEmail(value)) {
                showError(input, 'Podaj poprawny adres email');
            }
            break;
        case 'name':
            if (!value) {
                showError(input, 'To pole jest wymagane');
            }
            break;
        case 'message':
            if (!value) {
                showError(input, 'To pole jest wymagane');
            }
            break;
    }
}

function showError(input, message) {
    const group = input.closest('.form-group') || input.closest('.checkbox-group');
    if (group) {
        group.classList.add('has-error');

        const existingError = group.querySelector('.error');
        if (!existingError) {
            const error = document.createElement('span');
            error.className = 'error';
            error.textContent = message;
            error.style.cssText = 'color: #D32F2F; font-size: 13px; margin-top: 4px;';
            group.appendChild(error);
        }
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Product Modal Functions
function openProductModal(productId) {
    const modal = document.getElementById(`${productId}-modal`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeProductModal() {
    const modals = document.querySelectorAll('.product-modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// ESC key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
        closeModal();
    }
});

// Make functions global for onclick
window.closeModal = closeModal;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
