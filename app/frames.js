const THREE = require('three');
export const frames = [];
import { WORLD_DIMENTIONS } from './constants';

const WIDTH = 220;

export const Frame = ({ position, photoTexture, rotationY }) => {
	console.log(photoTexture)
	const aspectRatio = 925 / 750;
	const geom = new THREE.PlaneGeometry(WIDTH, WIDTH * aspectRatio);
	const material = new THREE.MeshStandardMaterial({
		color: 0xffffff,
		roughness: 0.25,
		metalness: 0.05,
		map: photoTexture,
	});
	const mesh = new THREE.Mesh(geom, material);
	mesh.rotation.y = rotationY;
	mesh.position.copy(position);
	mesh.castShadow = true;
	mesh.receiveShadow = true;

	return {
		mesh,
	}
}

const loader = new THREE.TextureLoader();

const frame = Frame({
	position: new THREE.Vector3((WORLD_DIMENTIONS.x / 2) - 1, WORLD_DIMENTIONS.y / 24, 0),
	// position: new THREE.Vector3(0, 0, 0),
	rotationY: Math.PI / -2,
	photoTexture: loader.load(`assets/maps/image-1.jpg`),
});
frames.push(frame);

