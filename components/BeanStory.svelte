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
				y: 20
			},
			{
				opacity: 1,
				y: 0,
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

<section class="bean-story-section" bind:this={container}>
	<video
		src="/bean-border.mp4"
		autoplay
		loop
		muted
		playsinline
		class="story-video"
	></video>
	
	<div class="text-overlay" bind:this={textContent}>
		<h2 class="story-headline">Origin & Soul</h2>
		<p class="story-body">
			Every bean tells a story. From the high altitudes of Ethiopia to your cup, we preserve the integrity of the roast.
		</p>
	</div>
</section>

<style>
	.bean-story-section {
		position: relative;
		width: 100%;
		min-height: 100dvh;
		background: #ffffff; /* Pure white background */
		overflow: hidden;
		margin: 0;
		padding: 0;
	}

	.story-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		z-index: 1;
	}

	.text-overlay {
		position: absolute;
		top: 20%;
		right: 10%;
		max-width: 40%;
		z-index: 2;
		opacity: 0;
	}

	.story-headline {
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: clamp(3rem, 8vw, 7rem); /* text-7xl to text-8xl range */
		font-weight: 700;
		color: #0c0a09; /* text-stone-900 / text-black */
		margin: 0 0 2rem 0;
		line-height: 1.1;
		letter-spacing: -0.03em;
	}

	.story-body {
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: clamp(1.125rem, 1.8vw, 1.5rem);
		color: #1c1917; /* text-stone-800 for high contrast */
		line-height: 1.8;
		margin: 0;
		font-weight: 400;
	}

	/* Tablet adjustments */
	@media (max-width: 1024px) {
		.text-overlay {
			max-width: 45%;
			top: 18%;
			right: 8%;
		}

		.story-headline {
			margin-bottom: 1.5rem;
		}
	}

	/* Mobile adjustments with white fade overlay */
	@media (max-width: 768px) {
		.text-overlay {
			max-width: 85%;
			top: 15%;
			right: auto;
			left: 50%;
			transform: translateX(-50%);
			padding: 2rem;
			background: linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.95) 0%,
				rgba(255, 255, 255, 0.9) 50%,
				rgba(255, 255, 255, 0.85) 100%
			);
			backdrop-filter: blur(10px);
			border-radius: 1rem;
		}

		.story-headline {
			font-size: clamp(2.5rem, 10vw, 4rem);
			margin-bottom: 1.25rem;
			text-align: center;
		}

		.story-body {
			font-size: clamp(1rem, 4vw, 1.25rem);
			text-align: center;
		}
	}

	@media (max-width: 640px) {
		.text-overlay {
			max-width: 90%;
			padding: 1.5rem;
			top: 12%;
		}

		.story-headline {
			font-size: clamp(2rem, 12vw, 3.5rem);
			margin-bottom: 1rem;
		}

		.story-body {
			font-size: clamp(0.95rem, 4.5vw, 1.125rem);
		}
	}
</style>

