<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';

	let container: HTMLElement;
	const particles: Array<{ element: HTMLElement; x: number; y: number; speed: number; size: number }> = [];
	const PARTICLE_COUNT = 20;

	onMount(() => {
		if (!container) return;

		// Create particles
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			const particle = document.createElement('div');
			particle.className = 'particle';
			container.appendChild(particle);

			const size = Math.random() * 4 + 2;
			const x = Math.random() * 100;
			const y = Math.random() * 100;
			const speed = Math.random() * 0.5 + 0.3;

			particle.style.width = `${size}px`;
			particle.style.height = `${size}px`;
			particle.style.left = `${x}%`;
			particle.style.top = `${y}%`;

			particles.push({
				element: particle,
				x,
				y,
				speed,
				size
			});

			// Animate each particle
			gsap.to(particle, {
				y: '+=100dvh',
				x: `+=${(Math.random() - 0.5) * 200}px`,
				duration: 10 / speed,
				repeat: -1,
				ease: 'none',
				rotation: 360 * (Math.random() > 0.5 ? 1 : -1)
			});

			// Random horizontal movement
			gsap.to(particle, {
				x: `+=${(Math.random() - 0.5) * 50}%`,
				duration: 3 + Math.random() * 2,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut'
			});
		}
	});

	onDestroy(() => {
		particles.forEach((p) => {
			gsap.killTweensOf(p.element);
		});
	});
</script>

<div class="particles-container" bind:this={container}></div>

<style>
	.particles-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
		overflow: hidden;
	}

	:global(.particle) {
		position: absolute;
		background: radial-gradient(circle, rgba(245, 158, 11, 0.6) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 100%);
		border-radius: 50%;
		opacity: 0.4;
		filter: blur(1px);
		will-change: transform;
	}
</style>

