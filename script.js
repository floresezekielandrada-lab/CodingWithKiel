// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active navigation link
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`.nav-link[href="#${id}"]`).classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});

// Scroll animations for elements
const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    scrollObserver.observe(section);
});

// Netflix Carousel Functionality
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentScroll = 0;
const scrollAmount = 128; // Item width (120px) + gap (8px)

prevBtn.addEventListener('click', () => {
    currentScroll -= scrollAmount;
    if (currentScroll < 0) {
        currentScroll = 0;
    }
    carousel.style.transform = `translateX(-${currentScroll}px)`;
});

nextBtn.addEventListener('click', () => {
    const maxScroll = carousel.scrollWidth - carousel.parentElement.clientWidth;
    currentScroll += scrollAmount;
    if (currentScroll > maxScroll) {
        currentScroll = maxScroll;
    }
    carousel.style.transform = `translateX(-${currentScroll}px)`;
});

// Parallax effect on scroll (subtle)
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            document.querySelectorAll('.hero-image').forEach(el => {
                el.style.transform = `translateY(${scrolled * 0.3}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});