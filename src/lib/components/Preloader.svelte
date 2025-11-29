<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { preloaderComplete } from '../stores.js';

	let curtainTop: HTMLElement;
	let curtainBottom: HTMLElement;
	let counterElement: HTMLElement;
	let statusText: HTMLElement;
	let logoElement: HTMLElement;
	let contentContainer: HTMLElement;

	let counter = 0;
	let statusIndex = 0;

	const statusMessages = ['ROASTING...', 'GRINDING...', 'EXTRACTING...', 'SERVING'];

	onMount(() => {
		// Wait for next tick to ensure elements are mounted
		setTimeout(() => {
			// Check session storage for repeat visits
			const hasVisited = typeof window !== 'undefined' && sessionStorage.getItem('syncbrew-visited');
			
			if (hasVisited) {
				// Fast version for repeat visits - hide everything immediately
				if (curtainTop && curtainBottom && contentContainer) {
					gsap.set([curtainTop, curtainBottom, contentContainer], { 
						opacity: 0,
						display: 'none'
					});
				}
				// Mark as complete immediately for repeat visits
				preloaderComplete.set(true);
				if (typeof document !== 'undefined') {
					document.body.classList.add('preloader-complete');
				}
				return;
			}

			// Ensure all elements exist before animating
			if (!curtainTop || !curtainBottom || !counterElement || !logoElement || !contentContainer) {
				console.warn('Preloader elements not found');
				preloaderComplete.set(true);
				return;
			}

			// Mark as visited
			if (typeof window !== 'undefined') {
				sessionStorage.setItem('syncbrew-visited', 'true');
			}

			// Set initial states
			gsap.set(counterElement, { opacity: 1 });
			gsap.set(logoElement, { opacity: 0, scale: 0.8 });
			gsap.set([curtainTop, curtainBottom], { y: 0 });

			// Create main timeline
			const tl = gsap.timeline();

			// Step 1: Counter animation (0-100 over 2.5s)
			const counterObj = { value: 0 };
			tl.to(counterObj, {
				value: 100,
				duration: 2.5,
				ease: 'power2.out',
				onUpdate: () => {
					counter = Math.floor(counterObj.value);
					// Rotate status messages
					const newIndex = Math.floor((counterObj.value / 100) * statusMessages.length);
					if (newIndex !== statusIndex && newIndex < statusMessages.length) {
						statusIndex = newIndex;
					}
				}
			});

			// Step 2: Fade out counter, fade in logo
			tl.to(counterElement, {
				opacity: 0,
				duration: 0.3,
				ease: 'power2.in'
			}, '-=0.3');
			
			tl.to(logoElement, {
				opacity: 1,
				scale: 1,
				duration: 0.5,
				ease: 'power2.out'
			}, '-=0.2');

			// Step 3: The reveal - curtains open
			tl.to(curtainTop, {
				y: '-100%',
				duration: 1.2,
				ease: 'power4.inOut'
			}, '-=0.3');

			tl.to(curtainBottom, {
				y: '100%',
				duration: 1.2,
				ease: 'power4.inOut'
			}, '-=1.2');

			tl.to(logoElement, {
				scale: 1.1,
				opacity: 0,
				duration: 1.2,
				ease: 'power4.inOut'
			}, '-=1.2');

			// Hide preloader after animation
			tl.to(contentContainer, {
				opacity: 0,
				duration: 0.3
			}, '-=0.5');

			tl.to([curtainTop, curtainBottom], {
				opacity: 0,
				duration: 0.3,
				onComplete: () => {
					if (curtainTop && curtainBottom && contentContainer) {
						curtainTop.style.display = 'none';
						curtainBottom.style.display = 'none';
						contentContainer.style.display = 'none';
					}
					// Mark preloader as complete and reveal content
					preloaderComplete.set(true);
					if (typeof document !== 'undefined') {
						document.body.classList.add('preloader-complete');
					}
				}
			}, '-=0.3');
		}, 50); // Small delay to ensure DOM is ready
	});
</script>

<!-- Curtain Layers -->
<div id="curtain-top" bind:this={curtainTop} class="curtain curtain-top" style="opacity: 1;"></div>
<div id="curtain-bottom" bind:this={curtainBottom} class="curtain curtain-bottom" style="opacity: 1;"></div>

<!-- Content Container -->
<div class="preloader-content" bind:this={contentContainer} style="opacity: 1;">
	<!-- Counter -->
	<div class="counter-wrapper" bind:this={counterElement}>
		<div class="counter">{String(counter).padStart(2, '0')}</div>
		<div class="status-text" bind:this={statusText}>{statusMessages[statusIndex]}</div>
	</div>

	<!-- Logo -->
	<div class="logo-wrapper" bind:this={logoElement}>
		<div class="logo">SYNCBREW</div>
	</div>
</div>

<style>
	.curtain {
		position: fixed;
		left: 0;
		width: 100%;
		height: 50vh;
		background-color: #000000;
		z-index: 99999;
		will-change: transform;
	}

	.curtain-top {
		top: 0;
	}

	.curtain-bottom {
		bottom: 0;
	}

	.preloader-content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.counter-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.counter {
		font-size: 6rem;
		font-family: 'Courier New', Courier, monospace;
		font-weight: 600;
		color: #f59e0b;
		letter-spacing: 0.05em;
		line-height: 1;
	}

	.status-text {
		margin-top: 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.7);
		font-family: system-ui, -apple-system, sans-serif;
	}

	.logo-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo {
		font-size: 4rem;
		font-family: 'Times New Roman', Times, serif;
		font-weight: 400;
		color: #ffffff;
		letter-spacing: 0.15em;
		text-transform: uppercase;
	}

	@media (max-width: 768px) {
		.counter {
			font-size: 4rem;
		}

		.logo {
			font-size: 2.5rem;
		}

		.status-text {
			font-size: 0.75rem;
		}
	}
</style>
