import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// scene, camera, renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, // field of view (of 360 degs)
  window.innerWidth / window.innerHeight, // aspect ratio (browser window)
  0.1, // view frustum
  1000 // view frustum
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // full screen canvas

// default camera position is the middle of the screen, so we want to zoom out on the Z axis
camera.position.setZ(30);

renderer.render(scene, camera);

// SHAPES
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// LIGHTING
const pointLight = new THREE.PointLight(0xffffff); // white hex literal
pointLight.position.set(10, 10, 10); // sets lighting position
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// HELPERS
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
