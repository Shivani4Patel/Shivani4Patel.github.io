// === Background 3D Clouds ===
const canvas = document.getElementById('bgCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer.setSize(window.innerWidth, window.innerHeight);

const cloudTexture = new THREE.TextureLoader().load('https://i.ibb.co/2NvmbVN/cloud.png');
const cloudGeometry = new THREE.PlaneGeometry(5, 5);
const clouds = [];

for (let i = 0; i < 20; i++) {
  const cloudMaterial = new THREE.MeshBasicMaterial({ map: cloudTexture, transparent: true });
  const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
  cloud.position.set(Math.random() * 50 - 25, Math.random() * 50 - 25, Math.random() * -50);
  scene.add(cloud);
  clouds.push(cloud);
}

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  clouds.forEach(cloud => {
    cloud.rotation.z += 0.001;
    cloud.position.x += 0.01;
    if (cloud.position.x > 25) cloud.position.x = -25;
  });
  renderer.render(scene, camera);
}
animate();

// === AOS for animation ===
AOS.init();

// === Toggle Dark/Light Mode ===
document.getElementById('toggleMode').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// === Toggle Background Music ===
const bgAudio = document.getElementById('bgAudio');
document.getElementById('audioToggle').addEventListener('click', () => {
  if (bgAudio.paused) {
    bgAudio.play();
  } else {
    bgAudio.pause();
  }
});

// === GitHub Repo Loader ===
async function loadRepos() {
  const res = await fetch('https://api.github.com/users/Shivani4Patel/repos');
  const repos = await res.json();
  const container = document.getElementById('repos');
  container.innerHTML = '';
  repos.forEach(repo => {
    const a = document.createElement('a');
    a.href = repo.html_url;
    a.textContent = repo.name;
    a.target = '_blank';
    a.style.display = 'block';
    container.appendChild(a);
  });
}
loadRepos();
