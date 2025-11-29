<script>
	// Video element reference
	let videoElement;
</script>

<video
	bind:this={videoElement}
	src="/falling-beans.mp4"
	autoplay
	loop
	muted
	playsinline
	class="video-background"
></video>

<style>
	.video-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
		pointer-events: none;
		opacity: 0.6;
		mix-blend-mode: screen;
	}
</style>

