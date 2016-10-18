export const GAIN = 1;
export const WORLD_DIMENTIONS = {
	x: 600,
	y: 350,
	z: 1000, 
}

export const LIGHTING_DIMENTIONS = {
	x: WORLD_DIMENTIONS.x - 150,
	z: WORLD_DIMENTIONS.z - 150, 
}
export const LIGHTS_SPREAD_Z = LIGHTING_DIMENTIONS.z / 3;
export const LIGHT_COLOUR = 0xf9fbff;
export const LIGHT_INTENSITY = 0.06;

const FRAMES_HANG_HEIGHT = -20;

export const FRAMES_DATA = [
	{
		x: 0,
		y: FRAMES_HANG_HEIGHT,
		z: (WORLD_DIMENTIONS.z / 2) -1,
		rotationY: Math.PI,
		imageSrc: 'assets/maps/img-0.jpg',
		audioSrc: 'assets/sounds/0.mp3',
	},

	{
		x: (WORLD_DIMENTIONS.x / 2) - 1,
		y: FRAMES_HANG_HEIGHT,
		z: WORLD_DIMENTIONS.x / -3,
		rotationY: Math.PI / -2,
		imageSrc: 'assets/maps/img-1.jpg',
		audioSrc: 'assets/sounds/1.mp3',
	},
	{
		x: (WORLD_DIMENTIONS.x / 2) - 1,
		y: FRAMES_HANG_HEIGHT,
		z: WORLD_DIMENTIONS.x / 3,
		rotationY: Math.PI / -2,
		imageSrc: 'assets/maps/img-2.jpg',
		audioSrc: 'assets/sounds/2.mp3',
	},


	{
		x: (WORLD_DIMENTIONS.x / -2) + 1,
		y: FRAMES_HANG_HEIGHT,
		z: WORLD_DIMENTIONS.x / -3,
		rotationY: Math.PI / 2,
		imageSrc: 'assets/maps/img-3.jpg',
		audioSrc: 'assets/sounds/3.mp3',
	},
	{
		x: (WORLD_DIMENTIONS.x / -2) + 1,
		y: FRAMES_HANG_HEIGHT,
		z: WORLD_DIMENTIONS.x / 3,
		rotationY: Math.PI / 2,
		imageSrc: 'assets/maps/img-4.jpg',
		audioSrc: 'assets/sounds/4.mp3',
	},


	{
		x: 0,
		y: FRAMES_HANG_HEIGHT,
		z: (WORLD_DIMENTIONS.z / -2) + 1,
		rotationY: 0,
		imageSrc: 'assets/maps/img-5.jpg',
		audioSrc: 'assets/sounds/5.mp3',
	},

]