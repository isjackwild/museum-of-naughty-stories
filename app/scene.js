const THREE = require('three');
import PubSub from 'pubsub-js';

export let scene, audioScene, intersectableMeshes;
import { camera, controls } from './camera.js';
import { walls } from './room.js';
import { frames } from './frames.js';
import { lights, helpers as lightHelpers, init as initLights } from './lighting.js';
import { convertToRange } from './lib/maths.js';
import { update as updateRaycaster } from './raycaster.js';
import { AudioScene, positionListener } from './sound-handler.js';

let loops = 0;

export const init = () => {
	initLights();
	scene = new THREE.Scene();
	audioScene = AudioScene();
	scene.add(camera);

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
		console.log(frame);
		scene.add(frame.mesh);
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

	if (controls) controls.update(delta);
	loops++
}