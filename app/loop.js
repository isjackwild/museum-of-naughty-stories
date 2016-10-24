const THREE = require('three');
require('./vendor/StereoEffect.js');
require('./vendor/postprocessing/EffectComposer.js');
require('./vendor/postprocessing/RenderPass.js');
require('./vendor/postprocessing/ShaderPass.js');
require('./vendor/shaders/HorizontalBlurShader.js');
require('./vendor/shaders/VerticalBlurShader.js');
require('./vendor/shaders/CopyShader.js');
import { init as initScene, scene, update as updateScene } from './scene.js';
import { init as initCamera, camera } from './camera.js';


let canvas;
let raf, then, now, delta;
let currentCamera, currentScene;
export let renderer, stereoFx, composer, hblur, vblur;

export const init = () => {
	canvas = document.getElementsByClassName('canvas')[0];
	setupRenderer();
	currentCamera = camera;
	currentScene = scene;
	now = new Date().getTime();
	animate();
}

export const kill = () => {
	cancelAnimationFrame(raf);
}

const setupRenderer = () => {
	renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
	});

	renderer.setClearColor(0x282828);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	// composer = new THREE.EffectComposer(renderer);
	// composer.addPass( new THREE.RenderPass(scene, camera));

	// hblur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
	// composer.addPass(hblur);

	// vblur = new THREE.ShaderPass( THREE.VerticalBlurShader );
	// vblur.renderToScreen = true;
	// console.log(vblur);
	// composer.addPass(vblur);


	// renderer.shadowMap.enabled = true;
	// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	// renderer.shadowCameraNear = 1;
	// renderer.shadowCameraFar = camera.far;
	// renderer.shadowCameraFov = camera.fov;

	// renderer.shadowMapBias = 0.0039;
	// renderer.shadowMapDarkness = 0.5;
	// renderer.shadowMapWidth = 1024;
	// renderer.shadowMapHeight = 1024;
	stereoFx = new THREE.StereoEffect(renderer);
}

const update = (delta) => {
	updateScene(delta);
}

const render = () => {
	// composer.render();
	if (window.location.search.indexOf('vr') > -1) {
		stereoFx.render(currentScene, currentCamera);
	} else {
		renderer.render(currentScene, currentCamera);
	}
}

const animate = () => {
	then = now ? now : null;
	now = new Date().getTime();
	delta = then ? (now - then) / 16.666 : 1;
	update(delta);
	render();
	raf = requestAnimationFrame(animate);
}
