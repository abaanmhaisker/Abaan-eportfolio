"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggling
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn === null || themeToggleBtn === void 0 ? void 0 : themeToggleBtn.querySelector('i');
    if (themeToggleBtn && themeIcon) {
        // Check for saved theme or preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            htmlElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme, themeIcon);
        }
        else {
            // System preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const defaultTheme = prefersDark ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', defaultTheme);
            updateThemeIcon(defaultTheme, themeIcon);
        }
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeIcon);
        });
    }
    function updateThemeIcon(theme, icon) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
        else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (!header)
            return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
        else {
            header.classList.remove('scrolled');
        }
    });
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuIcon = mobileMenuBtn === null || mobileMenuBtn === void 0 ? void 0 : mobileMenuBtn.querySelector('i');
    if (mobileMenuBtn && mobileMenu && menuIcon) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            if (mobileMenu.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            }
            else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
        // Close mobile menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            if (!btn)
                return;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;
            // Actual sending interaction
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            fetch("https://formsubmit.co/ajax/abaanmhaisker@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput ? nameInput.value : '',
                    email: emailInput ? emailInput.value : '',
                    message: messageInput ? messageInput.value : ''
                })
            })
            .then(response => response.json())
            .then(data => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent Successfully!';
                btn.classList.remove('btn-primary');
                btn.style.backgroundColor = '#10b981';
                btn.style.borderColor = '#10b981';
                btn.style.opacity = '1';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.add('btn-primary');
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Error. Try again.';
                btn.style.backgroundColor = '#ef4444';
                btn.style.borderColor = '#ef4444';
                btn.style.opacity = '1';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                }, 3000);
            });
        });
    }
});
