// Mobile menu toggle + nav \"Kirish\" button + auth modal
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLoginBtn = document.getElementById('nav-login-btn');
    const authModalOverlay = document.getElementById('auth-modal');
    const authModal = authModalOverlay ? authModalOverlay.querySelector('.auth-modal') : null;
    const closeModalBtn = authModalOverlay ? authModalOverlay.querySelector('.auth-modal-close') : null;
    const loginForm = document.getElementById('modal-login-form');
    const signupForm = document.getElementById('modal-signup-form');
    const showSignupBtn = document.getElementById('show-signup-btn');
    const showLoginBtn = document.getElementById('show-login-btn');

    function openAuthModal() {
        if (!authModalOverlay) return;
        authModalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        // default holat: login
        if (loginForm && signupForm) {
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        }
    }

    function closeAuthModal() {
        if (!authModalOverlay) return;
        authModalOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // \"Kirish\" tugmasi bosilganda modalni ochish
    if (navLoginBtn) {
        navLoginBtn.addEventListener('click', function () {
            openAuthModal();

            // Agar mobil menyu ochiq bo'lsa, yopib qo'yamiz
            if (menuToggle && navMenu) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Modalni yopish tugmasi
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeAuthModal);
    }

    // Overlayning bo'sh joyiga bosilganda yopish
    if (authModalOverlay && authModal) {
        authModalOverlay.addEventListener('click', function(e) {
            if (!authModal.contains(e.target)) {
                closeAuthModal();
            }
        });
    }

    // Klaviaturadan Esc bosilganda yopish
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAuthModal();
        }
    });

    // Login <-> Signup o'zgarishi
    if (showSignupBtn && loginForm && signupForm) {
        showSignupBtn.addEventListener('click', function () {
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
        });
    }

    if (showLoginBtn && loginForm && signupForm) {
        showLoginBtn.addEventListener('click', function () {
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
        });
    }
});

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
            
            // Close mobile menu after clicking
            const menuToggle = document.querySelector('.menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            if (menuToggle && navMenu) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 14, 39, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1a1f3a 0%, #0f1419 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .course-card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add parallax effect and blur to hero section on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const isMobile = window.innerWidth <= 768;
    
    if (hero) {
        // Parallax effect (only on desktop for better performance)
        if (!isMobile) {
            hero.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        
        // Blur effect based on scroll position
        const blurAmount = Math.min(scrolled / 20, 10); // Max 10px blur
        hero.style.filter = `blur(${blurAmount}px)`;
        hero.style.opacity = Math.max(1 - scrolled / 500, 0.2); // Fade out gradually
    }
});
