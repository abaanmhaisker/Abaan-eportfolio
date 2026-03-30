document.addEventListener('DOMContentLoaded', () => {
    
    // Theme Toggling
    const themeToggleBtn = document.getElementById('theme-toggle') as HTMLButtonElement | null;
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn?.querySelector('i') as HTMLElement | null | undefined;

    if (themeToggleBtn && themeIcon) {
        // Check for saved theme or preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            htmlElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme, themeIcon);
        } else {
            // System preference
            const prefersDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const defaultTheme: string = prefersDark ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', defaultTheme);
            updateThemeIcon(defaultTheme, themeIcon);
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme: string = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeIcon);
        });
    }

    function updateThemeIcon(theme: string, icon: HTMLElement): void {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Sticky Header
    const header = document.querySelector('.header') as HTMLElement | null;
    window.addEventListener('scroll', () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn') as HTMLButtonElement | null;
    const mobileMenu = document.querySelector('.mobile-menu') as HTMLDivElement | null;
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuIcon = mobileMenuBtn?.querySelector('i') as HTMLElement | null | undefined;

    if (mobileMenuBtn && mobileMenu && menuIcon) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            if (mobileMenu.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
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
    const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
    if (contactForm) {
        contactForm.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button') as HTMLButtonElement | null;
            if (!btn) return;

            const originalText: string = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Simulate sending interaction
            setTimeout(() => {
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
            }, 1000);
        });
    }
});
