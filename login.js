/* ============================================
   LOGIN FUNCTIONALITY
   ============================================ */

// Demo user database (In production, connect to actual backend)
const demoUsers = {
    student: {
        email: 'student@menara.edu',
        id: 'STU001',
        password: 'student123',
        name: 'John Student',
        role: 'student'
    },
    staff: {
        email: 'staff@menara.edu',
        password: 'staff123',
        name: 'Dr. Jane Smith',
        department: 'Academics',
        role: 'staff'
    }
};

/* ============================================
   USER TYPE SELECTION
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const userTypeButtons = document.querySelectorAll('.user-type-btn');
    
    userTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            userTypeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the user type
            const userType = button.getAttribute('data-type');
            
            // Show corresponding form
            switchLoginForm(userType);
        });
    });
});

function switchLoginForm(userType) {
    const studentForm = document.getElementById('studentLogin');
    const staffForm = document.getElementById('staffLogin');
    
    if (userType === 'student') {
        studentForm.classList.add('active');
        staffForm.classList.remove('active');
    } else if (userType === 'staff') {
        staffForm.classList.add('active');
        studentForm.classList.remove('active');
    }
}

/* ============================================
   STUDENT LOGIN HANDLER
   ============================================ */

function handleStudentLogin(event) {
    event.preventDefault();
    
    const studentEmail = document.getElementById('studentEmail').value.trim();
    const studentPassword = document.getElementById('studentPassword').value;
    const rememberMe = document.querySelector('#studentLoginForm .remember-me input').checked;
    
    // Validate input
    if (!studentEmail || !studentPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    // Check credentials
    if (validateStudentCredentials(studentEmail, studentPassword)) {
        // Store login info in localStorage
        const studentData = {
            role: 'student',
            email: studentEmail,
            loginTime: new Date().toISOString(),
            name: demoUsers.student.name,
            id: demoUsers.student.id
        };
        
        if (rememberMe) {
            localStorage.setItem('menara_user', JSON.stringify(studentData));
            localStorage.setItem('menara_remember', 'true');
        } else {
            sessionStorage.setItem('menara_user', JSON.stringify(studentData));
        }
        
        // Redirect to student dashboard
        alert(`Welcome ${studentData.name}!`);
        window.location.href = 'student-dashboard.html';
    } else {
        alert('Invalid email/ID or password. Please try again.');
        document.getElementById('studentPassword').value = '';
    }
}

function validateStudentCredentials(email, password) {
    // Check if email is valid format or matches student ID
    const isValidEmail = email === demoUsers.student.email || email === demoUsers.student.id;
    const isValidPassword = password === demoUsers.student.password;
    
    return isValidEmail && isValidPassword;
}

/* ============================================
   STAFF LOGIN HANDLER
   ============================================ */

function handleStaffLogin(event) {
    event.preventDefault();
    
    const staffEmail = document.getElementById('staffEmail').value.trim();
    const staffPassword = document.getElementById('staffPassword').value;
    const staffDepartment = document.getElementById('staffDepartment').value;
    const rememberMe = document.querySelector('#staffLoginForm .remember-me input').checked;
    
    // Validate input
    if (!staffEmail || !staffPassword || !staffDepartment) {
        alert('Please fill in all fields');
        return;
    }
    
    // Check credentials
    if (validateStaffCredentials(staffEmail, staffPassword)) {
        // Store login info in localStorage
        const staffData = {
            role: 'staff',
            email: staffEmail,
            department: staffDepartment,
            loginTime: new Date().toISOString(),
            name: demoUsers.staff.name
        };
        
        if (rememberMe) {
            localStorage.setItem('menara_user', JSON.stringify(staffData));
            localStorage.setItem('menara_remember', 'true');
        } else {
            sessionStorage.setItem('menara_user', JSON.stringify(staffData));
        }
        
        // Redirect to staff dashboard
        alert(`Welcome ${staffData.name}! Logged in as ${staffDepartment}`);
        window.location.href = 'staff-dashboard.html';
    } else {
        alert('Invalid email or password. Please try again.');
        document.getElementById('staffPassword').value = '';
    }
}

function validateStaffCredentials(email, password) {
    const isValidEmail = email === demoUsers.staff.email;
    const isValidPassword = password === demoUsers.staff.password;
    
    return isValidEmail && isValidPassword;
}

/* ============================================
   CHECK IF USER IS ALREADY LOGGED IN
   ============================================ */

function checkUserSession() {
    const userData = JSON.parse(localStorage.getItem('menara_user')) || 
                     JSON.parse(sessionStorage.getItem('menara_user'));
    
    return userData;
}

function isUserLoggedIn() {
    return checkUserSession() !== null;
}

/* ============================================
   LOGOUT FUNCTIONALITY
   ============================================ */

function logout() {
    localStorage.removeItem('menara_user');
    localStorage.removeItem('menara_remember');
    sessionStorage.removeItem('menara_user');
    alert('You have been logged out successfully');
    window.location.href = 'login.html';
}

/* ============================================
   AUTO-LOGIN IF REMEMBER ME IS CHECKED
   ============================================ */

window.addEventListener('load', () => {
    // If remember me was checked, keep user logged in
    const rememberMe = localStorage.getItem('menara_remember');
    if (rememberMe === 'true') {
        const userData = JSON.parse(localStorage.getItem('menara_user'));
        if (userData) {
            // User is already logged in, could auto-redirect
            console.log('User session found:', userData);
        }
    }
});

/* ============================================
   DISPLAY LOGGED-IN USER INFO
   ============================================ */

function displayUserInfo() {
    const userData = checkUserSession();
    
    if (userData) {
        const userInfoElement = document.getElementById('userInfo');
        if (userInfoElement) {
            const roleEmoji = userData.role === 'student' ? '👨‍🎓' : '👨‍💼';
            userInfoElement.innerHTML = `
                <span>${roleEmoji} ${userData.name}</span>
                <button onclick="logout()" class="logout-btn">Logout</button>
            `;
        }
    }
}

// Call displayUserInfo on page load
document.addEventListener('DOMContentLoaded', displayUserInfo);

/* ============================================
   PROTECT DASHBOARD PAGES
   ============================================ */

function protectPage(requiredRole = null) {
    const userData = checkUserSession();
    
    if (!userData) {
        // User not logged in, redirect to login
        window.location.href = 'login.html';
        return;
    }
    
    if (requiredRole && userData.role !== requiredRole) {
        // User doesn't have required role
        alert('You do not have access to this page');
        window.location.href = 'login.html';
        return;
    }
    
    return userData;
}

/* ============================================
   FORM VALIDATION HELPERS
   ============================================ */

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

/* ============================================
   FORGOT PASSWORD HANDLER
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordLinks = document.querySelectorAll('.forgot-password');
    
    forgotPasswordLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Password reset feature coming soon. Please contact support at support@menara.edu');
        });
    });
});

/* ============================================
   CLEAR FORM ON PAGE LOAD
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentLoginForm');
    const staffForm = document.getElementById('staffLoginForm');
    
    if (studentForm) studentForm.reset();
    if (staffForm) staffForm.reset();
});

/* ============================================
   KEYBOARD SHORTCUTS
   ============================================ */

document.addEventListener('keydown', (e) => {
    // Press Enter to submit form
    if (e.key === 'Enter') {
        const activeForm = document.querySelector('.login-form-container.active form');
        if (activeForm) {
            activeForm.dispatchEvent(new Event('submit'));
        }
    }
});

/* ============================================
   SESSION TIMEOUT (Optional)
   ============================================ */

let sessionTimeout;

function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    
    // Set timeout for 30 minutes (1800000 milliseconds)
    sessionTimeout = setTimeout(() => {
        alert('Your session has expired. Please login again.');
        logout();
    }, 1800000);
}

document.addEventListener('mousemove', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);
document.addEventListener('click', resetSessionTimeout);

// Initialize session timeout on login pages
if (document.querySelector('.login-container')) {
    resetSessionTimeout();
}
