const THREE = require('three');
require('./vendor/TrackballControls.js');
require('./vendor/OrbitControls.js');
require('./vendor/DeviceOrientationControls.js');
require('./vendor/controls/MouseControls.js');
const TweenLite = require('gsap');
import PubSub from 'pubsub-js';
import { WORLD_DIMENTIONS, VIEW_DISTANCE } from './constants';

export let camera, controls;



export const init = () => {
	camera = new THREE.PerspectiveCamera(60, window.app.width / window.app.height, 1, 10000);
	camera.position.set(0.1, -30, 0);
	controls = new THREE.OrbitControls(camera, document.getElementsByClassName('canvas')[0]);

	window.addEventListener('deviceorientation', setOrientationControls, true);
	PubSub.subscribe('camera.moveTo', moveTo)
}

const moveTo = (e, {position, target}) => {
	TweenLite.to(camera.position, 1.6, {x: position.x, y: position.y, z: position.z, ease: Sine.EaseInOut });
	if (target) TweenLite.to(controls.target, 1.6, {x: target.x, y: target.y, z: target.z });
}


const setOrientationControls = (e) => {
	window.removeEventListener('deviceorientation', setOrientationControls, true);
	if (!e.alpha) return;
	controls = new THREE.DeviceOrientationControls(camera, true);
	controls.connect();
	controls.update();
}


  