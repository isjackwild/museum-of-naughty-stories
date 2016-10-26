// AUDIO
export const GAIN = 11;



// ROOM
export const WORLD_DIMENTIONS = {
	x: 700,
	y: 400,
	z: 950, 
}


// TIMINGS
export const TRIGGER_DURATION = 1.1;



// CAMERA
export const VIEW_DISTANCE = 120;
export const TARGET_DISTANCE = 60;


// LIGHTING
export const LIGHTING_DIMENTIONS = {
	x: WORLD_DIMENTIONS.x - 100,
	z: WORLD_DIMENTIONS.z - 100, 
}
export const LIGHTS_SPREAD_Z = LIGHTING_DIMENTIONS.z / 2;
// export const LIGHT_COLOUR = 0xf9fbff;
// export const LIGHT_COLOUR = 0x859ec6;
// ffcece
export const LIGHT_COLOUR = 0x859ec6;
// export const SPOT_COLOUR = 0xffffff;
export const SPOT_COLOUR = 0xcee1ff;
export const LIGHT_INTENSITY = 0.12;
export const DECAY = 2;
export const ANGLE = 0.6;
export const PENUMBRA = 1;
export const SPOT_INTENSITY = 0.7;
export const SPOT_DIST = 180;



// COLOUR
export const FRAME_COLOUR = 0xffffff;
export const JUMP_POINT_COLOUR = 0x00b3a4;
export const FLOOR_COLOUR = 0x00b3a4;
// export const FRAME_COLOUR = 0xff91cb;

const FRAMES_HANG_HEIGHT = -20;
export const FRAMES_DATA = [
	{
		x: 0,
		y: FRAMES_HANG_HEIGHT,
		z: (WORLD_DIMENTIONS.z / 2) -1,
		rotationY: Math.PI,
		imageSrc: 'assets/maps/classroom.jpg',
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
		imageSrc: 'assets/maps/garden.jpg',
		audioSrc: 'assets/sounds/fence.mp3',
	},
	{
		x: (WORLD_DIMENTIONS.x / -2) + 1,
		y: FRAMES_HANG_HEIGHT,
		z: WORLD_DIMENTIONS.x / -3,
		rotationY: Math.PI / 2,
		imageSrc: 'assets/maps/claires.jpg',
		audioSrc: 'assets/sounds/gel-pens.mp3',
	},
	{
		x: (WORLD_DIMENTIONS.x / -2) + 1,
		y: FRAMES_HANG_HEIGHT,
		z: WORLD_DIMENTIONS.x / 3,
		rotationY: Math.PI / 2,
		imageSrc: 'assets/maps/champagne.jpg',
		audioSrc: 'assets/sounds/champagne.mp3',
	},
	{
		x: 0,
		y: FRAMES_HANG_HEIGHT,
		z: (WORLD_DIMENTIONS.z / -2) + 1,
		rotationY: 0,
		imageSrc: 'assets/maps/sweets.jpg',
		audioSrc: 'assets/sounds/rabbit.mp3',
	},
]