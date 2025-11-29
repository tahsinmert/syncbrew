<script lang="ts">
	import { onMount } from 'svelte';

	let scrollIndicator: HTMLElement;

	onMount(() => {
		// Smooth scroll to next section on click
		if (scrollIndicator) {
			scrollIndicator.addEventListener('click', () => {
				window.scrollTo({
					top: window.innerHeight,
					behavior: 'smooth'
				});
			});
		}
	});
</script>

<div class="hero-container">
	<!-- Full-screen video background -->
	<video
		class="hero-video"
		autoplay
		loop
		muted
		playsinline
		preload="auto"
	>
		<source src="/farm-hero.mp4" type="video/mp4" />
	</video>

	<!-- Vignette overlay -->
	<div class="vignette-overlay"></div>

	<!-- Content -->
	<div class="hero-content">
		<h1 class="headline">FROM SOIL TO SOUL</h1>
		<p class="subtext">Honor the farmer. Savor the craft.</p>
	</div>

	<!-- Scroll down indicator -->
	<div class="scroll-indicator" bind:this={scrollIndicator}>
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M6 9l6 6 6-6" />
		</svg>
	</div>
</div>

<style>
	.hero-container {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(0.6) contrast(1.1) saturate(1.1);
		z-index: 0;
	}

	.vignette-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(
			circle at center,
			transparent 0%,
			transparent 40%,
			rgba(0, 0, 0, 0.3) 70%,
			rgba(0, 0, 0, 0.8) 100%
		);
		z-index: 1;
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		text-align: center;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
	}

	.headline {
		font-size: clamp(3rem, 10vw, 7rem);
		font-weight: 700;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		line-height: 1.1;
		text-shadow: 
			0 2px 10px rgba(0, 0, 0, 0.5),
			0 4px 20px rgba(0, 0, 0, 0.4),
			0 0 30px rgba(0, 0, 0, 0.3);
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		margin: 0;
	}

	.subtext {
		font-size: clamp(1rem, 2vw, 1.5rem);
		font-weight: 300;
		color: #ffffff;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		text-shadow: 
			0 2px 8px rgba(0, 0, 0, 0.5),
			0 0 15px rgba(0, 0, 0, 0.3);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		margin: 0;
		opacity: 0.95;
	}

	.scroll-indicator {
		position: absolute;
		bottom: 3rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 3;
		color: #ffffff;
		cursor: pointer;
		opacity: 0.8;
		transition: opacity 0.3s ease;
		animation: bounce 2s infinite;
	}

	.scroll-indicator:hover {
		opacity: 1;
	}

	.scroll-indicator svg {
		width: 32px;
		height: 32px;
		filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
	}

	@keyframes bounce {
		0%, 100% {
			transform: translateX(-50%) translateY(0);
		}
		50% {
			transform: translateX(-50%) translateY(10px);
		}
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.hero-content {
			padding: 1rem;
			gap: 1rem;
		}

		.scroll-indicator {
			bottom: 2rem;
		}
	}
</style>
