const THREE = require('three');
import { VIEW_DISTANCE, TRIGGER_DURATION } from './constants';
import { generateGuid } from './lib/maths.js';
import PubSub from 'pubsub-js';
const TweenLite = require('gsap');

const INACTIVE_SCALE = 0.4;
const INACTIVE_POSITION = -30;
const INACTIVE_OPACITY = 0.6;

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
		this.tl = null;
		PubSub.subscribe('camera.moveTo', (e, { guid }) => {
			console.log(guid);
			if (guid !== this.guid) this.isActive = true;
		});

		this.setupHitArea();
		this.setupTarget();
	}

	setupHitArea() {
		const geom = new THREE.CubeGeometry(150, 150, 50);
		const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
		material.visible = false;
		this.add(new THREE.Mesh(geom, material));
	}

	setupTarget() {
		const geom = new THREE.SphereGeometry(25, 25, 32);
		const material = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			metalness: 0,
			roughness: 0,
			transparent: true,
		});
		this.targetMaterial = material;
		this.target = new THREE.Mesh(geom, material);
		this.target.scale.set(INACTIVE_SCALE, INACTIVE_SCALE, INACTIVE_SCALE);
		this.add(this.target);
	}

	onFocus() {
		if (!this.isActive) return;
		if (this.isInFocus) return;
		this.isInFocus = true;
		if (this.tl) this.tl.kill();

		const onComplete = () => {
			PubSub.publish('camera.moveTo', { position: this.position, target: this.viewTarget, guid: this.guid });
			this.onBlur(true);
			this.isActive = false;
		};

		this.tl = new TimelineLite({ onComplete });
		this.tl.fromTo(
			this.target.scale,
			TRIGGER_DURATION * 0.8,
			{ x: INACTIVE_SCALE, y: INACTIVE_SCALE, z: INACTIVE_SCALE },
			{ x: 1, y: 1, z: 1, ease: Back.easeOut.config(1.22) },
			0
		);
		// this.tl.fromTo(
		// 	this.target.material.color,
		// 	TRIGGER_DURATION,
		// 	// { r: 0.3, g: 0.3, b: 0.3 },
		// 	// { r: 0.8, g: 0.11, b: 0 },
		// 	{ r: 1, g: 1, b: 1 },
		// 	{ r: 0, g: 0.87, b: 0.6 },
		// 	0
		// );
		this.tl.fromTo(
			this.target.material,
			TRIGGER_DURATION * 0.8,
			{ opacity: INACTIVE_OPACITY },
			{ opacity: 0.98 },
			0
		);
		this.tl.fromTo(
			this.target.position,
			TRIGGER_DURATION,
			{ y: INACTIVE_POSITION },
			{ y: 0, ease: Back.easeOut.config(1.8) },
			0
		);
	}

	onBlur(isTriggered) {
		if (!this.isInFocus) return;
		if (this.tl) this.tl.kill();
		this.isInFocus = false;
		const dur = isTriggered ? 0.36 : 0.166;
		const delay = isTriggered ? 0.1 : 0;

		this.tl = new TimelineLite({ delay });
		if (!isTriggered) {
			this.tl.to(
				this.target.scale,
				dur,
				{ x: INACTIVE_SCALE, y: INACTIVE_SCALE, z: INACTIVE_SCALE, ease: Back.easeInOut.config(1.18) },
				0
			);
			this.tl.to(
				this.target.material,
				dur,
				{ opacity: INACTIVE_OPACITY },
				0
			);
			// this.tl.to(
			// 	this.target.material.color,
			// 	dur,
			// 	{ r: 1, g: 1, b: 1 },
			// 	0
			// );
			this.tl.to(
				this.target.position,
				dur,
				{ y: INACTIVE_POSITION },
				0
			);
		} else {
			this.tl.to(
				this.target.scale,
				dur,
				{ x: 0, y: 0, z: 0, ease: Back.easeIn.config(1.1) },
				0
			);
		}
	}
}