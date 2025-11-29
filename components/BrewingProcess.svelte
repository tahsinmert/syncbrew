<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let container: HTMLElement;
	let dataContainer: HTMLElement;
	let dataItems: HTMLElement[] = [];
	let progressBars: HTMLElement[] = [];

	const dataPoints = [
		{ label: 'Pressure', value: '9 Bars' },
		{ label: 'Temperature', value: '93°C' },
		{ label: 'Time', value: '25 Seconds' },
		{ label: 'Dose', value: '18 Grams' }
	];

	onMount(() => {
		if (!container || !dataContainer) return;

		// Animate data points with staggered fade-in from left
		dataItems.forEach((item, index) => {
			const progressBar = progressBars[index];
			if (!item || !progressBar) return;
			
			// Set initial state
			gsap.set(item, {
				opacity: 0,
				x: -50
			});

			gsap.set(progressBar, {
				scaleX: 0,
				transformOrigin: 'left'
			});

			// Animate item fade-in and slide
			gsap.to(item, {
				opacity: 1,
				x: 0,
				duration: 0.8,
				ease: 'power3.out',
				delay: index * 0.15,
				scrollTrigger: {
					trigger: container,
					start: 'top 75%',
					end: 'top 50%',
					scrub: false,
					once: true
				}
			});

			// Animate progress bar fill
			gsap.to(progressBar, {
				scaleX: 1,
				duration: 1.2,
				ease: 'power2.out',
				delay: index * 0.15 + 0.3,
				scrollTrigger: {
					trigger: container,
					start: 'top 75%',
					end: 'top 50%',
					scrub: false,
					once: true
				}
			});
		});

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	});
</script>

<section class="brewing-section" bind:this={container}>
	<div class="split-container">
		<!-- Left Side: The Data -->
		<div class="data-side">
			<div class="data-content" bind:this={dataContainer}>
				<h2 class="section-headline">Precision Extraction</h2>
				<div class="data-list">
					{#each dataPoints as point, index}
						<div class="data-item" bind:this={dataItems[index]}>
							<div class="data-label">{point.label}:</div>
							<div class="data-value">{point.value}</div>
							<div class="progress-bar-container">
								<div class="progress-bar" bind:this={progressBars[index]}></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Right Side: The Visual -->
		<div class="video-side">
			<video
				src="/espresso-pour.mp4"
				autoplay
				loop
				muted
				playsinline
				class="brewing-video"
			></video>
		</div>
	</div>
</section>

<style>
	.brewing-section {
		position: relative;
		width: 100%;
		min-height: 100dvh;
		overflow: hidden;
	}

	.split-container {
		display: flex;
		width: 100%;
		height: 100dvh;
	}

	/* Left Side: The Data */
	.data-side {
		flex: 0 0 50%;
		background: #0c0a09; /* Deep Espresso/Black */
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem;
		position: relative;
	}

	.data-content {
		width: 100%;
		max-width: 600px;
	}

	.section-headline {
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: clamp(3rem, 6vw, 5.5rem);
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 4rem 0;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}

	.data-list {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.data-item {
		opacity: 0;
	}

	.data-label {
		font-family: 'Courier New', 'Monaco', monospace;
		font-size: clamp(0.875rem, 1.2vw, 1rem);
		color: #a8a29e; /* text-stone-400 */
		text-transform: uppercase;
		letter-spacing: 0.15em;
		margin-bottom: 0.5rem;
	}

	.data-value {
		font-family: 'Courier New', 'Monaco', monospace;
		font-size: clamp(1.5rem, 2.5vw, 2.25rem);
		font-weight: 700;
		color: #ffffff;
		letter-spacing: 0.05em;
		margin-bottom: 0.75rem;
	}

	.progress-bar-container {
		width: 100%;
		height: 2px;
		background: rgba(255, 255, 255, 0.1);
		overflow: hidden;
		border-radius: 1px;
	}

	.progress-bar {
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, #ffffff 0%, #d4d4d4 100%);
		transform: scaleX(0);
		transform-origin: left;
	}

	/* Right Side: The Visual */
	.video-side {
		flex: 0 0 50%;
		position: relative;
		height: 100%;
		overflow: hidden;
	}

	.brewing-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Tablet adjustments */
	@media (max-width: 1024px) {
		.data-side {
			padding: 3rem;
		}

		.data-list {
			gap: 2rem;
		}
	}

	/* Mobile: Stack layout */
	@media (max-width: 768px) {
		.split-container {
			flex-direction: column;
			height: auto;
			min-height: 100dvh;
		}

		.data-side {
			flex: 1;
			min-height: 50vh;
			padding: 3rem 2rem;
		}

		.video-side {
			flex: 1;
			min-height: 50vh;
			order: -1; /* Video on top */
		}

		.section-headline {
			margin-bottom: 3rem;
			text-align: center;
		}

		.data-list {
			gap: 2rem;
		}
	}

	@media (max-width: 640px) {
		.data-side {
			padding: 2rem 1.5rem;
		}

		.section-headline {
			margin-bottom: 2.5rem;
		}

		.data-list {
			gap: 1.75rem;
		}
	}
</style>

