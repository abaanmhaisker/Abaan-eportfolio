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
    // Contact form submission logic is temporarily disabled 
    // to allow native HTML POST and trigger Formsubmit's activation UI.
});
