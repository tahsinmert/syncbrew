<script lang="ts">
	let videoElement: HTMLVideoElement;
	let containerElement: HTMLElement;
	let isHovered = false;

	function handleButtonHover() {
		isHovered = true;
	}

	function handleButtonLeave() {
		isHovered = false;
	}
</script>

<section class="ritual-section" bind:this={containerElement}>
	<div class="video-container" class:zoomed={isHovered}>
		<video
			bind:this={videoElement}
			src="/coffee-ritual.mp4"
			autoplay
			loop
			muted
			playsinline
			class="ritual-video"
		></video>
		<div class="vignette-mask"></div>
	</div>

	<div class="content-overlay">
		<h2 class="main-headline">Craft Your Ritual</h2>
		<p class="subtext">Experience the perfect blend of precision and passion.</p>
		
		<button
			class="cta-button"
			on:mouseenter={handleButtonHover}
			on:mouseleave={handleButtonLeave}
			on:click={() => {
				// Add navigation logic here
				console.log('CTA clicked');
			}}
		>
			Find a Cafe
		</button>
	</div>
</section>

<style>
	.ritual-section {
		position: relative;
		width: 100%;
		min-height: 100vh;
		background: #000000;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.video-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.video-container.zoomed {
		transform: scale(1.05);
	}

	.ritual-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		opacity: 0.9;
	}

	/* Radial gradient vignette mask */
	.vignette-mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(
			ellipse at center,
			transparent 0%,
			transparent 40%,
			rgba(0, 0, 0, 0.5) 60%,
			rgba(0, 0, 0, 0.8) 80%,
			#000000 100%
		);
		pointer-events: none;
		z-index: 1;
	}

	.content-overlay {
		position: relative;
		z-index: 2;
		text-align: center;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		max-width: 800px;
	}

	.main-headline {
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: clamp(3rem, 8vw, 6rem);
		font-weight: 400;
		color: #ffffff;
		margin: 0;
		line-height: 1.2;
		letter-spacing: 0.02em;
		text-shadow: 
			0 4px 20px rgba(0, 0, 0, 0.8),
			0 2px 10px rgba(0, 0, 0, 0.6);
	}

	.subtext {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-size: clamp(0.875rem, 1.5vw, 1.125rem);
		color: #a8a29e;
		margin: 0;
		line-height: 1.6;
		letter-spacing: 0.03em;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
		max-width: 500px;
	}

	.cta-button {
		margin-top: 1rem;
		padding: 1rem 3rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-size: clamp(0.875rem, 1.2vw, 1rem);
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #ffffff;
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 2px;
		cursor: pointer;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
		box-shadow: 
			0 4px 20px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.cta-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.1),
			transparent
		);
		transition: left 0.5s ease;
	}

	.cta-button:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.5);
		box-shadow: 
			0 8px 30px rgba(255, 255, 255, 0.2),
			0 4px 20px rgba(0, 0, 0, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
	}

	.cta-button:hover::before {
		left: 100%;
	}

	.cta-button:active {
		transform: translateY(0);
		box-shadow: 
			0 4px 15px rgba(255, 255, 255, 0.15),
			0 2px 10px rgba(0, 0, 0, 0.3);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.content-overlay {
			padding: 1.5rem;
			gap: 1.25rem;
		}

		.cta-button {
			padding: 0.875rem 2.5rem;
		}

		.vignette-mask {
			background: radial-gradient(
				ellipse at center,
				transparent 0%,
				transparent 30%,
				rgba(0, 0, 0, 0.6) 50%,
				rgba(0, 0, 0, 0.9) 70%,
				#000000 100%
			);
		}
	}

	@media (max-width: 480px) {
		.content-overlay {
			padding: 1rem;
			gap: 1rem;
		}

		.cta-button {
			padding: 0.75rem 2rem;
			width: 100%;
			max-width: 280px;
		}
	}
</style>

