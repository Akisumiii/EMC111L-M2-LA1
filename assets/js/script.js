// === Scene Setup ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x13141A);
const camera = new THREE.OrthographicCamera(
  -400, 400, 400, -400, 0.1, 1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

// Declaring the Plane here
const geometry = new THREE.PlaneGeometry(125, 75);
let material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
const planeObject = new THREE.Mesh(geometry, material);
scene.add(planeObject);

// Plane Related Datas
let velocity = new THREE.Vector2(1, 0.5);
let bounceCount = 0;

function animate() {
  requestAnimationFrame(animate);

  planeObject.position.x += velocity.x;
  planeObject.position.y += velocity.y;

  if (planeObject.position.x + planeObject.scale.x * 50 > 400 || 
      planeObject.position.x - planeObject.scale.x * 50 < -400) {
    velocity.x *= -1;
    handleBounce();
  }

  if (planeObject.position.y + planeObject.scale.y * 25 > 400 || 
      planeObject.position.y - planeObject.scale.y * 25 < -400) {
    velocity.y *= -1;
    handleBounce();
  }

  renderer.render(scene, camera);
}

animate();


function handleBounce() {
  bounceCount++;

  planeObject.material.color.set(getRandomColor());

  planeObject.scale.multiplyScalar(0.65);

  if (bounceCount >= 7) {
    planeObject.visible = false;
  }
}

function getRandomColor() {
  return new THREE.Color(Math.random(), Math.random(), Math.random());
}
