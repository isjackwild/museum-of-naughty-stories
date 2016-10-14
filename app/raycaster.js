const THREE = require('three');

const raycaster = new THREE.Raycaster();

export const update = (origin, direction, intersectableMeshes = []) => {
	raycaster.set(origin, direction);
	const intersects = raycaster.intersectObjects(intersectableMeshes);
	intersects.forEach((mesh) => {
		console.log(mesh);
	});
}