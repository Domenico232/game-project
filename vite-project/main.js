import * as THREE from 'three';
import Character from './public/characters/Character.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';


// Creazione della scena

const scene = new THREE.Scene();
const character = new Character()
character.loadCharacter(scene,"sorceress")

// Creazione della fotocamera laterale
const camera = new THREE.OrthographicCamera(-10, 10, 5, -5, 1, 1000);
camera.position.set(0, 4, 10);
camera.lookAt(0, 3, 0);

// Creazione del renderer

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Aggiunta di un piano orizzontale per rappresentare il pavimento
const planeGeometry =new THREE.PlaneGeometry(30, 50);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -Math.PI / 2; // Rotazione per renderizzare il piano orizzontale
plane.position.y = -1; // Posizione del piano sotto la telecamera
plane.position.z = 10; // Posizione del tempo del sotto la telecamera
scene.add(plane);

// Aggiunta di uno sfondo alla scena utilizzando una texture
const loader = new THREE.TextureLoader();
const backgroundTexture = loader.load('./public/d049d14e4bc63bb177e5afeacb9301fe.jpg');
scene.background = backgroundTexture;

// Aggiunta di una luce ambientale per illuminare la scena
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 0, 0); // Imposta la posizione della luce puntiforme
scene.add(pointLight);


// Creazione del PointLightHelper per visualizzare la posizione della luce puntiforme
const lightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(lightHelper);

// Aggiunta di una luce direzionale per illuminare la scena in modo più realistico
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);
// Funzione per animare la scena
function animate() {
    requestAnimationFrame(animate);
    //if (Math.floor((character.getMesh().position.x) * 10) % 10 == 9){
    //  character.getMesh().position.x = 0;
    //}
    character.reduceMeshAnimation();
    // Aggiorna qui gli oggetti animati, se necessario

    renderer.render(scene, camera);
}

// Avvia l'animazione
animate();


