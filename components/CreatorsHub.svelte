<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let container: HTMLElement;
	let textContent: HTMLElement;
	let codeDecoration: HTMLElement;

	onMount(() => {
		if (!container || !textContent || !codeDecoration) return;

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

		// Animate code decoration fade-in
		gsap.fromTo(
			codeDecoration,
			{
				opacity: 0,
				y: 20
			},
			{
				opacity: 1,
				y: 0,
				duration: 1.5,
				ease: 'power3.out',
				delay: 0.3,
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

<section class="creators-section" bind:this={container}>
	<video
		src="/cafe-coding.mp4"
		autoplay
		loop
		muted
		playsinline
		class="creators-video"
	></video>
	
	<!-- Gradient overlay: black on left, transparent on right -->
	<div class="gradient-overlay"></div>
	
	<!-- Code block decoration behind text -->
	<div class="code-decoration" bind:this={codeDecoration}>
		<pre class="code-block"><code>console.log('Coffee loaded');
const focus = true;
// Build something great</code></pre>
	</div>
	
	<!-- Text content positioned on the left -->
	<div class="text-container" bind:this={textContent}>
		<h2 class="creators-headline">FUEL FOR BUILDERS.</h2>
		<p class="creators-body">
			Fast Wifi. Strong Coffee. Deep Focus. The unofficial headquarters for your next big project.
		</p>
	</div>
</section>

<style>
	.creators-section {
		position: relative;
		width: 100%;
		height: 80vh;
		overflow: hidden;
		margin: 0;
		padding: 0;
		background: #000000;
	}

	.creators-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
		filter: brightness(0.75);
	}

	.gradient-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			to right,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 0.8) 30%,
			rgba(0, 0, 0, 0.4) 60%,
			transparent 100%
		);
		z-index: 2;
		pointer-events: none;
	}

	.code-decoration {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		padding-left: 5rem;
		max-width: 50%;
		z-index: 2;
		opacity: 0;
		pointer-events: none;
	}

	.code-block {
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Courier New', monospace;
		font-size: clamp(0.75rem, 1vw, 0.9rem);
		color: rgba(255, 255, 255, 0.08);
		margin: 0;
		line-height: 1.8;
		letter-spacing: 0.05em;
		white-space: pre;
		overflow: hidden;
		user-select: none;
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

	.creators-headline {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		font-size: clamp(2.5rem, 6vw, 5rem);
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 1.5rem 0;
		line-height: 1.2;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.creators-body {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-size: clamp(1rem, 1.5vw, 1.25rem);
		color: #e5e5e5;
		line-height: 1.7;
		margin: 0;
		font-weight: 400;
		opacity: 0.9;
	}

	/* Tablet adjustments */
	@media (max-width: 1024px) {
		.text-container {
			padding-left: 3rem; /* pl-12 equivalent */
			max-width: 60%;
		}

		.code-decoration {
			padding-left: 3rem;
			max-width: 60%;
		}

		.creators-headline {
			margin-bottom: 1.25rem;
		}
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.creators-section {
			height: 70vh;
		}

		.text-container {
			padding-left: 2rem; /* pl-8 equivalent */
			max-width: 85%;
			top: 45%;
		}

		.code-decoration {
			padding-left: 2rem;
			max-width: 85%;
		}

		.gradient-overlay {
			background: linear-gradient(
				to right,
				rgba(0, 0, 0, 0.95) 0%,
				rgba(0, 0, 0, 0.85) 40%,
				rgba(0, 0, 0, 0.6) 70%,
				transparent 100%
			);
		}

		.creators-headline {
			font-size: clamp(2rem, 8vw, 3.5rem);
			margin-bottom: 1rem;
		}

		.creators-body {
			font-size: clamp(0.95rem, 3vw, 1.125rem);
		}
	}

	@media (max-width: 640px) {
		.creators-section {
			height: 65vh;
		}

		.text-container {
			padding-left: 1.5rem; /* pl-6 equivalent */
			max-width: 90%;
		}

		.code-decoration {
			padding-left: 1.5rem;
			max-width: 90%;
		}

		.creators-headline {
			font-size: clamp(1.75rem, 10vw, 3rem);
		}

		.creators-body {
			font-size: clamp(0.9rem, 3.5vw, 1rem);
		}

		.code-block {
			font-size: clamp(0.65rem, 2vw, 0.75rem);
		}
	}
</style>

