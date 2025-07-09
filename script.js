AOS.init();

// GitHub Projects API
const username = "Shivani4Patel";
const repoContainer = document.getElementById("repos");

fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {
    repoContainer.innerHTML = "";
    repos.slice(0, 6).forEach(repo => {
      const div = document.createElement("div");
      div.innerHTML = `<strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong> - ${repo.description || 'No description'}`;
      div.style.marginBottom = '0.5rem';
      repoContainer.appendChild(div);
    });
  })
  .catch(err => {
    repoContainer.innerHTML = "Failed to load projects.";
  });

// Dark/Light toggle
const toggleBtn = document.getElementById("toggleMode");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

// Background Audio
const audio = document.getElementById("bgAudio");
const audioToggle = document.getElementById("audioToggle");
audioToggle.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    audioToggle.textContent = "🔇";
  } else {
    audio.pause();
    audioToggle.textContent = "🎵";
  }
});

// 3D Background Clouds
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("bgCanvas").appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });

const clouds = [];
for (let i = 0; i < 50; i++) {
  const cloud = new THREE.Mesh(geometry, material);
  cloud.position.set(
    Math.random() * 20 - 10,
    Math.random() * 10 - 5,
    Math.random() * -20
  );
  scene.add(cloud);
  clouds.push(cloud);
}

camera.position.z = 5;
function animate() {
  requestAnimationFrame(animate);
  clouds.forEach(cloud => {
    cloud.rotation.x += 0.001;
    cloud.rotation.y += 0.001;
  });
  renderer.render(scene, camera);
}
animate();
