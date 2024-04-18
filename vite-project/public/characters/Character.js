import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export default class Character {
    constructor() {
        this.mesh = null;
        this.textures = [];
    }

    createMesh(character, callback) {
        const fbxLoader = new FBXLoader();
        fbxLoader.load(
            '../characters/'+character+'/source/source.fbx',
            (fbx) => {
                const scaleFactor = 0.03; // Modifica il valore secondo le tue esigenze
                fbx.scale.set(scaleFactor, scaleFactor, scaleFactor);

                // Aggiungi le texture al materiale del modello
                this.addTextures(fbx);

                this.setMesh(fbx, character); // Utilizza "this" per riferirti al metodo della classe
                if (callback) {
                    callback();
                }
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('Error loading FBX model:', error);
            }
        );
    }

    addTextures(model, character) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('../characters/'+character+'/textures/texture.png');
        
        // Imposta la texture sul materiale del modello
        model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.map = texture;
                child.material.needsUpdate = true;
            }
        });

        // Aggiungi la texture alla lista delle textures
        this.textures.push(texture);
    }

    loadCharacter(scene, character) {
        console.log("Loading character: " + character);
        console.log("Scene provided:", scene);
    
        // Creazione del personaggio
        this.createMesh(character, () => {
            console.log("Character loaded:", this.mesh);
    
            // Assicurati che il modello sia stato correttamente inizializzato
            if (this.mesh) {
                // Aggiungi il modello alla scena
                scene.add(this.mesh);
                console.log("Character added to scene:", this.mesh);
                // Avvia l'animazione
            } else {
                console.error('Error: Character model not initialized.');
            }
        });
    }

    reduceMeshAnimation(){
        this.mesh.rotation.y += 0.01;
    }
    
    reduceMeshSize() {
        if (this.mesh) {
            // Imposta il fattore di scala per ridurre le dimensioni della mesh
            const scaleFactor = 0.3; // Modifica il valore secondo le tue esigenze
            this.mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
        } else {
            console.error('Character mesh not found.');
        }
    }
    // Altri metodi per controllare il personaggio, animarlo, ecc.
    setMesh(mesh) {
        this.mesh = mesh;
    }
    getMesh(){
    return this.mesh;
    }
}