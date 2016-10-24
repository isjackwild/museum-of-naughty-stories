import PubSub from 'pubsub-js';
const TweenLite = require('gsap');
import { startIntro } from './intro.js';

const THREE = require('three');
const progressSpan = document.getElementsByClassName('progress')[0];
const loaderCover = document.getElementsByClassName('content-frame--loading')[0];

const onProgress = (url, loaded, total) => {
	const progress = `${Math.floor((loaded / total) * 100)}%`;
	progressSpan.innerHTML = progress;
}

const onLoad = () => {
	TweenLite.to(loaderCover, 0.4, { opacity: 0 });
	if (!window.app.introStarted && window.app.orientation === 'l') {
		window.app.introStarted = true;
		startIntro();
	}
}


const manager = new THREE.LoadingManager(onLoad, onProgress);


export const textureLoader = new THREE.TextureLoader(manager);
export const audioLoader = new THREE.AudioLoader(manager);