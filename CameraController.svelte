<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import { T } from '@threlte/core';
	
	export let mouseX = 0;
	export let mouseY = 0;
	
	const { camera } = useThrelte();
</script>

<T.Group
	useFrame={() => {
		// Update camera parallax
		const parallaxStrength = 0.5;
		if (camera) {
			camera.position.x += (mouseX * parallaxStrength - camera.position.x) * 0.05;
			camera.position.y += (mouseY * parallaxStrength - camera.position.y) * 0.05;
			camera.lookAt(0, 0, 0);
		}
	}}
/>

