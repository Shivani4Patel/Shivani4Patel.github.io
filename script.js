// 3D tilt effect on each card
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse X inside card
    const y = e.clientY - rect.top;  // mouse Y inside card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation, max 15deg
    const rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * 15;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    card.style.transition = 'transform 0.5s ease';
  });

  card.addEventListener('mousedown', () => {
    card.style.transform += ' scale(0.95)';
  });

  card.addEventListener('mouseup', () => {
    card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
  });
});

// Scroll fade-in animation
const sections = document.querySelectorAll('.section');

function revealOnScroll() {
  const triggerPoint = window.innerHeight * 0.85;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < triggerPoint) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
      section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    } else {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  sections.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(30px)';
  });
  revealOnScroll();
});
