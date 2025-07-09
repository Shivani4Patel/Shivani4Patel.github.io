// Typed text animation for subtitle
const typedText = document.getElementById('typed-text');
const phrases = [
  "Cloud Engineer",
  "Tech Support Specialist",
  "DevOps Enthusiast",
  "Full Stack Developer",
  "Cybersecurity Advocate",
];
let currentPhrase = 0;
let letterIndex = 0;
let deleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let delayBetween = 2000;

function type() {
  const current = phrases[currentPhrase];
  if (!deleting) {
    typedText.textContent = current.substring(0, letterIndex + 1);
    letterIndex++;
    if (letterIndex === current.length) {
      deleting = true;
      setTimeout(type, delayBetween);
      return;
    }
  } else {
    typedText.textContent = current.substring(0, letterIndex - 1);
    letterIndex--;
    if (letterIndex === 0) {
      deleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? deletingSpeed : typingSpeed);
}
type();


// 3D tilt effect on experience cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    card.style.transition = 'transform 0.6s ease';
  });

  card.addEventListener('mousedown', () => {
    card.style.transform += ' scale(0.96)';
  });

  card.addEventListener('mouseup', () => {
    card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
  });
});

// Scroll fade-in for sections
const sections = document.querySelectorAll('.section');

function revealOnScroll() {
  const triggerPoint = window.innerHeight * 0.85;
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < triggerPoint) {
      section.classList.add('visible');
    } else {
      section.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  revealOnScroll();
});
