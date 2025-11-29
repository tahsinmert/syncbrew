<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';

	let trailContainer: HTMLElement;
	const trailPoints: HTMLElement[] = [];
	const TRAIL_LENGTH = 10;

	onMount(() => {
		if (!trailContainer) return;

		// Create trail points
		for (let i = 0; i < TRAIL_LENGTH; i++) {
			const point = document.createElement('div');
			point.className = 'trail-point';
			point.style.opacity = `${1 - i / TRAIL_LENGTH}`;
			point.style.scale = `${1 - i / TRAIL_LENGTH * 0.5}`;
			trailContainer.appendChild(point);
			trailPoints.push(point);
		}

		let mouseX = 0;
		let mouseY = 0;
		const positions: Array<{ x: number; y: number }> = [];

		function updateTrail() {
			positions.unshift({ x: mouseX, y: mouseY });
			if (positions.length > TRAIL_LENGTH) {
				positions.pop();
			}

			trailPoints.forEach((point, index) => {
				if (positions[index]) {
					gsap.to(point, {
						x: positions[index].x,
						y: positions[index].y,
						duration: 0.3,
						ease: 'power2.out'
					});
				}
			});

			requestAnimationFrame(updateTrail);
		}

		function handleMouseMove(event: MouseEvent) {
			mouseX = event.clientX;
			mouseY = event.clientY;
		}

		window.addEventListener('mousemove', handleMouseMove);
		updateTrail();

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	onDestroy(() => {
		trailPoints.forEach((point) => {
			gsap.killTweensOf(point);
		});
	});
</script>

<div class="cursor-trail" bind:this={trailContainer}></div>

<style>
	.cursor-trail {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9999;
	}

	:global(.trail-point) {
		position: absolute;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, rgba(245, 158, 11, 0.2) 100%);
		transform: translate(-50%, -50%);
		pointer-events: none;
		will-change: transform;
		filter: blur(2px);
	}

	@media (max-width: 768px) {
		.cursor-trail {
			display: none;
		}
	}
</style>

