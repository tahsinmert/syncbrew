<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let container: HTMLElement;
	let stickyWrapper: HTMLElement;
	let contentContainer: HTMLElement;

	const textItems = [
		'ETHICALLY SOURCED',
		'HAND ROASTED',
		'PURE PASSION',
		'ARTISAN CRAFTED',
		'FARM TO CUP',
		'SUSTAINABLE QUALITY'
	];

	onMount(() => {
		if (!container || !contentContainer) return;

		// Create scroll-triggered animations for each text item
		const textElements = contentContainer.querySelectorAll('.text-item');
		const itemCount = textElements.length;
		const scrollSectionHeight = 100 / itemCount; // Percentage of container height per item
		
		textElements.forEach((item, index) => {
			const startPercent = index * scrollSectionHeight;
			const centerPercent = startPercent + scrollSectionHeight / 2;
			const endPercent = (index + 1) * scrollSectionHeight;
			
			// Set initial position (below viewport)
			gsap.set(item, {
				opacity: 0,
				y: window.innerHeight * 0.5 // Start below center
			});

			// Animate as user scrolls: fade in and move up to center
			gsap.to(item, {
				opacity: 1,
				y: 0, // Center of viewport
				scrollTrigger: {
					trigger: container,
					start: `top+=${startPercent}% top`,
					end: `top+=${centerPercent}% top`,
					scrub: true
				}
			});

			// Continue moving up and fade out as it exits
			gsap.to(item, {
				opacity: 0,
				y: -window.innerHeight * 0.5, // Exit above center
				scrollTrigger: {
					trigger: container,
					start: `top+=${centerPercent}% top`,
					end: `top+=${endPercent}% top`,
					scrub: true
				}
			});
		});

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	});
</script>

<section class="corridor-container" bind:this={container}>
	<div class="sticky-wrapper" bind:this={stickyWrapper}>
		<video
			src="/bean-walls.mp4"
			autoplay
			loop
			muted
			playsinline
			class="corridor-video"
		></video>
		
		<div class="content-overlay" bind:this={contentContainer}>
			{#each textItems as item}
				<div class="text-item">
					{item}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.corridor-container {
		position: relative;
		width: 100%;
		height: 300vh; /* Very tall container for scrolling */
	}

	.sticky-wrapper {
		position: sticky;
		top: 0;
		width: 100%;
		height: 100dvh;
		overflow: hidden;
	}

	.corridor-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
	}

	.content-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 2;
		pointer-events: none;
	}

	.text-item {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: 4.5rem; /* text-6xl equivalent */
		font-weight: 900;
		color: #000000; /* text-black */
		text-align: center;
		opacity: 0;
		white-space: nowrap;
		letter-spacing: 0.05em;
	}

	/* Tablet adjustments */
	@media (max-width: 1024px) {
		.text-item {
			font-size: 3.5rem;
		}
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.text-item {
			font-size: 2.5rem;
		}
	}

	@media (max-width: 640px) {
		.text-item {
			font-size: 2rem;
		}
	}
</style>

