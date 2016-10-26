const THREE = require('three');
import { GAIN, WORLD_DIMENTIONS } from './constants.js';

const INNER_ANGLE = 0;
const OUTER_ANGLE = 65;
const OUTER_GAIN = 0.001;
const ROLLOFF = 10;
const REF_DIST = WORLD_DIMENTIONS.y / 2;
const DIST_MODEL = 'exponential';
let isUnlocked = false;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new window.AudioContext();
context.listener.setPosition(0, 0, 0);

const globalGainNode = context.createGain();
globalGainNode.gain.value = GAIN;
globalGainNode.connect(context.destination);

const unlockAudio = () => {
	window.removeEventListener('touchstart', unlockAudio);
	const buffer = context.createBuffer(1, 1, 22050);
	const source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.noteOn(0);

	setTimeout(() => {
		if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
			isUnlocked = true;
		}
	}, 0);
}
window.addEventListener('touchstart', unlockAudio);

export const decode = (response, onSuccess, onError) => {
	context.decodeAudioData(response, onSuccess, onError);
}

export const positionListener = (position, orientation) => {
	context.listener.setPosition(position.x, position.y, position.z);
	const front = orientation;
	const up = new THREE.Vector3().copy(front).applyAxisAngle(
			new THREE.Vector3(1, 0, 1),
			Math.PI / 4
		);
	context.listener.setOrientation(front.x, front.y, front.z, up.x, up.y, up.z);
}

export const AudioScene = () => {
	const sceneGainNode = context.createGain();

	sceneGainNode.gain.value = GAIN;
	sceneGainNode.connect(globalGainNode);
	

	const createPanner = (buffer) => {
		const panner = context.createPanner();
		panner.coneOuterGain = OUTER_GAIN;
		panner.coneOuterAngle = OUTER_ANGLE;
		panner.coneInnerAngle = INNER_ANGLE;
		panner.rollofFactor = ROLLOFF;
		panner.refDistance = REF_DIST;
		panner.distanceModel = DIST_MODEL;

		const gainNode = context.createGain();
		gainNode.gain.value = 1;
		panner.connect(gainNode);
		gainNode.connect(globalGainNode);


		const source = context.createBufferSource();
		source.buffer = buffer;
		source.loop = true;
		source.connect(panner);

		return { source, panner, gainNode };
	}

	return { createPanner }
}