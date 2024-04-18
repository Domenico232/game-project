import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import Character from '../Character';

export default class Sorceress extends Character{
    constructor(mesh) {
        this.mesh=mesh;
    }
}

// Funzione per animare la scena