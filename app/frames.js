const THREE = require('three');
import { WORLD_DIMENTIONS } from './constants';
import { decode } from './sound-handler.js';

const WIDTH = 220;

// export const _Frame = ({ position, photoTexture, rotationY }) => {
// 	const aspectRatio = 1;
// 	const geom = new THREE.PlaneGeometry(WIDTH, WIDTH * aspectRatio);
// 	const material = new THREE.MeshStandardMaterial({
// 		color: 0xffffff,
// 		roughness: 0.25,
// 		metalness: 0.05,
// 		map: photoTexture,
// 	});
// 	const mesh = new THREE.Mesh(geom, material);
// 	mesh.rotation.y = rotationY;
// 	mesh.position.copy(position);
// 	mesh.castShadow = true;
// 	mesh.receiveShadow = true;

// 	return {
// 		mesh,
// 	}
// }

export class Frame extends THREE.Object3D {
	constructor({ position, rotationY, imageSrc, audioSrc, audioScene }) {
		super();
		this.aspectRatio = 0;


		this.rotation.y = rotationY;
		this.position.copy(position);
		this.castShadow = true;
		this.receiveShadow = true;
		this.audioScene = audioScene;
		this.audioSrc = audioSrc;
		this.imageSrc = imageSrc;
	
		this.loadImage();
		// this.loadSound();
	}

	loadImage() {
		const loader = new THREE.TextureLoader();
		loader.load(this.imageSrc, this.onLoadImage.bind(this));
	}

	onLoadImage(texture) {
		this.aspectRatio = texture.image.height / texture.image.width;
		const geom = new THREE.PlaneGeometry(WIDTH, WIDTH * this.aspectRatio);
		const material = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			roughness: 0.25,
			metalness: 0.05,
			map: texture,
		});

		this.photoMesh = new THREE.Mesh(geom, material);
		this.add(this.photoMesh);
		this.updateMatrixWorld();
		this.setupFrame();
		this.loadSound();
	}

	loadSound() {
		this.request = new XMLHttpRequest();
		this.request.open('GET', this.audioSrc, true);
		this.request.responseType = 'arraybuffer'
		this.request.onload = this.onLoadSound.bind(this);
		this.request.send();
	}

	onLoadSound(e) {
		if (e.target.readyState === 4 && e.target.status === 200) {
			decode(e.target.response, this.onDecodeSound.bind(this), this.onErrorDecodeSound);
		} else if (e.target.readyState === 4) {
			console.error('Error: Sound probably missing');
		}
	}

	onDecodeSound(e) {
		this.loudSpeaker = this.audioScene.createPanner(e);
		this.loudSpeaker.panner.setPosition(this.position.x, this.position.y, this.position.z);
		const ori = new THREE.Vector3().copy(this.position).negate().normalize();
		this.loudSpeaker.panner.setOrientation(ori.x, ori.y, ori.z);
		this.loudSpeaker.source.start(0);

		if (window.app.debug) {
			const loudSpeakerLight = new THREE.SpotLight(0xff0000, 1);
			this.parent.add(loudSpeakerLight);
			this.parent.add(loudSpeakerLight.target);

			loudSpeakerLight.position.copy(this.position);
			loudSpeakerLight.target.position.copy(new THREE.Vector3().copy(this.position).negate());
			loudSpeakerLight.angle = this.loudSpeaker.panner.coneOuterAngle * 0.0174533 / 2;
			loudSpeakerLight.target.updateMatrixWorld();
			loudSpeakerLight.castShadow = false;


			const loudSpeakerHelper = new THREE.SpotLightHelper(loudSpeakerLight);
			this.parent.add(loudSpeakerHelper);
			console.log(loudSpeakerLight);
		}
	}

	onErrorDecodeSound(e) {
		console.error('Error decoding sound:', e);
	}

	setupFrame() {

	}
}

