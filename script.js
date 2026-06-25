/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

/* ============================================
   FORM SUBMISSION HANDLER
   ============================================ */

const regForm = document.getElementById('regForm');
const successMessage = document.getElementById('successMessage');

if (regForm) {
    regForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(regForm);
    const data = Object.fromEntries(formData);

    // Validate required fields
    if (!validateForm(data)) {
        alert('Please fill in all required fields correctly.');
        return;
    }

    // In a real application, you would send this data to a server
    console.log('Form Data:', data);

    // Show success message
    if (successMessage) {
        regForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });

        // Reset form after 5 seconds
        setTimeout(() => {
            regForm.reset();
            regForm.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    }
}

function validateForm(data) {
    // Basic validation
    const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'dob',
        'nationality',
        'address',
        'city',
        'province',
        'postal',
        'country',
        'program',
        'education',
        'english',
        'intake'
    ];

    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
        return false;
    }

    // Validate phone number (basic check)
    const phonePattern = /^[\d\s\-\+\(\)]+$/;
    if (!phonePattern.test(data.phone)) {
        return false;
    }

    return true;
}

/* ============================================
   SMOOTH SCROLLING
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
   ACTIVE NAVIGATION LINK
   ============================================ */

function setActiveNav() {
    const currentLocation = location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.nav-menu a');

    menuItems.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === currentLocation || (currentLocation === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Set active nav on page load
document.addEventListener('DOMContentLoaded', setActiveNav);

/* ============================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ============================================ */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.feature-card, .value-card, .course-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

/* ============================================
   FORM INPUT VALIDATION
   ============================================ */

const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

if (emailInput) {
    emailInput.addEventListener('blur', function() {
        validateEmail(this.value);
    });
}

if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        validatePhone(this.value);
    });
}

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email) && email !== '') {
        emailInput.style.borderColor = '#e74c3c';
    } else {
        emailInput.style.borderColor = '#bdc3c7';
    }
}

function validatePhone(phone) {
    const pattern = /^[\d\s\-\+\(\)]+$/;
    if (!pattern.test(phone) && phone !== '') {
        phoneInput.style.borderColor = '#e74c3c';
    } else {
        phoneInput.style.borderColor = '#bdc3c7';
    }
}

/* ============================================
   SCROLL TO TOP BUTTON
   ============================================ */

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #3498db;
    color: white;
    border: none;
    padding: 12px 16px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    font-size: 18px;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseover', () => {
    scrollTopBtn.style.backgroundColor = '#2c3e50';
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.backgroundColor = '#3498db';
    scrollTopBtn.style.transform = 'scale(1)';
});

/* ============================================
   RESPONSIVE DESIGN TWEAKS
   ============================================ */

function handleResize() {
    const navMenu = document.getElementById('navMenu');
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);

/* ============================================
   PAGE LOAD ANIMATIONS
   ============================================ */

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

/* ============================================
   UTILITY FUNCTION: FORMAT PHONE NUMBER
   ============================================ */

function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11) {
        return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phoneNumber;
}

/* ============================================
   UTILITY FUNCTION: DEBOUNCE
   ============================================ */

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ============================================
   CONSOLE GREETING
   ============================================ */

console.log('%cWelcome to Menara International College Website', 'color: #3498db; font-size: 16px; font-weight: bold;');
console.log('%cVersion 1.0', 'color: #27ae60; font-size: 12px;');
