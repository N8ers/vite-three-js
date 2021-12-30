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
camera.position.setX(-3);

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

// RANDOMLY GENERATE STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// BACKGROUND
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// VITE CUBE
const viteTexture = new THREE.TextureLoader().load("vite-img.svg");
const viteCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: viteTexture })
);
viteCube.position.set(-20, -5, -5);
scene.add(viteCube);

// MOON
const moonTexture = new THREE.TextureLoader().load("rock.jpg");
const normalMoonTexture = new THREE.TextureLoader().load("normalRock.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalMoonTexture,
  })
);
scene.add(moon);

moon.position.z = 30; // you can set position this way
moon.position.setX(-10); // or set it with the function

function moveCamera() {
  const top = document.body.getBoundingClientRect().top;
  // getBoundingClientRect will give us the dimentions of the view port
  // then .top, will show us how far we are from the top of the page

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.065;
  moon.rotation.z += 0.05;

  viteCube.rotation.y += 0.01;
  viteCube.rotation.x += 0.01;

  camera.position.z = top * -0.01;
  camera.position.x = top * -0.009;
  camera.position.y = top * -0.002;
}

// the event handler for scrolling
document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
