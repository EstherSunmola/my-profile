
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    // Update active navigation link based on scroll position
    updateActiveNavLink();
});

scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 0;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Update Active Navigation Link on Scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .experience-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Carousel Functionality
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselIndicators = document.getElementById('carouselIndicators');
const slides = document.querySelectorAll('.carousel-slide');

let currentSlide = 0;
const totalSlides = slides.length;

// Create indicators
slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    carouselIndicators.appendChild(indicator);
});

const indicators = document.querySelectorAll('.indicator');

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-advance carousel every 5 seconds
let carouselInterval = setInterval(nextSlide, 5000);

// Pause auto-advance on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 5000);
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 5000);
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 5000);
    }
});

// Typing effect for hero tagline
const heroTagline = document.querySelector('.hero .tagline');
if (heroTagline) {
    const phrases = [
        "So, who am I?",
        "Here's a few things about me..."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            heroTagline.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            heroTagline.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    
    setTimeout(typeEffect, 1000);
}


const revealSections = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.15
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    revealObserver.observe(section);
});

// Count-up animation for numbers (if you want to add stats)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add hover effect to project cards for better interactivity
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Mobile menu toggle
let mobileToggleBtn = null;

const createMobileMenu = () => {
    // Remove existing toggle button if it exists
    if (mobileToggleBtn) {
        mobileToggleBtn.remove();
        mobileToggleBtn = null;
    }

    if (window.innerWidth <= 768) {
        const sideNav = document.querySelector('.side-nav');
        mobileToggleBtn = document.createElement('button');
        mobileToggleBtn.classList.add('mobile-menu-toggle');
        mobileToggleBtn.innerHTML = '<i class="uil uil-bars"></i>';
        
        mobileToggleBtn.addEventListener('click', () => {
            sideNav.classList.toggle('mobile-active');
            // Change icon when menu is open
            if (sideNav.classList.contains('mobile-active')) {
                mobileToggleBtn.innerHTML = '<i class="uil uil-times"></i>';
            } else {
                mobileToggleBtn.innerHTML = '<i class="uil uil-bars"></i>';
            }
        });
        
        document.body.appendChild(mobileToggleBtn);
        
        // Close menu 
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sideNav.classList.remove('mobile-active');
                    mobileToggleBtn.innerHTML = '<i class="uil uil-bars"></i>';
                }
            });
        });
    }
};

// Initialize on load
window.addEventListener('load', () => {
    updateActiveNavLink();
    createMobileMenu();
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        createMobileMenu();
    }, 250);
});