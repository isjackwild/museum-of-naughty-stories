// AUDIO
export const GAIN = 1;



// ROOM
export const WORLD_DIMENTIONS = {
	x: 600,
	y: 400,
	z: 1000, 
}


// TIMINGS
export const TRIGGER_DURATION = 1.3;



// CAMERA
export const VIEW_DISTANCE = 100;


// LIGHTING
export const LIGHTING_DIMENTIONS = {
	x: WORLD_DIMENTIONS.x - 100,
	z: WORLD_DIMENTIONS.z - 100, 
}
export const LIGHTS_SPREAD_Z = LIGHTING_DIMENTIONS.z / 2;
export const LIGHT_COLOUR = 0xf9fbff;
export const LIGHT_INTENSITY = 0.15;
export const DECAY = 2;
export const ANGLE = 0.58;
export const PENUMBRA = 0.8;
export const SPOT_INTENSITY = 0.35;



// FRAMES
const FRAMES_HANG_HEIGHT = -20;
export const FRAMES_DATA = [
	{
		x: 0,
		y: FRAMES_HANG_HEIGHT,
		z: (WORLD_DIMENTIONS.z / 2) -1,
		rotationY: Math.PI,
		imageSrc: 'assets/maps/stool.jpg',
		audioSrc: 'assets/sounds/stool.mp3',
	},
	{
		x: (WORLD_DIMENTIONS.x / 2) - 1,
		y: FRAMES_HANG_HEIGHT,
		z: WORLD_DIMENTIONS.x / -3,
		rotationY: Math.PI / -2,
		imageSrc: 'assets/maps/eye-test.jpg',
		audioSrc: 'assets/sounds/eye-test.mp3',
	},
	{
		x: (WORLD_DIMENTIONS.x / 2) - 1,
		y: FRAMES_HANG_HEIGHT,
		z: WORLD_DIMENTIONS.x / 3,
		rotationY: Math.PI / -2,
		imageSrc: 'assets/maps/fence.jpg',
		audioSrc: 'assets/sounds/fence.mp3',
	},
	{
		x: (WORLD_DIMENTIONS.x / -2) + 1,
		y: FRAMES_HANG_HEIGHT,
		z: WORLD_DIMENTIONS.x / -3,
		rotationY: Math.PI / 2,
		imageSrc: 'assets/maps/img-3.jpg',
		// audioSrc: 'assets/sounds/3.mp3',
	},
	{
		x: (WORLD_DIMENTIONS.x / -2) + 1,
		y: FRAMES_HANG_HEIGHT,
		z: WORLD_DIMENTIONS.x / 3,
		rotationY: Math.PI / 2,
		imageSrc: 'assets/maps/img-4.jpg',
		// audioSrc: 'assets/sounds/4.mp3',
	},
	{
		x: 0,
		y: FRAMES_HANG_HEIGHT,
		z: (WORLD_DIMENTIONS.z / -2) + 1,
		rotationY: 0,
		imageSrc: 'assets/maps/img-5.jpg',
		// audioSrc: 'assets/sounds/5.mp3',
	},
]