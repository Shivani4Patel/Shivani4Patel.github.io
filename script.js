// =============== Dark Mode Toggle ===============
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    themeToggleBtn.textContent = '☀️';
  } else {
    body.classList.remove('dark');
    themeToggleBtn.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}

themeToggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// =============== Scroll Fade-In Animation ===============
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.3
  }
);

fadeElements.forEach(el => observer.observe(el));

// =============== Fetch GitHub Repos ===============
const reposContainer = document.getElementById('repos');
const githubUser = 'Shivani4Patel';

async function fetchRepos() {
  reposContainer.innerHTML = '<p>Loading projects...</p>';
  try {
    const res = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=10`);
    if(!res.ok) throw new Error('Failed to fetch repos');
    const repos = await res.json();

    if(repos.length === 0) {
      reposContainer.innerHTML = '<p>No public repositories found.</p>';
      return;
    }

    reposContainer.innerHTML = '';
    repos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'repo-card';
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description provided.'}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
      `;
      reposContainer.appendChild(card);
    });
  } catch (err) {
    reposContainer.innerHTML = `<p class="error">Error loading repos: ${err.message}</p>`;
  }
}
fetchRepos();

// =============== THREE.js 3D Animated Clouds Background ===============

const canvas = document.getElementById('bg');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // transparent bg

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 30;

// Ambient lights to highlight clouds
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xff6f61, 1);
pointLight.position.set(10, 20, 10);
scene.add(pointLight);

// Generate many semi-transparent spheres to simulate volumetric clouds

const cloudGroup = new THREE.Group();

function createCloud() {
  const cloud = new THREE.Group();

  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xff6f61,
    roughness: 0.8,
    metalness: 0.1,
    transparent: true,
    opacity: 0.25,
  });

  for(let i = 0; i < 15; i++) {
    const sphereGeo = new THREE.SphereGeometry(3 + Math.random() * 2, 32, 32);
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);

    sphere.position.set(
      Math.random() * 8 - 4,
      Math.random() * 3 - 1.5,
      Math.random() * 5 - 2.5,
    );

    cloud.add(sphere);
  }

  cloud.position.set(
    Math.random() * 60 - 30,
    Math.random() * 20 - 10,
    Math.random() * -10,
  );

  cloud.rotationSpeed = 0.001 + Math.random() * 0.002;
  return cloud;
}

// Create 10 clouds
for(let i=0; i < 10; i++) {
  const c = createCloud();
  cloudGroup.add(c);
}

scene.add(cloudGroup);

// Animate clouds drifting slowly with rotation
function animate() {
  requestAnimationFrame(animate);
  cloudGroup.children.forEach(cloud => {
    cloud.rotation.y += cloud.rotationSpeed;
    cloud.position.x += 0.01;
    if(cloud.position.x > 35) cloud.position.x = -35;
  });
  renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.inner
