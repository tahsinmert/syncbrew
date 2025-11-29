<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Navbar from '../../../components/Navbar.svelte';
	import Footer from '../../../components/Footer.svelte';
	import BeanStory from '../../../components/BeanStory.svelte';
	import Heritage from '../../../components/Heritage.svelte';
	import { navigate } from '../../stores/router';

	gsap.registerPlugin(ScrollTrigger);

	let pageContainer: HTMLElement;

	onMount(() => {
		if (!pageContainer) return;

		// Typography Reveal
		const headings = pageContainer.querySelectorAll('h1, h2, h3');
		headings.forEach((heading) => {
			gsap.fromTo(
				heading,
				{ y: 100, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1.5,
					ease: 'power4.out',
					scrollTrigger: {
						trigger: heading,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
		});

		// Paragraphs fade up
		const paragraphs = pageContainer.querySelectorAll('p');
		paragraphs.forEach((para) => {
			gsap.fromTo(
				para,
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1.2,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: para,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
		});

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<Navbar />

<div class="page-container" bind:this={pageContainer}>
	<!-- Hero Section -->
	<section class="hero-section">
		<video
			src="/farm-hero.mp4"
			autoplay
			loop
			muted
			playsinline
			class="hero-video"
		></video>
		<div class="hero-overlay"></div>
		<div class="hero-content">
			<h1 class="hero-title">OUR STORY</h1>
			<p class="hero-subtitle">A journey from seed to cup, crafted with passion</p>
		</div>
	</section>

	<!-- Bean Story Component -->
	<BeanStory />

	<!-- Heritage Component -->
	<Heritage />

	<!-- Mission Section -->
	<section class="mission-section">
		<div class="mission-container">
			<div class="mission-image">
				<video
					src="/coffee-ritual.mp4"
					autoplay
					loop
					muted
					playsinline
					class="mission-video"
				></video>
			</div>
			<div class="mission-content">
				<h2 class="mission-title">OUR MISSION</h2>
				<p class="mission-text">
					At SyncBrew, we believe coffee is more than a beverage—it's a bridge between cultures, 
					a catalyst for connection, and a celebration of craftsmanship. Our mission is to bring 
					you the world's finest coffees while honoring the farmers, communities, and traditions 
					that make each cup possible.
				</p>
				<p class="mission-text">
					We source directly from smallholder farms, ensuring fair compensation and sustainable 
					practices. Every bean tells a story, and we're honored to share these stories with you.
				</p>
			</div>
		</div>
	</section>

	<!-- Values Section -->
	<section class="values-section">
		<div class="values-container">
			<h2 class="values-title">OUR VALUES</h2>
			<div class="values-grid">
				<div class="value-card">
					<h3 class="value-name">Quality</h3>
					<p class="value-description">
						We cup thousands of samples to select only the top 1% that meet our exacting standards.
					</p>
				</div>
				<div class="value-card">
					<h3 class="value-name">Sustainability</h3>
					<p class="value-description">
						We're committed to environmental stewardship and supporting regenerative farming practices.
					</p>
				</div>
				<div class="value-card">
					<h3 class="value-name">Community</h3>
					<p class="value-description">
						Direct trade relationships ensure fair wages and stronger communities at origin.
					</p>
				</div>
				<div class="value-card">
					<h3 class="value-name">Innovation</h3>
					<p class="value-description">
						We blend traditional methods with modern techniques to create exceptional experiences.
					</p>
				</div>
			</div>
		</div>
	</section>
</div>

<Footer />

<style>
	.page-container {
		position: relative;
		width: 100%;
		background: #171717;
		min-height: 100dvh;
	}

	/* Hero Section */
	.hero-section {
		position: relative;
		width: 100%;
		height: 100dvh;
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
		filter: brightness(0.6) contrast(1.1);
		z-index: 0;
	}

	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.3) 0%,
			rgba(0, 0, 0, 0.5) 100%
		);
		z-index: 1;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		text-align: center;
		padding: 2rem;
	}

	.hero-title {
		font-size: clamp(3rem, 10vw, 7rem);
		font-weight: 700;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 1.5rem 0;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
	}

	.hero-subtitle {
		font-size: clamp(1rem, 2vw, 1.5rem);
		font-weight: 300;
		color: #ffffff;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		opacity: 0.95;
	}

	/* Mission Section */
	.mission-section {
		position: relative;
		width: 100%;
		padding: 4rem 1rem;
		background: #171717;
	}

	@media (min-width: 768px) {
		.mission-section {
			padding: 6rem 2rem;
		}
	}

	@media (min-width: 1024px) {
		.mission-section {
			padding: 8rem 2rem;
		}
	}

	.mission-container {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: stretch;
	}

	@media (min-width: 1024px) {
		.mission-container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
			align-items: center;
		}
	}

	.mission-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.mission-title {
		font-size: clamp(2rem, 4vw, 3.5rem);
		font-weight: 700;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
	}

	.mission-text {
		font-size: clamp(1rem, 1.5vw, 1.25rem);
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.8;
		margin: 0;
		font-family: 'Georgia', 'Times New Roman', serif;
	}

	.mission-image {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: 1rem;
		overflow: hidden;
	}

	.mission-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Values Section */
	.values-section {
		position: relative;
		width: 100%;
		padding: 4rem 1rem;
		background: #0f0f0f;
	}

	@media (min-width: 768px) {
		.values-section {
			padding: 6rem 2rem;
		}
	}

	@media (min-width: 1024px) {
		.values-section {
			padding: 8rem 2rem;
		}
	}

	.values-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.values-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		color: #ffffff;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 5rem 0;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
	}

	.values-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.values-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 3rem;
		}
	}

	.value-card {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		padding: 3rem;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}

	.value-card:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(245, 158, 11, 0.5);
		transform: translateY(-5px);
	}

	.value-name {
		font-size: clamp(1.5rem, 2vw, 2rem);
		font-weight: 700;
		color: #f59e0b;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 1rem 0;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
	}

	.value-description {
		font-size: clamp(0.95rem, 1.2vw, 1.125rem);
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.7;
		margin: 0;
		font-family: 'Georgia', 'Times New Roman', serif;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.values-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}

	@media (max-width: 768px) {
		.mission-section,
		.values-section {
			padding: 5rem 1.5rem;
		}

		.value-card {
			padding: 2rem;
		}
	}
</style>

