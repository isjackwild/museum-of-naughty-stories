const THREE = require('three');
import PubSub from 'pubsub-js';
import { WORLD_DIMENTIONS, VIEW_DISTANCE, FRAME_COLOUR } from './constants';
import { decode } from './sound-handler.js';
import { JumpPoint } from './jump-point.js';
import { textureLoader, audioLoader } from './loader.js';

const WIDTH_WIDE = 180;
const WIDTH_TALL = 110;
const FRAME_WIDTH = 8;
const FRAME_DEPTH = 3;



export class Frame extends THREE.Object3D {
	constructor({ position, rotationY, imageSrc, audioSrc, audioScene }) {
		super();

		this.ready = false;
		this.aspectRatio = 0;
		this.rotation.y = rotationY;
		this.position.copy(position);
		this.castShadow = true;
		this.receiveShadow = true;
		this.audioScene = audioScene;
		this.audioSrc = audioSrc;
		this.imageSrc = imageSrc;
		this.jumpPoint = undefined;

		this.updateMatrixWorld();
		const dir = this.getWorldDirection();
		// const inFront = new THREE.Vector3().copy(this.position).add(dir.multiplyScalar(VIEW_DISTANCE));
		this.jumpPoint = new JumpPoint(position, dir, rotationY);

		this.loadImage();
		if (audioSrc) this.loadSound();
	}

	loadImage() {
		textureLoader.load(this.imageSrc, this.onLoadImage.bind(this));
	}

	onLoadImage(texture) {
		this.aspectRatio = texture.image.height / texture.image.width;
		const width = this.aspectRatio > 1 ? WIDTH_TALL : WIDTH_WIDE;
		const geom = new THREE.PlaneGeometry(width, width * this.aspectRatio);
		const material = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			roughness: 0.3,
			metalness: 0.06,
			map: texture,
		});

		this.photoMesh = new THREE.Mesh(geom, material);
		this.add(this.photoMesh);
		this.updateMatrixWorld();
		this.setupFrame();
	}

	loadSound() {
		// this.request = new XMLHttpRequest();
		// this.request.open('GET', this.audioSrc, true);
		// this.request.responseType = 'arraybuffer'
		// this.request.onload = this.onLoadSound.bind(this);
		// this.request.send();

		audioLoader.load(this.audioSrc, this.onDecodeSound.bind(this));
	}

	// onLoadSound(e) {
	// 	if (e.target.readyState === 4 && e.target.status === 200) {
	// 		decode(e.target.response, this.onDecodeSound.bind(this), this.onErrorDecodeSound);
	// 	} else if (e.target.readyState === 4) {
	// 		console.error('Error: Sound probably missing');
	// 	}
	// }

	onDecodeSound(buffer) {
		this.loudSpeaker = this.audioScene.createPanner(buffer);

		const dir = this.getWorldDirection();
		const position = new THREE.Vector3().copy(this.position).add(new THREE.Vector3().copy(dir).multiplyScalar(VIEW_DISTANCE));
		// const position = new THREE.Vector3().copy(this.position);

		this.loudSpeaker.panner.setPosition(position.x, WORLD_DIMENTIONS.y / 2, position.z);
		this.loudSpeaker.panner.setOrientation(0, -1, 0);
		this.loudSpeaker.source.start(0);

		if (window.app.debug) {
			const loudSpeakerLight = new THREE.SpotLight(0xff0000, 1);
			this.parent.add(loudSpeakerLight);
			this.parent.add(loudSpeakerLight.target);
			loudSpeakerLight.distance = 200;
			loudSpeakerLight.position.set(position.x, WORLD_DIMENTIONS.y / 2, position.z);
			const tmp = new THREE.Vector3(position.x, WORLD_DIMENTIONS.y / -2, position.z);
			loudSpeakerLight.target.position.copy(tmp);
			loudSpeakerLight.angle = this.loudSpeaker.panner.coneOuterAngle * 0.0174533 / 2;
			loudSpeakerLight.target.updateMatrixWorld();
			loudSpeakerLight.castShadow = false;


			const loudSpeakerHelper = new THREE.SpotLightHelper(loudSpeakerLight);
			this.parent.add(loudSpeakerHelper);
		}
	}

	onErrorDecodeSound(e) {
		console.error('Error decoding sound:', e);
	}

	setupFrame() {
		const material = new THREE.MeshStandardMaterial({
			color: FRAME_COLOUR,
			roughness: 0.0,
			metalness: 0,
		});
		this.frameMaterial = material;

		const width = this.aspectRatio > 1 ? WIDTH_TALL : WIDTH_WIDE;
		const height = width * this.aspectRatio;
		const horizontalGeom = new THREE.BoxGeometry(width, FRAME_WIDTH, FRAME_DEPTH);
		const verticalGeom = new THREE.BoxGeometry(FRAME_WIDTH, (FRAME_WIDTH * 2 + height), FRAME_DEPTH);

		const meshes = [];
		meshes[0] = new THREE.Mesh(horizontalGeom, material);
		meshes[0].position.set(0, height / 2 + FRAME_WIDTH / 2, FRAME_DEPTH / 2);
		meshes[1] = new THREE.Mesh(horizontalGeom, material);
		meshes[1].position.set(0, (height / 2 + FRAME_WIDTH / 2) * -1, FRAME_DEPTH / 2);
		meshes[2] = new THREE.Mesh(verticalGeom, material);
		meshes[2].position.set(width / 2 + FRAME_WIDTH / 2, 0, FRAME_DEPTH / 2);
		meshes[3] = new THREE.Mesh(verticalGeom, material);
		meshes[3].position.set((width / 2 + FRAME_WIDTH / 2) * -1, 0, FRAME_DEPTH / 2);

		meshes.forEach((mesh) => { this.add(mesh) });

		setTimeout(() => {
			this.ready = true;
		}, 0);
	}
}

