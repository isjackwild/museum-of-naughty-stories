const THREE = require('three');

const raycaster = new THREE.Raycaster();

export const update = (origin, direction, intersectableObjects = []) => {
	raycaster.set(origin, direction);
	// const intersects = raycaster.intersectObjects(intersectableMeshes);
	// intersects.forEach((mesh) => {
	// 	console.log(mesh);
	// });

	for (let object of intersectableObjects) {
		const res = raycaster.intersectObject(object, true);
		if (res.length) return object.onFocus();
		object.onBlur();
	}
}