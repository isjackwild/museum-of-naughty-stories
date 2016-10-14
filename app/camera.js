const THREE = require('three');
require('./vendor/TrackballControls.js');
require('./vendor/OrbitControls.js');
require('./vendor/DeviceOrientationControls.js');
import { WORLD_DIMENTIONS } from './constants';

export let camera, controls;



export const init = () => {
	camera = new THREE.PerspectiveCamera(60, window.app.width / window.app.height, 1, 10000);
	controls = new THREE.OrbitControls(camera, document.getElementsByClassName('canvas')[0]);
	console.log(controls);
	camera.position.set(0, 600, 300);
	camera.lookAt(WORLD_DIMENTIONS.x / 2, WORLD_DIMENTIONS.y / 2, 0)
	// window.addEventListener('deviceorientation', setOrientationControls, true);
}

// const setOrientationControls = (e) => {
// 	window.removeEventListener('deviceorientation', setOrientationControls, true);
// 	if (!e.alpha) return;
// 	controls = new THREE.DeviceOrientationControls(camera, true);
// 	controls.connect();
// 	controls.update();
// }