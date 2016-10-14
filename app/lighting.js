const THREE = require('three');
import { WORLD_DIMENTIONS, LIGHTING_DIMENTIONS, LIGHTS_SPREAD_Z, LIGHT_COLOUR, LIGHT_INTENSITY } from './constants';

export const lights = [];
export const helpers = [];

const DECAY = 2;
const ANGLE = 0.6;
const PENUMBRA = 0.8;
const SPOT_INTENSITY = 0.4;

export const init = () => {
	// UP
	lights[1] = new THREE.DirectionalLight(LIGHT_COLOUR, 0.44);
	lights[1].position.set(0, WORLD_DIMENTIONS.y / -2, 0);
	lights[1].target.position.set(0, WORLD_DIMENTIONS.y / 2, 0);

	// DOWN
	// lights[2] = new THREE.DirectionalLight(LIGHT_COLOUR, 0.3);
	// lights[2].position.set(0, 200000000, 0);
	// lights[2].target.position.set(0, WORLD_DIMENTIONS.y / -2, 0);

	// lights[3] = new THREE.SpotLight(0xffffff, 0.2);
	// lights[3].position.set(LIGHTING_DIMENTIONS.x / 2, WORLD_DIMENTIONS.y / 2, 0);
	// lights[3].target.position.set(WORLD_DIMENTIONS.x / 2, WORLD_DIMENTIONS.y / 6, 0);
	// lights[3].target.updateMatrixWorld();
	// lights[3].distance = 0;
	// lights[3].decay = 2;
	// lights[3].angle = 0.7;
	// lights[3].penumbra = 0.5;

	// if (window.app.debug) {
	// 	const lightFolder = window.app.gui.addFolder('Spotlight');
	// 	lightFolder.add(lights[3], 'distance').step(50);
	// 	lightFolder.add(lights[3], 'angle');
	// 	lightFolder.add(lights[3], 'decay').step(0.1);
	// 	lightFolder.add(lights[3], 'penumbra', 0, 1).step(0.01);
	// 	lightFolder.add(lights[3], 'intensity').step(0.1);
	// 	helpers.push(new THREE.SpotLightHelper(lights[2]));
	// }


	const Y_OFFSET = 100;
	for (let z = LIGHTING_DIMENTIONS.z / - 2; z <= LIGHTING_DIMENTIONS.z / 2; z += LIGHTS_SPREAD_Z ){

		const lightLeft = new THREE.PointLight(LIGHT_COLOUR, LIGHT_INTENSITY, 0, 2);
		lightLeft.position.set(LIGHTING_DIMENTIONS.x / -2, (WORLD_DIMENTIONS.y / 2) - Y_OFFSET, z);
		lights.push(lightLeft);

		const lightCenter = new THREE.PointLight(LIGHT_COLOUR, LIGHT_INTENSITY, 0, 2);
		lightCenter.position.set(0, (WORLD_DIMENTIONS.y / 2) - Y_OFFSET, z);
		lights.push(lightCenter);

		const lightRight = new THREE.PointLight(LIGHT_COLOUR, LIGHT_INTENSITY, 0, 2);
		lightRight.position.set(LIGHTING_DIMENTIONS.x / 2 , (WORLD_DIMENTIONS.y / 2) - Y_OFFSET, z);
		lights.push(lightRight);
		const helperRight = new THREE.PointLightHelper(lightRight, 20);
		
		if (window.app.debug) {
			helpers.push(new THREE.PointLightHelper(lightLeft, 20));
			helpers.push(new THREE.PointLightHelper(lightCenter, 20));
			helpers.push(new THREE.PointLightHelper(lightRight, 20));
		}
	}

	for (let z = LIGHTING_DIMENTIONS.z / - 2; z <= LIGHTING_DIMENTIONS.z / 2; z += LIGHTS_SPREAD_Z ){

		const spotLeft = new THREE.SpotLight(0xffffff, SPOT_INTENSITY);
		spotLeft.position.set(LIGHTING_DIMENTIONS.x / -2, (WORLD_DIMENTIONS.y / 2), z);
		spotLeft.target.position.set(WORLD_DIMENTIONS.x / -2, WORLD_DIMENTIONS.y / 8, z);
		spotLeft.target.updateMatrixWorld();
		spotLeft.decay = DECAY;
		spotLeft.angle = ANGLE;
		spotLeft.penumbra = PENUMBRA;
		spotLeft.castShadow = true;
		lights.push(spotLeft);

		const spotRight = new THREE.SpotLight(0xffffff, SPOT_INTENSITY);
		spotRight.position.set(LIGHTING_DIMENTIONS.x / 2 , (WORLD_DIMENTIONS.y / 2), z);
		spotRight.target.position.set(WORLD_DIMENTIONS.x / 2, WORLD_DIMENTIONS.y / 8, z);
		spotRight.target.updateMatrixWorld();
		spotRight.decay = DECAY;
		spotRight.angle = ANGLE;
		spotRight.penumbra = PENUMBRA;
		spotRight.castShadow = true;
		lights.push(spotRight);
		
		if (window.app.debug) {
			helpers.push(new THREE.SpotLightHelper(spotLeft, 20));
			helpers.push(new THREE.SpotLightHelper(spotRight, 20));
		}
	}
}
