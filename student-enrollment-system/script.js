// Sample Data Storage setup
let courses = [];
let teachers = [];
let departments = [];
let studentRequests = [
    { id: 1, name: "John Doe", course: "Computer Science 101", credits: 4, email: "john@example.com", roll: "CS-001" },
    { id: 2, name: "Jane Smith", course: "Advanced Mathematics", credits: 3, email: "jane@example.com", roll: "MT-105" },
    { id: 3, name: "Alice Johnson", course: "Physics 202", credits: 4, email: "alice@example.com", roll: "PH-202" }
];

// Initialize mock courses
let mockCourses = [
    { id: "CS101", name: "Computer Science 101", credits: 4, faculty: "Dr. Turing", dept: "Computer Science", desc: "Introductory course to CS." },
    { id: "MT105", name: "Advanced Mathematics", credits: 3, faculty: "Dr. Euler", dept: "Mathematics", desc: "Advanced calculus and linear algebra." }
];

/**
 * Authentication Logic
 */
function initAuth() {
    // Set default credentials if they don't exist
    if (!localStorage.getItem('adminUser')) {
        localStorage.setItem('adminUser', 'admin');
        localStorage.setItem('adminPass', 'admin123');
    }
}

function login(event) {
    event.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('loginError');

    const storedUser = localStorage.getItem('adminUser');
    const storedPass = localStorage.getItem('adminPass');

    if (user === storedUser && pass === storedPass) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        errorMsg.classList.remove('hide');
        setTimeout(() => errorMsg.classList.add('hide'), 3000);
    }
}

function logout(event) {
    if (event) event.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

function showForgotPassword(show) {
    const loginForm = document.getElementById('loginForm');
    const forgotForm = document.getElementById('forgotForm');
    
    if (show) {
        loginForm.classList.remove('active-form');
        setTimeout(() => forgotForm.classList.add('active-form'), 300);
    } else {
        forgotForm.classList.remove('active-form');
        setTimeout(() => loginForm.classList.add('active-form'), 300);
    }
}

function forgotPassword(event) {
    event.preventDefault();
    const username = document.getElementById('resetUsername').value;
    const storedUser = localStorage.getItem('adminUser');
    const resetMsg = document.getElementById('resetMessage');

    if (username === storedUser) {
        // Mock a password reset for simplicity
        localStorage.setItem('adminPass', 'admin123'); // resetting to default
        resetMsg.textContent = "Password reset to default 'admin123'";
        resetMsg.classList.remove('hide');
        resetMsg.classList.add('success');
    } else {
        resetMsg.textContent = "Username not found.";
        resetMsg.classList.remove('hide', 'success');
        resetMsg.classList.add('error');
    }

    setTimeout(() => resetMsg.classList.add('hide'), 4000);
}


/**
 * Dashboard Logic
 */
function loadPage(pageId, event) {
    if (event) event.preventDefault();
    
    // Update active nav link
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    if (event) event.currentTarget.parentElement.classList.add('active');

    // Update active page view
    document.querySelectorAll('.page-view').forEach(page => {
        page.classList.remove('active');
        page.classList.add('hide');
    });

    const target = document.getElementById(pageId + 'Page');
    if (target) {
        target.classList.remove('hide');
        target.classList.add('active');
    }

    // Update title
    const titles = {
        'dashboard': 'Overview Dashboard',
        'addCourse': 'Add New Course',
        'addTeacher': 'Add New Teacher',
        'addDepartment': 'Add New Department'
    };
    document.getElementById('pageTitle').textContent = titles[pageId] || 'Dashboard';
}

function renderDashboard() {
    // Initialize session data
    if (!localStorage.getItem('coursesData')) {
        localStorage.setItem('coursesData', JSON.stringify(mockCourses));
    }
    const storedCourses = localStorage.getItem('coursesData');
    courses = storedCourses ? JSON.parse(storedCourses) : mockCourses;

    // Render Requests
    const reqList = document.getElementById('enrollmentList');
    if (reqList) {
        reqList.innerHTML = '';
        studentRequests.forEach(req => {
            reqList.innerHTML += `
                <li class="list-item" id="req-${req.id}">
                    <div class="item-title">${req.name}</div>
                    <div class="item-sub">Course: ${req.course} | Credits: ${req.credits}</div>
                    <div class="item-actions">
                        <button class="btn-sm btn-success" onclick="approveRequest(${req.id})">Approve</button>
                        <button class="btn-sm btn-danger" onclick="disapproveRequest(${req.id})">Reject</button>
                        <button class="btn-sm btn-info" onclick="viewStudentDetail(${req.id})">Details</button>
                    </div>
                </li>
            `;
        });
        document.getElementById('notifBadge').textContent = studentRequests.length;
    }

    // Render Courses
    const courseList = document.getElementById('courseList');
    if (courseList) {
        courseList.innerHTML = '';
        courses.forEach(course => {
            courseList.innerHTML += `
                <li class="list-item">
                    <div class="item-title">${course.name}</div>
                    <div class="item-sub">ID: ${course.id} | Credits: ${course.credits}</div>
                    <div class="item-actions">
                        <button class="btn-sm btn-info" onclick="showCourseDetail('${course.id}')">Course Details</button>
                    </div>
                </li>
            `;
        });
    }
}

// Entity Form Submissions
function addEntity(event, type) {
    event.preventDefault();
    if (type === 'Course') {
        const newCourse = {
            name: document.getElementById('courseName').value,
            id: document.getElementById('courseID').value,
            credits: document.getElementById('courseCredits').value,
            faculty: "Unassigned",
            dept: "Unassigned",
            desc: "Newly added course."
        };
        courses.push(newCourse);
        localStorage.setItem('coursesData', JSON.stringify(courses));
        alert('Course added successfully!');
        event.target.reset();
        renderDashboard(); // Refresh course list
    } else if (type === 'Teacher') {
        alert('Teacher added successfully!');
        event.target.reset();
    } else if (type === 'Department') {
        alert('Department added successfully!');
        event.target.reset();
    }
}

// Action Handlers
function approveRequest(id) {
    studentRequests = studentRequests.filter(req => req.id !== id);
    alert(`Request ${id} approved!`);
    renderDashboard();
    document.getElementById('detailsSection').innerHTML = ''; // Clear details
}

function disapproveRequest(id) {
    studentRequests = studentRequests.filter(req => req.id !== id);
    alert(`Request ${id} rejected.`);
    renderDashboard();
    document.getElementById('detailsSection').innerHTML = '';
}

function viewStudentDetail(id) {
    const student = studentRequests.find(req => req.id === id);
    if (!student) return;

    const details = document.getElementById('detailsSection');
    details.innerHTML = `
        <div class="detail-box">
            <h3>Student Details</h3>
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Roll No:</strong> ${student.roll}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Requested Course:</strong> ${student.course}</p>
            <p><strong>Credits:</strong> ${student.credits}</p>
        </div>
    `;
    // Scroll to details
    details.scrollIntoView({ behavior: 'smooth' });
}

function showCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const details = document.getElementById('detailsSection');
    details.innerHTML = `
        <div class="detail-box">
            <h3>Course Details</h3>
            <p><strong>Course Name:</strong> ${course.name}</p>
            <p><strong>Course ID:</strong> ${course.id}</p>
            <p><strong>Department:</strong> ${course.dept}</p>
            <p><strong>Faculty:</strong> ${course.faculty}</p>
            <p><strong>Description:</strong> ${course.desc}</p>
        </div>
    `;
    details.scrollIntoView({ behavior: 'smooth' });
}

// Used but alias for viewStudentDetail based on requirement constraints
function showStudentDetail(id) {
    viewStudentDetail(id);
}
