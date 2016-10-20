const THREE = require('three');
const dat = require('dat-gui');

import { init as initLoop, renderer } from './loop.js';
import { init as initScene } from './scene.js';
import { init as initCamera} from './camera.js';
import { camera } from './camera.js';
import { startIntro } from './intro.js';
import _ from 'lodash';

window.app = window.app || {};

const kickIt = () => {
	if (window.location.search.indexOf('debug') > -1) window.app.debug = true;
	if (window.app.debug) window.app.gui = new dat.GUI();

	addEventListeners();
	onResize();
	initCamera();
	initScene();
	initLoop();
	startIntro();
}

const onResize = () => {
	console.log('on resize');
	window.app.width = window.innerWidth;
	window.app.height = window.innerHeight;

	if (renderer) renderer.setSize(window.app.width, window.app.height);
	if (camera) {
		camera.aspect = window.app.width / window.app.height;
		camera.updateProjectionMatrix();
	}
}

const addEventListeners = () => {
	window.addEventListener('resize', _.throttle(onResize, 16.666));
}


if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', kickIt);
} else {
	window.attachEvent('onload', kickIt);
}