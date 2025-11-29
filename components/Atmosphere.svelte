<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let container: HTMLElement;
	let textContent: HTMLElement;

	onMount(() => {
		if (!container || !textContent) return;

		// Animate text fade-in when section comes into view
		gsap.fromTo(
			textContent,
			{
				opacity: 0,
				x: -30
			},
			{
				opacity: 1,
				x: 0,
				duration: 1.2,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: container,
					start: 'top 80%',
					end: 'top 50%',
					scrub: false,
					once: true
				}
			}
		);

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	});
</script>

<section class="atmosphere-section" bind:this={container}>
	<video
		src="/cafe-work.mp4"
		autoplay
		loop
		muted
		playsinline
		class="atmosphere-video"
	></video>
	
	<!-- Gradient overlay: black/80 on left, transparent on right -->
	<div class="gradient-overlay"></div>
	
	<!-- Text content positioned on the left -->
	<div class="text-container" bind:this={textContent}>
		<h2 class="atmosphere-headline">Fuel for Your Best Ideas.</h2>
		<p class="atmosphere-body">
			Whether you're sketching the next big thing or just journaling your day, we provide the perfect sanctuary.
		</p>
	</div>
</section>

<style>
	.atmosphere-section {
		position: relative;
		width: 100%;
		height: 80vh;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}

	.atmosphere-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
		/* Warm filters to blend with dark luxury theme */
		filter: brightness(0.9) sepia(0.1);
	}

	.gradient-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			to right,
			rgba(0, 0, 0, 0.8) 0%,
			rgba(0, 0, 0, 0.6) 30%,
			rgba(0, 0, 0, 0.3) 60%,
			transparent 100%
		);
		z-index: 2;
		pointer-events: none;
	}

	.text-container {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		padding-left: 5rem; /* pl-20 equivalent */
		max-width: 50%;
		z-index: 3;
		opacity: 0;
	}

	.atmosphere-headline {
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: clamp(2.5rem, 6vw, 5rem);
		font-weight: 700;
		color: #f5f5dc; /* Warm white/cream color */
		margin: 0 0 1.5rem 0;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}

	.atmosphere-body {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-size: clamp(1rem, 1.5vw, 1.25rem);
		color: #f5f5dc;
		line-height: 1.7;
		margin: 0;
		font-weight: 400;
		opacity: 0.95;
	}

	/* Tablet adjustments */
	@media (max-width: 1024px) {
		.text-container {
			padding-left: 3rem; /* pl-12 equivalent */
			max-width: 60%;
		}

		.atmosphere-headline {
			margin-bottom: 1.25rem;
		}
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.atmosphere-section {
			height: 70vh;
		}

		.text-container {
			padding-left: 2rem; /* pl-8 equivalent */
			max-width: 85%;
			top: 45%;
		}

		.gradient-overlay {
			background: linear-gradient(
				to right,
				rgba(0, 0, 0, 0.85) 0%,
				rgba(0, 0, 0, 0.7) 40%,
				rgba(0, 0, 0, 0.4) 70%,
				transparent 100%
			);
		}

		.atmosphere-headline {
			font-size: clamp(2rem, 8vw, 3.5rem);
			margin-bottom: 1rem;
		}

		.atmosphere-body {
			font-size: clamp(0.95rem, 3vw, 1.125rem);
		}
	}

	@media (max-width: 640px) {
		.atmosphere-section {
			height: 65vh;
		}

		.text-container {
			padding-left: 1.5rem; /* pl-6 equivalent */
			max-width: 90%;
		}

		.atmosphere-headline {
			font-size: clamp(1.75rem, 10vw, 3rem);
		}

		.atmosphere-body {
			font-size: clamp(0.9rem, 3.5vw, 1rem);
		}
	}
</style>

