const THREE = require('three');
import PubSub from 'pubsub-js';

export let scene, audioScene, intersectableMeshes;
import { camera, controls } from './camera.js';
import { walls } from './room.js';
import { Frame } from './frames.js';
import { lights, helpers as lightHelpers, init as initLights } from './lighting.js';
import { convertToRange } from './lib/maths.js';
import { update as updateRaycaster } from './raycaster.js';
import { AudioScene, positionListener } from './sound-handler.js';
import { WORLD_DIMENTIONS } from './constants';

let loops = 0;
let bbox = undefined;
const frames = [];
let move = false;

export const init = () => {
	initLights();
	scene = new THREE.Scene();
	audioScene = AudioScene();
	scene.add(camera);
	// window.addEventListener('keydown', onKeyDown, true);
	// window.addEventListener('keyup', onKeyUp, true);

	const frame = new Frame({
		position: new THREE.Vector3((WORLD_DIMENTIONS.x / 2) - 1, WORLD_DIMENTIONS.y / 24, 0),
		rotationY: Math.PI / -2,
		imageSrc: 'assets/maps/img-2.jpg',
		audioSrc: 'assets/sounds/0.mp3',
		audioScene,
	});
	frames.push(frame);

	lights.forEach((light) => {
		scene.add(light);
		if (light.target) scene.add(light.target);
	});

	lightHelpers.forEach((helper) => {
		scene.add(helper);
	});

	walls.forEach((wall) => {
		scene.add(wall);
	});

	frames.forEach((frame) => {
		scene.add(frame);

		camera.lookAt(frame.position);
		if (window.app.debug) {
			bbox = new THREE.BoundingBoxHelper(frame, 0x00ff00);
			scene.add(bbox);
		}
	});
}

export const update = (delta) => {
	const position = new THREE.Vector3().copy(camera.position);
	const direction = new THREE.Vector3().copy(camera.getWorldDirection());
	if (loops % 10 === 0) updateRaycaster(position, direction, intersectableMeshes);
	positionListener(position, direction);


	lightHelpers.forEach((helper) => {
		helper.update();
	});
	if (bbox) bbox.update();
	if (controls) controls.update(delta);
	loops++
}

// const onKeyDown = ({ keyCode }) => {
// 	switch(keyCode) {
// 		case 37:
// 			console.log('left');
// 			break;
// 		case 39:
// 			console.log('right');
// 			break;
// 		case 38:
// 			console.log('up');
// 			move = true;
// 			break;
// 		case 40:
// 			console.log('down');
// 			break;
// 	}
// }

// const onKeyUp = ({ keyCode }) => {
// 	switch(keyCode) {
// 		case 37:
// 			console.log('left');
// 			break;
// 		case 39:
// 			console.log('right');
// 			break;
// 		case 38:
// 			console.log('up');
// 			move = false;
// 			break;
// 		case 40:
// 			console.log('down');
// 			break;
// 	}
// }