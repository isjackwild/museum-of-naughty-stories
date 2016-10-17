const THREE = require('three');
require('./vendor/TrackballControls.js');
// require('./vendor/OrbitControls.js');
// require('./vendor/DeviceOrientationControls.js');
require('./vendor/controls/MouseControls.js');
import { WORLD_DIMENTIONS } from './constants';

export let camera, controls;



export const init = () => {
	camera = new THREE.PerspectiveCamera(60, window.app.width / window.app.height, 1, 10000);
	camera.position.set(WORLD_DIMENTIONS.x / 2 -150, 0, 0);
	controls = new THREE.TrackballControls(camera, document.getElementsByClassName('canvas')[0]);
	controls.target.copy(
		new THREE.Vector3((WORLD_DIMENTIONS.x / 2), 0, 0)
	);

	setTimeout(() => {
	}, 0);
	// window.addEventListener('deviceorientation', setOrientationControls, true);
}

// const setOrientationControls = (e) => {
// 	window.removeEventListener('deviceorientation', setOrientationControls, true);
// 	if (!e.alpha) return;
// 	controls = new THREE.DeviceOrientationControls(camera, true);
// 	controls.connect();
// 	controls.update();
// }
// 

  