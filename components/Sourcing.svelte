<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let container: HTMLElement;
	let videoContainer: HTMLElement;
	let textEthically: HTMLElement;
	let textGrown: HTMLElement;
	let video: HTMLVideoElement;

	onMount(() => {
		if (!container || !videoContainer || !textEthically || !textGrown || !video) return;

		// Fade in video as it enters viewport
		gsap.fromTo(
			video,
			{
				opacity: 0
			},
			{
				opacity: 1,
				duration: 1.5,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: container,
					start: 'top 80%',
					end: 'top 50%',
					scrub: false,
					once: true
				}
			}
		);

		// Parallax effect: video moves slower than text (floating effect)
		gsap.to(videoContainer, {
			y: -80,
			ease: 'none',
			scrollTrigger: {
				trigger: container,
				start: 'top bottom',
				end: 'bottom top',
				scrub: true
			}
		});

		// Text moves faster (normal scroll speed) - creates depth
		gsap.to([textEthically, textGrown], {
			y: -150,
			ease: 'none',
			scrollTrigger: {
				trigger: container,
				start: 'top bottom',
				end: 'bottom top',
				scrub: true
			}
		});

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	});
</script>

<section class="sourcing-section" bind:this={container}>
	<!-- Background text: ETHICALLY -->
	<h1 class="headline-text headline-ethically" bind:this={textEthically}>
		ETHICALLY
	</h1>

	<!-- Video Container (centered, vertical) -->
	<div class="video-wrapper" bind:this={videoContainer}>
		<video
			bind:this={video}
			src="/bean-hands.mp4"
			autoplay
			loop
			muted
			playsinline
			class="sourcing-video"
		></video>
	</div>

	<!-- Background text: GROWN -->
	<h1 class="headline-text headline-grown" bind:this={textGrown}>
		GROWN
	</h1>
</section>

<style>
	.sourcing-section {
		position: relative;
		width: 100%;
		min-height: 100dvh;
		background: #2c2419; /* Deep warm brown / dark charcoal */
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: 4rem 2rem;
	}

	.headline-text {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: clamp(6rem, 20vw, 18rem);
		font-weight: 700;
		color: rgba(255, 255, 255, 0.2); /* text-white/20 */
		line-height: 1;
		letter-spacing: -0.02em;
		z-index: 0;
		white-space: nowrap;
		pointer-events: none;
		user-select: none;
	}

	.headline-ethically {
		top: 5%;
	}

	.headline-grown {
		bottom: 5%;
	}

	.video-wrapper {
		position: relative;
		width: 100%;
		max-width: 400px;
		height: 70dvh;
		max-height: 80dvh;
		z-index: 1;
		aspect-ratio: 9 / 16;
	}

	.sourcing-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 9999px; /* rounded-full equivalent */
		display: block;
		opacity: 0; /* Will be animated in */
	}

	/* Tablet adjustments */
	@media (max-width: 1024px) {
		.video-wrapper {
			max-width: 350px;
			height: 65dvh;
		}

		.headline-text {
			font-size: clamp(5rem, 18vw, 16rem);
		}
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.sourcing-section {
			padding: 3rem 1.5rem;
		}

		.video-wrapper {
			max-width: 280px;
			height: 60dvh;
		}

		.headline-text {
			font-size: clamp(4rem, 25vw, 12rem);
		}

		.headline-ethically {
			top: 3%;
		}

		.headline-grown {
			bottom: 3%;
		}
	}

	@media (max-width: 640px) {
		.sourcing-section {
			padding: 2rem 1rem;
		}

		.video-wrapper {
			max-width: 240px;
			height: 55dvh;
		}

		.headline-text {
			font-size: clamp(3rem, 30vw, 10rem);
		}
	}
</style>

