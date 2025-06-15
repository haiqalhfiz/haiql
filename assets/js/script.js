// Date Display
function updateDateTime() {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    dateElement.textContent = now.toLocaleString('en-US', options);
}
updateDateTime();
setInterval(updateDateTime, 1000);

// Audio Toggle
const audio = document.getElementById('background-audio');
const audioButton = document.getElementById('audio-button');
let isPlaying = false;

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        audioButton.textContent = '▶';
        isPlaying = false;
    } else {
        audio.play().catch(e => console.error('Audio play failed:', e));
        audioButton.textContent = '⏸';
        isPlaying = true;
    }
}

// Welcome Button Functionality
function openPortfolio() {
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const nav = document.getElementById('nav');
    const container = document.getElementById('container');
    const marquee = document.getElementById('marquee');
    const footer = document.getElementById('footer');

    // Hide welcome overlay
    welcomeOverlay.classList.add('hidden');

    // Show navigation, container, marquee, and footer
    nav.classList.add('active');
    container.classList.add('active');
    marquee.classList.add('active');
    footer.classList.add('active');

    // Play audio
    audio.play().catch(e => console.error('Audio play failed:', e));
    audioButton.textContent = '⏸';
    isPlaying = true;

    // Trigger animations for sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animation = 'none'; // Reset animation
        section.offsetHeight; // Trigger reflow
        section.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.2}s`;
    });
}

// Lightbox for Images
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

// Scroll Spy for Navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typewriter Effect
const typewriterText = " Dynamic Leader | Innovator | Community Builder";
let i = 0;
const typewriterElement = document.getElementById('typewriter');
typewriterElement.style.overflow = 'hidden';
typewriterElement.style.whiteSpace = 'nowrap';
typewriterElement.style.borderRight = '2px solid white';
typewriterElement.style.animation = 'blink-caret 0.75s step-end infinite';

function typeWriter() {
    if (i < typewriterText.length) {
        typewriterElement.textContent += typewriterText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    } else {
        typewriterElement.style.borderRight = 'none';
    }
}
setTimeout(typeWriter, 1000);

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img.lazy');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => observer.observe(img));
});

// Scroll to Top
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function downloadResume() {
    window.open('assets/pdf/Muhammad_Haiqal_Hafiz_Resume.pdf', '_blank');
}

// Search Functionality
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function () {
    const filter = this.value.toLowerCase();
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.textContent.toLowerCase().includes(filter)) {
            section.style.display = '';
        } else {
            section.style.display = 'none';
        }
    });
});