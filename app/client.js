const THREE = require('three');
const dat = require('dat-gui');
require('./vendor/modernizr-custom.js');

import { init as initLoop, renderer } from './loop.js';
import { init as initScene } from './scene.js';
import { init as initCamera} from './camera.js';
import { camera } from './camera.js';
import { startIntro } from './intro.js';
import _ from 'lodash';
import PubSub from 'pubsub-js';

window.app = window.app || {};

const buttons = document.getElementsByClassName('button');
console.log(Modernizr, '<<<');
if (!Modernizr.deviceorientation || !Modernizr.devicemotion || !Modernizr.touchevents) {
	document.body.classList.add('unsupported');
	window.app.supported = false;
} else {
	window.app.supported = true;
}


const kickIt = () => {
	if (!window.app.supported) return;

	const loadingFrame = document.getElementsByClassName('content-frame--loading')[0].style.opacity = 1;

	window.app.orientation = window.innerWidth > window.innerHeight ? 'l' : 'p';

	if (window.location.search.indexOf('debug') > -1) window.app.debug = true;
	if (window.app.debug) window.app.gui = new dat.GUI();

	window.app.introFinished = false;
	window.app.introStarted = false;
	PubSub.subscribe('intro.complete', () => { window.app.introFinished = true });
	window.addEventListener('orientationchange', () => {
		window.app.orientation = window.innerWidth > window.innerHeight ? 'l' : 'p';
		if (!window.app.introStarted && window.app.orientation === 'l') {
			console.log('this happens');
			window.app.introStarted = true;
			startIntro();
		}
	});

	for (let i = 0; i < buttons.length; i++) {
		const button = buttons[i];
		button.addEventListener('touchstart', e => { e.target.classList.add('button--touched') });
		button.addEventListener('touchend', e => { e.target.classList.remove('button--touched') });
	}

	addEventListeners();
	onResize();
	initCamera();
	initScene();
	initLoop();
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