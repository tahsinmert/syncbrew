<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let gradientElement: HTMLElement;

	onMount(() => {
		if (!gradientElement) return;

		// Animate gradient position
		gsap.to(gradientElement, {
			backgroundPosition: '200% 200%',
			duration: 20,
			repeat: -1,
			ease: 'none'
		});
	});
</script>

<div class="animated-gradient" bind:this={gradientElement}></div>

<style>
	.animated-gradient {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			135deg,
			rgba(26, 26, 46, 0.8) 0%,
			rgba(22, 33, 62, 0.8) 25%,
			rgba(15, 52, 96, 0.8) 50%,
			rgba(22, 33, 62, 0.8) 75%,
			rgba(26, 26, 46, 0.8) 100%
		);
		background-size: 200% 200%;
		background-position: 0% 0%;
		pointer-events: none;
		z-index: -1;
		opacity: 0.3;
		mix-blend-mode: overlay;
	}
</style>

