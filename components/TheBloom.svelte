<script lang="ts">
	let videoElement: HTMLVideoElement;
</script>

<section class="bloom-section">
	<div class="video-container">
		<video
			bind:this={videoElement}
			src="/coffee-bloom.mp4"
			autoplay
			loop
			muted
			playsinline
			class="bloom-video"
		></video>
		<div class="gradient-overlay"></div>
	</div>

	<div class="content-container">
		<div class="glass-card">
			<h2 class="bloom-title">THE BLOOM</h2>
			<p class="bloom-definition">
				The breath of fresh coffee. When hot water meets freshly roasted beans, CO2 escapes, creating a beautiful bloom. No bloom? No fresh.
			</p>
		</div>
	</div>
</section>

<style>
	.bloom-section {
		position: relative;
		width: 100%;
		height: 65vh;
		min-height: 500px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.video-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	.bloom-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.gradient-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.7) 100%);
		pointer-events: none;
		z-index: 1;
	}

	.content-container {
		position: relative;
		z-index: 2;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.glass-card {
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(245, 158, 11, 0.3);
		border-radius: 1rem;
		padding: 2rem;
		max-width: 800px;
		text-align: center;
		box-shadow: 
			0 8px 32px rgba(0, 0, 0, 0.4),
			0 0 20px rgba(245, 158, 11, 0.1);
	}

	.bloom-title {
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 400;
		color: #fef3c7;
		margin: 0 0 1.5rem 0;
		letter-spacing: 0.1em;
		text-shadow: 
			0 2px 10px rgba(0, 0, 0, 0.8),
			0 0 20px rgba(245, 158, 11, 0.3);
	}

	.bloom-definition {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-size: clamp(1rem, 1.5vw, 1.25rem);
		color: rgba(255, 255, 255, 0.95);
		margin: 0;
		line-height: 1.7;
		letter-spacing: 0.02em;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.bloom-section {
			height: 60vh;
			min-height: 400px;
		}

		.glass-card {
			padding: 1.5rem;
		}

		.bloom-title {
			margin-bottom: 1rem;
		}
	}

	@media (max-width: 480px) {
		.bloom-section {
			height: 60vh;
			min-height: 350px;
		}

		.content-container {
			padding: 1rem;
		}

		.glass-card {
			padding: 1.25rem;
		}
	}
</style>

