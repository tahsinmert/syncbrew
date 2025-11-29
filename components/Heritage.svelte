<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let container: HTMLElement;
	let videoContainer: HTMLElement;
	let video: HTMLVideoElement;
	let textContent: HTMLElement;

	onMount(() => {
		if (!container || !videoContainer || !video || !textContent) return;

		// Parallax scale effect: video scales from 110% to 100% as it comes into view
		gsap.fromTo(
			video,
			{
				scale: 1.1
			},
			{
				scale: 1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: container,
					start: 'top 80%',
					end: 'top 20%',
					scrub: true
				}
			}
		);

		// Fade in text content
		gsap.fromTo(
			textContent,
			{
				opacity: 0,
				y: 30
			},
			{
				opacity: 1,
				y: 0,
				duration: 1.5,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: container,
					start: 'top 70%',
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

<section class="heritage-section" bind:this={container}>
	<div class="video-frame" bind:this={videoContainer}>
		<video
			bind:this={video}
			src="/plantation-culture.mp4"
			autoplay
			loop
			muted
			playsinline
			class="heritage-video"
		></video>
	</div>

	<div class="text-content" bind:this={textContent}>
		<p class="caption">CULTIVATING COMMUNITY</p>
		<p class="description">
			We honor the hands that nurture the soil. A tribute to the heritage that makes every cup possible.
		</p>
	</div>
</section>

<style>
	.heritage-section {
		position: relative;
		width: 100%;
		min-height: 100vh;
		background: #0a0a0a; /* Global dark background */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 6rem 2rem;
		overflow: hidden;
	}

	.video-frame {
		position: relative;
		width: 90%;
		max-width: 80rem; /* max-w-7xl equivalent */
		aspect-ratio: 21 / 9; /* Ultra-wide cinema scope */
		border-radius: 1.5rem; /* rounded-3xl */
		overflow: hidden;
		box-shadow: 0 25px 50px -12px rgba(20, 83, 45, 0.2); /* shadow-2xl shadow-green-900/20 */
		margin-bottom: 4rem;
	}

	.heritage-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.text-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: 42rem; /* max-w-2xl */
		opacity: 0; /* Will be animated in */
	}

	.caption {
		font-family: 'Arial', 'Helvetica', sans-serif;
		font-size: 0.75rem; /* text-xs */
		font-weight: 600;
		letter-spacing: 0.2em; /* tracking-widest */
		color: rgba(255, 255, 255, 0.6);
		text-transform: uppercase;
		margin: 0 0 1.5rem 0;
	}

	.description {
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: clamp(1rem, 2vw, 1.25rem);
		font-weight: 400;
		color: rgba(255, 255, 255, 0.7); /* light grey */
		line-height: 1.8;
		margin: 0;
	}

	/* Tablet adjustments */
	@media (max-width: 1024px) {
		.heritage-section {
			padding: 5rem 1.5rem;
		}

		.video-frame {
			width: 92%;
			margin-bottom: 3.5rem;
		}

		.text-content {
			max-width: 38rem;
		}
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.heritage-section {
			padding: 4rem 1rem;
			min-height: auto;
		}

		.video-frame {
			width: 95%;
			aspect-ratio: 16 / 9; /* Slightly less wide on mobile for better viewing */
			border-radius: 1rem; /* rounded-2xl on mobile */
			margin-bottom: 3rem;
		}

		.text-content {
			max-width: 90%;
		}

		.caption {
			font-size: 0.7rem;
			margin-bottom: 1.25rem;
		}

		.description {
			font-size: clamp(0.95rem, 4vw, 1.1rem);
		}
	}

	@media (max-width: 640px) {
		.heritage-section {
			padding: 3rem 1rem;
		}

		.video-frame {
			width: 100%;
			margin-bottom: 2.5rem;
		}

		.caption {
			font-size: 0.65rem;
			margin-bottom: 1rem;
		}

		.description {
			font-size: clamp(0.9rem, 4.5vw, 1rem);
			line-height: 1.7;
		}
	}
</style>

