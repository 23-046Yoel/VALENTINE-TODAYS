const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const buttonGroup = document.getElementById('button-group');
const successMessage = document.getElementById('success-message');
const question = document.getElementById('question');
const subText = document.getElementById('sub-text');

// Init Particles
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(particle);
    }
}

initParticles();

// No button starts next to YES — drifts nearby slowly when cursor approaches
let rotationAngle = 0;
let hasMoved = false;

const moveButton = () => {
    const card = document.querySelector('.card');
    const cardRect = card.getBoundingClientRect();

    if (!hasMoved) {
        // First time: switch to fixed, set to current visual position
        const btnRect = noBtn.getBoundingClientRect();
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${btnRect.left}px`;
        noBtn.style.top = `${btnRect.top}px`;
        noBtn.style.zIndex = '9999';
        hasMoved = true;
    }

    const currentLeft = parseFloat(noBtn.style.left) || 0;
    const currentTop = parseFloat(noBtn.style.top) || 0;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Move nearby — within 100-200px of current position, but stay around the card area
    const offsetX = (Math.random() - 0.5) * 300;
    const offsetY = (Math.random() - 0.5) * 300;

    // Clamp to stay visible on screen and near the card
    const minX = Math.max(0, cardRect.left - 150);
    const maxX = Math.min(window.innerWidth - btnWidth, cardRect.right + 150);
    const minY = Math.max(0, cardRect.top - 150);
    const maxY = Math.min(window.innerHeight - btnHeight, cardRect.bottom + 150);

    let newX = Math.max(minX, Math.min(maxX, currentLeft + offsetX));
    let newY = Math.max(minY, Math.min(maxY, currentTop + offsetY));

    // Gentle continuous spin
    rotationAngle += 45 + Math.random() * 90;

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.transform = `rotate(${rotationAngle}deg)`;
};

// Fly away when cursor hovers over it
noBtn.addEventListener('mouseover', moveButton);

// Block click completely — drift away again
noBtn.addEventListener('mousedown', (e) => { e.preventDefault(); e.stopPropagation(); moveButton(); });
noBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); moveButton(); });

yesBtn.addEventListener('click', () => {
    question.classList.add('hidden');
    subText.classList.add('hidden');
    buttonGroup.classList.add('hidden');

    successMessage.classList.remove('hidden');

    // Confetti
    for (let i = 0; i < 100; i++) {
        createHeart();
    }
});

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '-20px';
    heart.style.fontSize = (Math.random() * 30 + 10) + 'px';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';

    document.body.appendChild(heart);

    heart.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'ease-in-out'
    }).onfinish = () => heart.remove();
}
