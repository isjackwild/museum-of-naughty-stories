const THREE = require('three');
import { WORLD_DIMENTIONS } from './constants';
import { textureLoader } from './loader.js';
export const walls = [];
export const materials = [];
let geom;

const textures = {
	floor: {
		specularMap: textureLoader.load(`assets/maps/floor--specular.jpg`),
		bumpMap: textureLoader.load(`assets/maps/floor--bump.jpg`),
	},
	walls: {
		bumpMap: textureLoader.load(`assets/maps/walls--bump.jpg`),
	}
}

textures.walls.bumpMap.wrapS = THREE.RepeatWrapping;
textures.walls.bumpMap.wrapT = THREE.RepeatWrapping;
textures.floor.bumpMap.wrapS = THREE.RepeatWrapping;
textures.floor.bumpMap.wrapT = THREE.RepeatWrapping;


const wallsMaterial = new THREE.MeshStandardMaterial({
	color: 0xfffefc,
	bumpMap: textures.walls.bumpMap,
	bumpScale: 2,
	roughness: 0.8,
	metalness: 0,
});


// Front
geom = new THREE.PlaneGeometry(WORLD_DIMENTIONS.x, WORLD_DIMENTIONS.y);
walls[0] = new THREE.Mesh( geom, wallsMaterial );
walls[0].position.z = WORLD_DIMENTIONS.z / -2;
walls[0].receiveShadow = true;


// Back
geom = new THREE.PlaneGeometry(WORLD_DIMENTIONS.x, WORLD_DIMENTIONS.y);
walls[1] = new THREE.Mesh( geom, wallsMaterial );
walls[1].rotation.x = Math.PI;
walls[1].position.z = WORLD_DIMENTIONS.z / 2;
walls[1].receiveShadow = true;


// Left
geom = new THREE.PlaneGeometry(WORLD_DIMENTIONS.z, WORLD_DIMENTIONS.y);
walls[2] = new THREE.Mesh( geom, wallsMaterial );
walls[2].rotation.y = Math.PI / 2;
walls[2].position.x = WORLD_DIMENTIONS.x / -2;
walls[2].receiveShadow = true;


// Right
geom = new THREE.PlaneGeometry(WORLD_DIMENTIONS.z, WORLD_DIMENTIONS.y);
walls[3] = new THREE.Mesh( geom, wallsMaterial );
walls[3].rotation.y = Math.PI / -2;
walls[3].position.x = WORLD_DIMENTIONS.x / 2;
walls[3].receiveShadow = true;


// Top
geom = new THREE.PlaneGeometry(WORLD_DIMENTIONS.x, WORLD_DIMENTIONS.z);
walls[4] = new THREE.Mesh( geom, wallsMaterial );
walls[4].rotation.x = Math.PI / 2;
walls[4].position.y = WORLD_DIMENTIONS.y / 2;
walls[4].receiveShadow = true;

// Bottom
geom = new THREE.PlaneGeometry(WORLD_DIMENTIONS.x, WORLD_DIMENTIONS.z);
const floorMaterial = new THREE.MeshStandardMaterial({
	color: 0x222222,
	roughnessMap: textures.floor.specularMap,
	roughness: 0.22,
	bumpMap: textures.walls.bumpMap,
	bumpScale: 2,
	metalness: 0.03,
});
walls[5] = new THREE.Mesh( geom, floorMaterial );
walls[5].rotation.x = Math.PI / -2;
walls[5].position.y = WORLD_DIMENTIONS.y / -2;
walls[5].receiveShadow = true;



setTimeout(() => {
	if (window.app.debug) {
		const wallsFolder = window.app.gui.addFolder('Walls');
		wallsFolder.add(wallsMaterial, 'roughness');
		wallsFolder.add(wallsMaterial, 'metalness');

		const floorFolder = window.app.gui.addFolder('Floor');
		floorFolder.add(floorMaterial, 'roughness');
		floorFolder.add(floorMaterial, 'metalness');
	}
}, 0);