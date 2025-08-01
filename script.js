/*
  HESYCHIA LAW PLLC - SCRIPT
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- ENHANCED CUSTOM CURSOR ---
    const cursor = document.getElementById('cursor');
    // Only run cursor logic on non-touch devices
    if (cursor && window.matchMedia("(hover: hover)").matches) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor animation
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor hover effect
        const hoverElements = document.querySelectorAll('a, button, .menu-trigger, .service-card, .achievement, .quote, .engagement');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }


    // --- NAVIGATION SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- ACCESSIBLE MENU TOGGLE ---
    const menuTrigger = document.getElementById('menuTrigger');
    const menuClose = document.getElementById('menuClose');
    const menu = document.getElementById('menu');
    const menuLinks = Array.from(document.querySelectorAll('.menu-link'));
    let lastFocusedElement;

    function trapFocus(container) {
        const focusableElements = container.querySelectorAll('a[href], button:not([disabled])');
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        container.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        e.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else { // Tab
                    if (document.activeElement === lastFocusableElement) {
                        e.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            }
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    }

    function openMenu() {
        lastFocusedElement = document.activeElement;
        menu.classList.add('active');
        menu.setAttribute('aria-modal', 'true');
        menuTrigger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        menuClose.focus();
        trapFocus(menu);
    }

    function closeMenu() {
        menu.classList.remove('active');
        menu.setAttribute('aria-modal', 'false');
        menuTrigger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    if (menuTrigger && menu && menuClose) {
        menuTrigger.addEventListener('click', openMenu);
        menuClose.addEventListener('click', closeMenu);
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }


    // --- FADE-IN ANIMATIONS ON SCROLL ---
    const animatedElements = document.querySelectorAll('.philosophy-text, .service-card, .achievement, .engagement, .bio, .credentials');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

        animatedElements.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });

        // Add CSS for the reveal animation to avoid a separate style block
        const style = document.createElement('style');
        style.innerHTML = `
            .reveal {
                opacity: 0;
                transform: translateY(40px);
                transition: opacity 1s cubic-bezier(0.23, 1, 0.32, 1), transform 1s cubic-bezier(0.23, 1, 0.32, 1);
            }
            .reveal.in-view {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

});