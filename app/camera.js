const THREE = require('three');
require('./vendor/TrackballControls.js');
// require('./vendor/OrbitControls.js');
require('./vendor/DeviceOrientationControls.js');
require('./vendor/controls/MouseControls.js');
const TweenLite = require('gsap');
import PubSub from 'pubsub-js';
import { WORLD_DIMENTIONS } from './constants';

export let camera, controls;



export const init = () => {
	camera = new THREE.PerspectiveCamera(60, window.app.width / window.app.height, 1, 10000);
	camera.position.set(WORLD_DIMENTIONS.x / 2 -150, -30, 0);
	controls = new THREE.TrackballControls(camera, document.getElementsByClassName('canvas')[0]);

	window.addEventListener('deviceorientation', setOrientationControls, true);
	PubSub.subscribe('camera.moveTo', moveTo)
}

const moveTo = (e, object) => {
	const dir = object.getWorldDirection();
	const inFront = new THREE.Vector3().copy(object.position).add(dir.multiplyScalar(80));

	TweenLite.to(camera.position, 1.2, {x: inFront.x, y: inFront.y, z: inFront.z });
	TweenLite.to(controls.target, 1.2, {x: object.position.x, y: object.position.y, z: object.position.z });
}


const setOrientationControls = (e) => {
	window.removeEventListener('deviceorientation', setOrientationControls, true);
	if (!e.alpha) return;
	controls = new THREE.DeviceOrientationControls(camera, true);
	controls.connect();
	controls.update();
}


  