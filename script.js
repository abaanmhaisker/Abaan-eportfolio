"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Theme Toggling
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn?.querySelector('i');

    if (themeToggleBtn && themeIcon) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            htmlElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme, themeIcon);
        } else {
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
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // ==========================================
    // 2. Sticky Header
    // ==========================================
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 3. Mobile Menu Toggle
    // ==========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuIcon = mobileMenuBtn?.querySelector('i');

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

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // ==========================================
    // 3.5. Clickable "9 Projects" Stat Card & Profile Photo Lightbox
    // ==========================================
    const projectsStatCard = document.getElementById('projects-stat-card');
    if (projectsStatCard) {
        const scrollToProjects = () => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        };
        projectsStatCard.addEventListener('click', scrollToProjects);
        projectsStatCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToProjects();
            }
        });
    }

    // Profile Photo Lightbox Zoom
    const profilePhotoImg = document.querySelector('.about-profile-photo');
    const photoModal = document.getElementById('photo-lightbox-modal');
    const photoCloseBtn = document.getElementById('photo-lightbox-close');
    const photoBackdrop = document.getElementById('photo-lightbox-backdrop');

    if (profilePhotoImg && photoModal) {
        profilePhotoImg.style.cursor = 'pointer';
        profilePhotoImg.setAttribute('title', 'Click to zoom photo');

        const openPhotoModal = () => {
            photoModal.classList.add('active');
            photoModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closePhotoModal = () => {
            photoModal.classList.remove('active');
            photoModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        profilePhotoImg.addEventListener('click', openPhotoModal);
        if (photoCloseBtn) photoCloseBtn.addEventListener('click', closePhotoModal);
        if (photoBackdrop) photoBackdrop.addEventListener('click', closePhotoModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && photoModal.classList.contains('active')) {
                closePhotoModal();
            }
        });
    }

    // Screenshot Gallery Lightbox
    const galleryModal = document.getElementById('gallery-lightbox-modal');
    const galleryCloseBtn = document.getElementById('gallery-lightbox-close');
    const galleryBackdrop = document.getElementById('gallery-lightbox-backdrop');
    const galleryImage = document.getElementById('gallery-current-image');
    const galleryTitle = document.getElementById('gallery-title-text');
    const galleryCounter = document.getElementById('gallery-counter-text');

    window.openGalleryModal = function(title, imagePath) {
        if (!galleryModal || !galleryImage) return;
        galleryImage.src = imagePath;
        if (galleryTitle) galleryTitle.textContent = title;
        if (galleryCounter) galleryCounter.textContent = "1 of 1";
        galleryModal.classList.add('active');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    window.closeGalleryModal = function() {
        if (!galleryModal) return;
        galleryModal.classList.remove('active');
        galleryModal.setAttribute('aria-hidden', 'true');
        if (!document.getElementById('project-modal')?.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    };

    if (galleryCloseBtn) galleryCloseBtn.addEventListener('click', window.closeGalleryModal);
    if (galleryBackdrop) galleryBackdrop.addEventListener('click', window.closeGalleryModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryModal?.classList.contains('active')) {
            window.closeGalleryModal();
        }
    });

    // ==========================================
    // 4. Detailed Projects Data Store (9 Projects: 4 Major, 5 Mini)
    // ==========================================
    const projectsData = {
        // --- MAJOR PROJECTS (4) ---
        "sih2025": {
            title: "SIH 2025 — Rural Telemedicine Healthcare Platform",
            categoryBadge: "Major Project",
            categoryType: "major",
            semester: "SIH 2025",
            badgeClass: "major-pill",
            groupLabel: "Group Project",
            subtitle: "A telemedicine web prototype built for Smart India Hackathon 2025 to connect rural patients with remote healthcare specialists.",
            context: "Smart India Hackathon 2025 entry focused on rural healthcare accessibility.",
            whyDeveloped: "SIH 2025 was one of our team's first serious hackathons. We chose the rural telemedicine problem statement to make healthcare advice accessible to patients in remote villages under tight hackathon deadlines.",
            problemPurpose: "Patients in rural areas often lack access to medical specialists. This platform provided remote symptom submission, appointment scheduling, and doctor consultation workflows.",
            myRole: "I worked with my hackathon project partners under high pressure, handling long hours and late nights to build backend Flask API endpoints, database models, and web templates.",
            functionality: [
                "Remote Patient Registration: Easy profile creation for rural patients and village health workers.",
                "Symptom Logger & Triage: Structured submission of symptoms and medical history for remote evaluation.",
                "Doctor Consultation Queue: Appointment scheduling and status tracking for medical specialists.",
                "Health Knowledge Base: Access to preventive health guidelines and first-aid instructions."
            ],
            architecture: "Built using Python (Flask), SQLite database for patient/doctor records, HTML5/CSS3 templates, and RESTful API endpoints for consultation queuing.",
            techStack: ["Python", "Flask", "SQLite", "HTML5", "CSS3", "JavaScript", "REST API"],
            learnings: [
                "Working under tight hackathon deadlines and high pressure.",
                "Designing database schemas for healthcare consultations.",
                "Communicating effectively as a team during long development hours.",
                "Learning from disappointment when not selected and using the experience to improve for SIH 2026."
            ],
            githubUrl: "https://github.com/abaanmhaisker/SIH2025.git",
            demoUrl: null,
            gallery: ["assets/gallery/sih2025.png"]
        },
        "sparsha": {
            title: "Sparsha — NGO Student Administration Platform",
            categoryBadge: "Major Project",
            categoryType: "major",
            semester: "Semester 4 Holidays • May - June 2026",
            badgeClass: "major-pill",
            groupLabel: "Group Project",
            subtitle: "Full-stack student management portal built for SPARSHA NGO during our vacation to manage student profiles, attendance, exam marks, and survey forms.",
            context: "Developed during Semester 4 holidays as a social service engineering project.",
            whyDeveloped: "During our Semester 4 holidays, our team wanted to work on a project with a real social purpose. We got the opportunity to partner with SPARSHA NGO to digitize their student administration.",
            problemPurpose: "Paper-based record keeping in community educational programs leads to lost student records and inefficient tracking. Sparsha provides a centralized web system to solve this.",
            myRole: "As part of our project team, I worked on full-stack web integration, connecting the React frontend to Express backend APIs, setting up Prisma database schemas, and testing dynamic forms.",
            functionality: [
                "Student Directory & Profiles: Searchable student records with progress charts.",
                "Session Attendance Logger: Session-based attendance tracking for NGO classes.",
                "Exam Marks Engine: Score entry grids with validation rules and performance charts.",
                "Custom Form Builder: Creating and rendering dynamic survey forms for field data.",
                "Analytics Dashboard: Summary stats and pending action badges for administrators."
            ],
            architecture: "Full-stack monorepo featuring a decoupled **React + Vite** frontend and an **Express + Node.js** REST API backend. Uses **Prisma ORM** with **PostgreSQL** for database management, JWT authentication, and Docker Compose orchestration.",
            techStack: ["React.js", "Vite", "Node.js", "Express", "Prisma ORM", "PostgreSQL", "Docker", "JWT"],
            learnings: [
                "Architecting full-stack monorepos with React and Express.",
                "Designing database schemas using Prisma ORM migrations.",
                "Implementing dynamic form generation and state management in React.",
                "Building software for real non-profit users with a team."
            ],
            githubUrl: "https://github.com/abaanmhaisker/sparsha.git",
            demoUrl: null,
            gallery: ["assets/gallery/sparsha.png"]
        },
        "vuln-triage": {
            title: "Vulnerability Prioritization & Triage System",
            categoryBadge: "Major Project",
            categoryType: "major",
            semester: "Semester 5 • July - November 2026",
            badgeClass: "major-pill",
            groupLabel: "Group Project",
            subtitle: "Decision-support web tool that uses machine learning to estimate CVSS severity, predict exploit risk, and prioritize 366K+ CVE vulnerabilities.",
            context: "Developed to apply Software Engineering and AI concepts to a practical cybersecurity problem.",
            whyDeveloped: "We chose this project to address disclosure delays in official vulnerability scoring. When new CVEs are disclosed, official scores take time to publish, so we built an immediate scoring tool.",
            problemPurpose: "Security teams face an overwhelming volume of newly disclosed vulnerabilities. This system provides instant, publication-time ML predictions for CVSS base estimation and KEV exploitability risk.",
            myRole: "I worked with my group on the FastAPI REST application layer, DuckDB dataset query integration, and structuring the analyst triage queue workflow.",
            functionality: [
                "366K+ Vulnerability Explorer: Fast search across CVEs using DuckDB SQL and Parquet storage.",
                "Pre-Scoring CVSS Estimator (EXP-A1): XGBoost model predicting official CVSS scores from text descriptions.",
                "Publication-Time KEV Risk Prediction (EXP-B2): XGBoost classifier predicting CISA KEV exploit inclusion.",
                "Dual-Mode Prioritization Surface: Linear equal weights vs interactive surface scoring across asset tiers.",
                "SHAP Explainability & RBAC: Feature attribution breakdowns and SQLite role-based user authentication."
            ],
            architecture: "Multi-tier architecture consisting of a Python FastAPI backend REST API, DuckDB SQL engine querying columnar Parquet files (`data/processed/*.parquet`), serialized XGBoost & SHAP models, SQLite auth storage, and a Vanilla JavaScript ES Modules SPA frontend.",
            techStack: ["Python", "FastAPI", "DuckDB", "Parquet", "XGBoost", "Scikit-Learn", "SHAP", "SQLite"],
            learnings: [
                "Querying high-performance columnar datasets with DuckDB.",
                "Integrating machine learning models (XGBoost) into web APIs.",
                "Using SHAP explainability in security analyst tools.",
                "Applying strict evaluation splits in machine learning projects."
            ],
            githubUrl: "https://github.com/abaanmhaisker/vulnarability-prioritization-triage-system.git",
            demoUrl: "https://vuln-triage.seucra.tech"
        },
        "cybershield": {
            title: "CyberShield — Cyber Fraud Interception Platform",
            categoryBadge: "Major Project",
            categoryType: "major",
            semester: "Semester 5 • July - November 2026",
            badgeClass: "major-pill",
            groupLabel: "Group Project",
            subtitle: "A real-time fraud interception system that detects mule accounts and predicts ATM cash-out points before cash is withdrawn.",
            context: "Smart India Hackathon 2026 (Problem Statement 184) under mentor Prakash Parmar. Selected in the internal round.",
            whyDeveloped: "We selected Problem Statement 184 for SIH 2026 to tackle real-time financial cyber fraud. Stolen money moves fast through mule account chains before being withdrawn at ATMs, so we wanted to build a proactive defense system.",
            problemPurpose: "Existing banking fraud tools act after money is already withdrawn. CyberShield proactively intercepts mule networks and predicts exact physical cash-out locations (ATMs / AEPS micro-ATMs) before cash egress takes place.",
            myRole: "I worked with my hackathon project team on backend data streaming, FastAPI REST server integration, and linking real-time alerts to the user interface.",
            functionality: [
                "Real-Time Streaming: Processing live transaction streams using Apache Kafka.",
                "Graph Network Tracking: Using NetworkX directed graphs to track money fan-in, fan-out, and layering transfers.",
                "8 Heuristic Scoring Rules: Evaluating account age, velocity gaps, and transaction patterns.",
                "Spatial ATM Ranking: Predicting target cash-out ATMs based on location proximity and historical patterns.",
                "Field App Sync: Sending live fraud alerts to the CyberShield Kotlin/Compose Android app."
            ],
            architecture: "Backend built with Python 3.10+, Apache Kafka, NetworkX graph engine, SQLite persistence, and FastAPI REST endpoints (`api/server.py`). User frontend is a native Android Kotlin application built with Jetpack Compose and MapLibre OSM maps.",
            techStack: ["Python", "Apache Kafka", "NetworkX", "FastAPI", "SQLite", "Kotlin", "Jetpack Compose", "MapLibre OSM"],
            learnings: [
                "Handling real-time streaming data with Apache Kafka clusters.",
                "Applying directed graph theory to financial network analysis.",
                "Formulating spatial proximity algorithms for location prediction.",
                "Collaborating effectively under hackathon deadlines."
            ],
            githubUrl: "https://github.com/abaanmhaisker/SIH2026.git",
            demoUrl: null,
            gallery: ["assets/gallery/cybershield.png"]
        },

        // --- MINI PROJECTS (5) ---
        "student-mgmt": {
            title: "Student Management & Enrollment System",
            categoryBadge: "Mini Project",
            categoryType: "mini",
            semester: "Semester 3 • June - November 2025",
            badgeClass: "mini-pill",
            groupLabel: "Group Project",
            subtitle: "Administrative web dashboard for managing course registration requests, faculty assignments, and department setup.",
            context: "Developed as part of DBMS-related coursework.",
            whyDeveloped: "We chose this project to apply DBMS concepts in a practical web system, managing student enrollment workflows and course administrative data.",
            techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "LocalStorage API"],
            learnings: [
                "Translating database entity relationships into web applications.",
                "Managing client-side state with LocalStorage.",
                "Building clean admin dashboard interfaces."
            ],
            githubUrl: "https://github.com/abaanmhaisker/Student-Management.git",
            demoUrl: "https://abaanmhaisker.github.io/Student-Management/"
        },
        "vmem": {
            title: "Virtual Memory Address Translation Simulator",
            categoryBadge: "Mini Project",
            categoryType: "mini",
            semester: "Semester 4 • January - May 2026",
            badgeClass: "mini-pill",
            groupLabel: "Group Project",
            subtitle: "Visual tool demonstrating 32-bit virtual memory address translation through multi-level page tables and TLB caching.",
            context: "Developed as part of Operating Systems coursework.",
            whyDeveloped: "We chose this project to understand Operating System memory concepts in a practical way, visualizing how virtual memory translation works instead of only reading theory.",
            problemPurpose: "Demonstrates how 32-bit virtual addresses are mapped to physical memory frames through multi-level page tables and TLB caching.",
            myRole: "I worked with my team on writing the bitwise address parsing logic, implementing the TLB cache replacement state hook in React, and designing step-by-step animations.",
            functionality: [
                "Hexadecimal Bitwise Parsing: Extracts 10-bit Level 1 directory, 10-bit Level 2 table, and 12-bit offset values.",
                "Step-by-Step State Animation: Interactive progression through TLB lookup, page directory access, and frame resolution.",
                "TLB Cache Simulation: Visual TLB table implementing a FIFO (First-In, First-Out) cache eviction policy.",
                "Step-by-Step Terminal Log: Live log window reporting exact bit shifts and physical address calculations."
            ],
            architecture: "Built using **React** and **Vite**, utilizing a custom React hook (`useVirtualMemory`) to manage address parsing state, async animation delays, TLB cache arrays, and execution logging.",
            techStack: ["React.js", "Vite", "JavaScript", "Custom React Hooks", "Bitwise Logic"],
            learnings: [
                "Understanding virtual memory paging at the hardware level.",
                "Writing bitwise operations in JavaScript.",
                "Implementing TLB caching and FIFO eviction logic.",
                "Building interactive state animations using React Hooks."
            ],
            githubUrl: "https://github.com/abaanmhaisker/virtual-memory-sim.git",
            demoUrl: "https://abaanmhaisker.github.io/virtual-memory-sim/"
        },
        "readers-writers": {
            title: "Readers-Writers Problem Simulator",
            categoryBadge: "Mini Project",
            categoryType: "mini",
            semester: "Semester 4 • January - May 2026",
            badgeClass: "mini-pill",
            groupLabel: "Group Project",
            subtitle: "Interactive simulator showing process synchronization and thread concurrency with Writer-Priority semaphore controls.",
            context: "Developed as part of Operating Systems coursework.",
            whyDeveloped: "We chose this project to understand process synchronization and concurrency in Operating Systems through a practical visual simulator.",
            problemPurpose: "Helps visualize how reader and writer threads share a resource while using Writer-Priority semaphore controls to prevent writer starvation.",
            myRole: "I collaborated with my group on designing the Writer-Priority synchronization logic, implementing semaphore state variables in JavaScript, and building the dynamic UI.",
            functionality: [
                "Writer-Priority Semaphore Control: Blocks new readers when a writer is queued to prevent starvation.",
                "Visual Thread Queues: Active and waiting lanes for both reader and writer threads.",
                "Shared Resource Visual Box: Live state indicator showing resource locks (`IDLE`, `READING`, `WRITING`).",
                "Auto Simulation Mode: Automatic thread generator that dispatches random reader and writer requests.",
                "Timestamped Event Log: Scrolling log terminal tracking thread lock acquisitions and releases."
            ],
            architecture: "Built using Vanilla JavaScript, semantic HTML, and CSS3. Simulates counting semaphores and mutex flags (`readerCount`, `writerActive`, `readerQueue`, `writerQueue`) to manage thread states.",
            techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "Semaphores / Mutex", "Concurrency Logic"],
            learnings: [
                "Understanding process synchronization and mutual exclusion.",
                "Implementing semaphores and mutex logic in JavaScript.",
                "Solving starvation problems using priority queuing logic.",
                "Designing clean visual interfaces for OS algorithms."
            ],
            githubUrl: "https://github.com/abaanmhaisker/readers-writers-simulator.git",
            demoUrl: "https://abaanmhaisker.github.io/readers-writers-simulator/"
        },
        "ewem": {
            title: "E-Waste EPR Registration & Target Calculator",
            categoryBadge: "Mini Project",
            categoryType: "mini",
            semester: "Semester 5 • July - November 2026",
            badgeClass: "mini-pill",
            groupLabel: "Group Project",
            subtitle: "Web calculator implementing CPCB rules to compute annual e-waste recycling targets and registration fees for producers and recyclers.",
            context: "Developed as part of EWEM (Electronic Waste & Environmental Management) coursework.",
            whyDeveloped: "We chose this project to apply EWEM concepts through a practical compliance calculator modeled on India's E-Waste Rules 2022.",
            problemPurpose: "Producers, Manufacturers, Recyclers, and Refurbishers need clear visibility into their mandatory annual recycling targets and CPCB registration fees to remain compliant.",
            myRole: "I worked with my team on translating government CPCB guidelines into JavaScript logic, building the fee lookup matrix, and designing the responsive compliance portal UI.",
            functionality: [
                "Financial Year Target Selector: Supports FY 2023-24 to 2028-29 target rates (60% to 80%).",
                "Entity Category Support: Handles Producers, Manufacturers, Recyclers, and Refurbishers.",
                "CPCB Annexure-I Fee Slabs: Dynamic lookup ranging from ₹2,500 (<50 MT) to ₹15,00,000 (≥5,000 MT).",
                "Live Table Editing & CSV Export: In-table cell editing for live updates, summary metrics, and CSV export."
            ],
            architecture: "Single-page web compliance tool built with semantic HTML5, custom CSS implementing CPCB portal styling, and modular event-driven Vanilla JavaScript.",
            techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "CPCB Guidelines", "CSV Export"],
            learnings: [
                "Converting government regulations into algorithmic code.",
                "Managing event-driven DOM updates in Vanilla JS.",
                "Building interactive in-table cell editing features.",
                "Generating CSV data exports directly in the browser."
            ],
            githubUrl: "https://github.com/abaanmhaisker/EWEM_calculator.git",
            demoUrl: "https://abaanmhaisker.github.io/EWEM_calculator/"
        },
        "ewem-project": {
            title: "EWEM Project — Interactive E-Waste & Sorting Educational Game",
            categoryBadge: "Mini Project",
            categoryType: "mini",
            semester: "Semester 5 • July - November 2026",
            badgeClass: "mini-pill",
            groupLabel: "Group Project",
            subtitle: "An interactive educational web game and knowledge platform designed to teach proper garbage sorting, e-waste handling rules, and recycling awareness.",
            context: "Developed as part of EWEM (Electronic Waste & Environmental Management) coursework.",
            whyDeveloped: "We chose this project to make e-waste awareness engaging through gamification, helping students and users practice correct waste segregation rules.",
            problemPurpose: "Lack of public awareness about e-waste hazard classification and municipal waste segregation leads to improper disposal. This interactive game makes learning waste rules intuitive and practical.",
            myRole: "I worked with my project partners on game logic mechanics, score calculation, sound integration, and knowledge base UI design.",
            functionality: [
                "Interactive Drag-and-Drop Waste Sorting Game: Practice sorting items into wet, dry, hazardous, and electronic waste bins.",
                "Real-Time Scoring & Audio Feedback: Instant visual and sound feedback based on correct segregation rules.",
                "Comprehensive Knowledge Base: Interactive guide covering CPCB categories, battery disposal, and toxic component hazards.",
                "High-Score Tracker: Local score retention to motivate replayability and educational retention."
            ],
            architecture: "Client-side web application built with HTML5, CSS3, Vanilla JavaScript event listeners, HTML5 Audio API, and custom DOM animation timers.",
            techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "HTML5 Audio API", "Gamification Design"],
            learnings: [
                "Building interactive web games with Vanilla JavaScript.",
                "Managing audio API feedback and game state timers.",
                "Translating environmental compliance concepts into engaging gamified UI."
            ],
            githubUrl: "https://github.com/abaanmhaisker/ewem-project.git",
            demoUrl: "https://ewem.seucra.tech"
        }
    };

    // ==========================================
    // 5. Project Detail Modal Handler
    // ==========================================
    const projectModal = document.getElementById('project-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalContentBody = document.getElementById('modal-content-body');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            const data = projectsData[projectId];
            if (data && modalContentBody && projectModal) {
                renderModalContent(data);
                projectModal.classList.add('active');
                projectModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    function renderModalContent(data) {
        if (!modalContentBody) return;

        const featuresList = data.functionality.map(item => `<li>${item}</li>`).join('');
        const techPills = data.techStack.map(tech => `<span class="tech-pill">${tech}</span>`).join('');
        const learningsList = data.learnings.map(item => `<li>${item}</li>`).join('');

        let demoBtnHtml = '';
        if (data.demoUrl && data.demoUrl !== data.githubUrl) {
            demoBtnHtml = `<a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>`;
        }

        modalContentBody.innerHTML = `
            <div class="modal-header-section">
                <div class="modal-badges">
                    <span class="category-pill ${data.badgeClass}">${data.categoryBadge}</span>
                    <span class="semester-badge"><i class="fa-solid fa-calendar-day"></i> ${data.semester}</span>
                    <span class="group-project-badge"><i class="fa-solid fa-users"></i> ${data.groupLabel}</span>
                </div>
                <h2 class="modal-title">${data.title}</h2>
                <p class="modal-subtitle">${data.subtitle}</p>
            </div>

            <div class="modal-section-block">
                <h3 class="modal-section-title"><i class="fa-solid fa-circle-info text-accent"></i> Why We Chose This & Purpose</h3>
                <p class="modal-text"><strong>Context:</strong> ${data.context}</p>
                <p class="modal-text" style="margin-top: 8px;"><strong>Why We Chose It:</strong> ${data.whyDeveloped}</p>
                <p class="modal-text" style="margin-top: 8px;"><strong>Problem Addressed:</strong> ${data.problemPurpose}</p>
                <p class="modal-text" style="margin-top: 8px;"><strong>My Involvement:</strong> ${data.myRole}</p>
            </div>

            <div class="modal-section-block">
                <h3 class="modal-section-title"><i class="fa-solid fa-gears text-accent"></i> Main Features & Functions</h3>
                <ul class="modal-list">
                    ${featuresList}
                </ul>
            </div>

            <div class="modal-section-block">
                <h3 class="modal-section-title"><i class="fa-solid fa-code-branch text-accent"></i> How It Works & Architecture</h3>
                <p class="modal-text">${data.architecture}</p>
            </div>

            <div class="modal-section-block">
                <h3 class="modal-section-title"><i class="fa-solid fa-layer-group text-accent"></i> Technologies Used</h3>
                <div class="modal-tech-pills">
                    ${techPills}
                </div>
            </div>

            <div class="modal-section-block">
                <h3 class="modal-section-title"><i class="fa-solid fa-lightbulb text-accent"></i> What I Learned</h3>
                <ul class="modal-list">
                    ${learningsList}
                </ul>
            </div>

            <div class="modal-footer-actions">
                <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline"><i class="fa-brands fa-github"></i> GitHub Repository</a>
                ${demoBtnHtml}
                <button class="btn btn-outline" onclick="closeProjectModal()" style="margin-left: auto;">Close</button>
            </div>
        `;
    }

    window.closeProjectModal = function() {
        if (!projectModal) return;
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeProjectModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal?.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // ==========================================
    // 6. Project Filter Controls
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const majorWrapper = document.querySelector('.project-section-wrapper[data-section="major"]');
    const miniWrapper = document.querySelector('.project-section-wrapper[data-section="mini"]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            if (filterValue === 'all') {
                if (majorWrapper) majorWrapper.style.display = 'block';
                if (miniWrapper) miniWrapper.style.display = 'block';
            } else if (filterValue === 'major') {
                if (majorWrapper) majorWrapper.style.display = 'block';
                if (miniWrapper) miniWrapper.style.display = 'none';
            } else if (filterValue === 'mini') {
                if (majorWrapper) majorWrapper.style.display = 'none';
                if (miniWrapper) miniWrapper.style.display = 'block';
            }
        });
    });
});
