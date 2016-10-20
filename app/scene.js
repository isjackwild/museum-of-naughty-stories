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
import { WORLD_DIMENTIONS, FRAMES_DATA } from './constants';

let loops = 0;
let bbox = undefined;
let move = false;
const frames = [];
const jumpPoints = [];




export const init = () => {
	scene = new THREE.Scene();
	audioScene = AudioScene();
	scene.add(camera);
	
	FRAMES_DATA.forEach((frame) => {
		frames.push(
			new Frame({
				...frame,
				position: new THREE.Vector3(frame.x, frame.y, frame.z),
				audioScene,
			})
		)
	});

	initLights(frames);

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
		scene.add(frame.jumpPoint);
		if (window.app.debug) {
			bbox = new THREE.BoundingBoxHelper(frame, 0x00ff00);
			scene.add(bbox);
		}
		controls.target.copy(frame.position);
		jumpPoints.push(frame.jumpPoint);
	});
}

export const update = (delta) => {
	const position = new THREE.Vector3().copy(camera.position);
	const direction = new THREE.Vector3().copy(camera.getWorldDirection());
	if (loops % 10 === 0) updateRaycaster(position, direction, jumpPoints);
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