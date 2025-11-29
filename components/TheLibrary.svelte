<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let container: HTMLElement;
	let subtitle: HTMLElement;

	onMount(() => {
		if (!container || !subtitle) return;

		// Animate subtitle fade-in when section comes into view
		gsap.fromTo(
			subtitle,
			{
				opacity: 0,
				y: 10
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

<section class="library-section" bind:this={container}>
	<!-- Top black bar (letterbox) -->
	<div class="letterbox-top"></div>
	
	<!-- Video container -->
	<div class="video-container">
		<video
			src="/cafe-library.mp4"
			autoplay
			loop
			muted
			playsinline
			class="library-video"
		></video>
	</div>
	
	<!-- Bottom black bar (letterbox) with subtitle -->
	<div class="letterbox-bottom">
		<p class="subtitle-text" bind:this={subtitle}>
			Great coffee accompanies great thoughts. Welcome to the SyncBrew Library.
		</p>
	</div>
</section>

<style>
	.library-section {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #000000;
		margin: 0;
		padding: 0;
	}

	.letterbox-top {
		width: 100%;
		background: #000000;
		padding: 2.5rem 0; /* py-10 equivalent */
	}

	.video-container {
		width: 100%;
		height: 70vh;
		position: relative;
		overflow: hidden;
	}

	.library-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: sepia(0.2) contrast(1.1);
	}

	.letterbox-bottom {
		width: 100%;
		background: #000000;
		padding: 2.5rem 0; /* py-10 equivalent */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.subtitle-text {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		font-size: clamp(0.625rem, 0.8vw, 0.875rem); /* text-xs to text-sm */
		color: #ffffff;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.15em; /* tracking-widest */
		margin: 0;
		opacity: 0;
		line-height: 1.5;
	}

	/* Tablet adjustments */
	@media (max-width: 1024px) {
		.letterbox-top,
		.letterbox-bottom {
			padding: 2rem 0;
		}

		.video-container {
			height: 65vh;
		}
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.letterbox-top,
		.letterbox-bottom {
			padding: 1.5rem 0;
		}

		.video-container {
			height: 60vh;
		}

		.subtitle-text {
			font-size: clamp(0.6rem, 2vw, 0.75rem);
			letter-spacing: 0.1em;
			padding: 0 1rem;
		}
	}

	@media (max-width: 640px) {
		.letterbox-top,
		.letterbox-bottom {
			padding: 1.25rem 0;
		}

		.video-container {
			height: 55vh;
		}

		.subtitle-text {
			font-size: clamp(0.55rem, 2.5vw, 0.7rem);
			letter-spacing: 0.08em;
			padding: 0 1.5rem;
		}
	}
</style>

