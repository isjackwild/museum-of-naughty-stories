const THREE = require('three');
import { VIEW_DISTANCE, TRIGGER_DURATION } from './constants';
import { generateGuid } from './lib/maths.js';
import PubSub from 'pubsub-js';
const TweenLite = require('gsap');

export class JumpPoint extends THREE.Object3D {
	constructor(position, rotationY, viewTarget) {
		super();
		this.guid = generateGuid();
		this.isInFocus = false;
		this.isActive = true;
		this.rotation.y = rotationY;
		this.position.copy(position);
		this.viewTarget = viewTarget;
		this.targetMaterial = null;
		this.tween = null;
		PubSub.subscribe('camera.moveTo', (e, { guid }) => {
			console.log(guid);
			if (guid !== this.guid) this.isActive = true;
		});

		this.setupHitArea();
		this.setupTarget();
	}

	setupHitArea() {
		const geom = new THREE.CubeGeometry(150, 150, 30);
		const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
		material.visible = false;
		this.add(new THREE.Mesh(geom, material));
	}

	setupTarget() {
		const geom = new THREE.SphereGeometry(25, 25, 32);
		const material = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			metalness: 0,
			shininess: 0.3,
		});
		this.targetMaterial = material;
		this.target = new THREE.Mesh(geom, material);
		this.target.scale.set(0, 0, 0);
		this.add(this.target);
	}

	onFocus() {
		if (!this.isActive) return;
		if (this.isInFocus) return;
		this.isInFocus = true;
		if (this.tween) this.tween.kill();

		const onComplete = () => {
			PubSub.publish('camera.moveTo', { position: this.position, target: this.viewTarget, guid: this.guid });
			this.onBlur();
			this.isActive = false;
		};
		
		this.tween = TweenLite.to(this.target.scale, TRIGGER_DURATION, { x: 1, y: 1, z: 1, onComplete, ease: Back.easeOut.config(1.22) });
	}

	onBlur() {
		if (!this.isInFocus) return;
		if (this.tween) this.tween.kill();
		this.tween = TweenLite.to(this.target.scale, 0.1 ,{ x: 0, y: 0, z: 0 });
		this.isInFocus = false;
	}
}