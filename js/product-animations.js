/* ═══════════════════════════════════════════════════════════════
   APPLE-STYLE PRODUCT PAGE ANIMATIONS
   Scroll-triggered animations, parallax, and interactions
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavScroll();
    initDimensionLines();
    initParallax();
});

/* ═══════════════════════════════════════════════════════════════
   SCROLL-TRIGGERED ANIMATIONS (Intersection Observer)
   ═══════════════════════════════════════════════════════════════ */

function initScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // Step items with staggered animation
    const stepItems = document.querySelectorAll('.step-item');
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered delay based on index
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });

    stepItems.forEach(el => stepObserver.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION SCROLL EFFECT
   ═══════════════════════════════════════════════════════════════ */

function initNavScroll() {
    const nav = document.querySelector('.product-nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════════
   DIMENSION LINES ANIMATION
   ═══════════════════════════════════════════════════════════════ */

function initDimensionLines() {
    const dimensionLines = document.querySelectorAll('.dimension-line');
    const dimensionTexts = document.querySelectorAll('.dimension-text');

    if (!dimensionLines.length) return;

    const dimensionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate all dimension lines sequentially
                dimensionLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('animate');
                    }, index * 300);
                });

                // Animate dimension texts after lines
                dimensionTexts.forEach((text, index) => {
                    setTimeout(() => {
                        text.classList.add('animate');
                    }, (dimensionLines.length * 300) + (index * 200));
                });

                dimensionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const dimensionSection = document.querySelector('.dimensions-section');
    if (dimensionSection) {
        dimensionObserver.observe(dimensionSection);
    }
}

/* ═══════════════════════════════════════════════════════════════
   PARALLAX EFFECTS
   ═══════════════════════════════════════════════════════════════ */

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (!parallaxElements.length) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const offset = scrollY * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════════
   EXPLODED VIEW ASSEMBLY ANIMATION
   ═══════════════════════════════════════════════════════════════ */

function initExplodedView() {
    const explodedView = document.querySelector('.exploded-view');
    if (!explodedView) return;

    const solutionSection = document.querySelector('.solution-section');

    const explodedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Calculate how far into the section we've scrolled
                const rect = entry.target.getBoundingClientRect();
                const progress = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));

                if (progress > 0.6) {
                    explodedView.classList.add('assembled');
                } else {
                    explodedView.classList.remove('assembled');
                }
            }
        });
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

    if (solutionSection) {
        explodedObserver.observe(solutionSection);
    }
}

/* ═══════════════════════════════════════════════════════════════
   BEFORE/AFTER SLIDER (Optional interactive feature)
   ═══════════════════════════════════════════════════════════════ */

function initComparisonSlider() {
    const slider = document.querySelector('.comparison-slider');
    if (!slider) return;

    const handle = slider.querySelector('.slider-handle');
    const beforeSide = slider.querySelector('.comparison-before');

    let isDragging = false;

    const updatePosition = (x) => {
        const rect = slider.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
        beforeSide.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
    };

    handle.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('mousemove', (e) => {
        if (isDragging) updatePosition(e.clientX);
    });

    // Touch support
    handle.addEventListener('touchstart', () => isDragging = true);
    document.addEventListener('touchend', () => isDragging = false);
    document.addEventListener('touchmove', (e) => {
        if (isDragging) updatePosition(e.touches[0].clientX);
    });
}

/* ═══════════════════════════════════════════════════════════════
   SMOOTH SCROLL TO SECTION
   ═══════════════════════════════════════════════════════════════ */

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS INDICATOR (Optional)
   ═══════════════════════════════════════════════════════════════ */

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════════
   3D TILT EFFECT ON MOUSE MOVE (Optional)
   ═══════════════════════════════════════════════════════════════ */

function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width - 0.5) * 2;
            const yPercent = (y / rect.height - 0.5) * 2;

            const rotateX = yPercent * -10;
            const rotateY = xPercent * 10;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

/* ═══════════════════════════════════════════════════════════════
   INITIALIZATION CHECK
   ═══════════════════════════════════════════════════════════════ */

// Check if this is a product page before initializing
if (document.querySelector('.product-page')) {
    console.log('Product page animations initialized');
}
