import * as THREE from "three";

const scene = new THREE.Scene();
const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf);
scene.add(gridHelper);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 10;
camera.position.y = 2;

function moveCamera() {
  const top = document.body.getBoundingClientRect().top;
  camera.position.z = top * -0.1;
  camera.position.x = top * -0.002;
  camera.rotation.y = top * -0.0025;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
