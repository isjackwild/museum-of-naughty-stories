export const GAIN = 1;
export const WORLD_DIMENTIONS = {
	x: 1000,
	y: 600,
	z: 1600, 
}

export const LIGHTING_DIMENTIONS = {
	x: WORLD_DIMENTIONS.x - 400,
	z: WORLD_DIMENTIONS.z - 400, 
}
export const LIGHTS_SPREAD_Z = LIGHTING_DIMENTIONS.z / 4;
export const LIGHT_COLOUR = 0xf9fbff;
export const LIGHT_INTENSITY = 0.06;