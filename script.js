// Dark / Light Mode Toggle
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

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Fetch GitHub Repos Dynamically
const reposContainer = document.getElementById('repos');
const username = 'Shivani4Patel';

async function fetchRepos() {
  reposContainer.innerHTML = '<p>Loading projects...</p>';
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);
    if (!res.ok) throw new Error('GitHub API Error');
    const repos = await res.json();

    if (repos.length === 0) {
      reposContainer.innerHTML = '<p>No public repositories found.</p>';
      return;
    }

    reposContainer.innerHTML = '';
    repos.forEach(repo => {
      const repoEl = document.createElement('div');
      repoEl.className = 'repo-card';
      repoEl.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : 'No description provided.'}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repo →</a>
      `;
      reposContainer.appendChild(repoEl);
    });
  } catch (err) {
    reposContainer.innerHTML = `<p>Error loading projects: ${err.message}</p>`;
  }
}

fetchRepos();

// Background Ambient Audio with Controls
const audioToggleBtn = document.getElementById('audio-toggle');
const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/26/audio_3f3b58b4a8.mp3?filename=ambient-electronic-loop-11023.mp3');
audio.loop = true;
audio.volume = 0.12;
let audioPlaying = false;

audioToggleBtn.addEventListener('click', () => {
  if (audioPlaying) {
    audio.pause();
    audioToggleBtn.textContent = '🔈';
  } else {
    audio.play();
    audioToggleBtn.textContent = '🔊';
  }
  audioPlaying = !audioPlaying;
});

// Three.js 3D rotating cloud animation

const container = document.getElementById('threejs-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 60;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Simple cloud geometry with spheres
const cloudGroup = new THREE.Group();

function createCloudPart(x, y, z, size) {
  const geom = new THREE.SphereGeometry(size, 32, 32);
  const mat = new THREE.MeshStandardMaterial({ color: 0xff6f61, roughness: 0.7, metalness: 0.1 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.set(x, y, z);
  return mesh;
}

cloudGroup.add(createCloudPart(-10, 0, 0, 8));
cloudGroup.add(createCloudPart(-3, 3, 1, 6));
cloudGroup.add(createCloudPart(4, 0, -1, 7));
cloudGroup.add(createCloudPart(10, 2, 2, 5));

scene.add(cloudGroup);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xff6f61, 1);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

function animate() {
  requestAnimationFrame(animate);
  cloudGroup.rotation.y += 0.005;
  cloudGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
  renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener('resize', () => {
  const w = container.clientWidth;
  const h = container.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});
