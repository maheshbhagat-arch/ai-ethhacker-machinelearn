const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let columns;
const fontSize = 16;
const drops = [];

// Matrix Characters (Binary + Legal Symbols)
const chars = "010101§¶©®™010101ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charArray = chars.split('');

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    columns = canvas.width / fontSize;
    drops.length = 0; // Clear existing drops

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
}

function draw() {
    // Semi-transparent black to create trail effect
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0aefff'; // Cyan text
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Randomly reset drop to top
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Initial setup
resize();
window.addEventListener('resize', resize);
const interval = setInterval(draw, 33);

// Navigation Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

if (links) {
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Glitch Text Effect On Hover (optional enhancement)
const glitchText = document.querySelector('.glitch');

if (glitchText) {
    glitchText.addEventListener('mouseover', () => {
        glitchText.setAttribute('data-text', glitchText.innerText);
    });
}

// Smooth Scroll for Anchor Links (Native usually works, but just in case)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission (Mock)
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Transmitting...';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.innerText = 'Transmission Received';
            btn.style.background = '#0aff00'; // Green
            btn.style.color = '#000';
            form.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
}

// Rating Logic
const stars = document.querySelectorAll('.stars i');
const ratingText = document.querySelector('.rating-text');

if (stars.length > 0) {
    stars.forEach(star => {
        // Hover effect
        star.addEventListener('mouseover', function () {
            const value = this.getAttribute('data-value');
            highlightStars(value);
        });

        // Remove hover effect
        star.addEventListener('mouseout', function () {
            const currentRating = document.querySelector('.stars').getAttribute('data-rating');
            highlightStars(currentRating);
        });

        // Click to rate
        star.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            document.querySelector('.stars').setAttribute('data-rating', value);
            highlightStars(value);

            // Text feedback
            if (value <= 2) ratingText.innerText = "Thanks for the feedback!";
            else if (value <= 4) ratingText.innerText = "Glad you liked it!";
            else ratingText.innerText = "Awesome! Thanks for rating.";

            // Optional: Send data to server here
        });
    });
}

function highlightStars(value) {
    stars.forEach(s => {
        if (s.getAttribute('data-value') <= value) {
            s.classList.add('hovered');
            s.classList.remove('fa-regular');
            s.classList.add('fa-solid'); // Solid star
        } else {
            s.classList.remove('hovered');
            s.classList.remove('fa-solid');
            s.classList.add('fa-regular'); // Outline star
        }
    });
}
