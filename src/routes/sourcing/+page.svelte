<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Navbar from '../../../components/Navbar.svelte';
	import Footer from '../../../components/Footer.svelte';
	import Sourcing from '../../../components/Sourcing.svelte';

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
			src="/plantation-culture.mp4"
			autoplay
			loop
			muted
			playsinline
			class="hero-video"
		></video>
		<div class="hero-overlay"></div>
		<div class="hero-content">
			<h1 class="hero-title">SOURCING</h1>
			<p class="hero-subtitle">Direct relationships, exceptional quality</p>
		</div>
	</section>

	<!-- Sourcing Component -->
	<Sourcing />

	<!-- Direct Trade Section -->
	<section class="direct-trade-section">
		<div class="direct-trade-container">
			<div class="direct-trade-image">
				<video
					src="/bean-burlap.mp4"
					autoplay
					loop
					muted
					playsinline
					class="section-video"
				></video>
			</div>
			<div class="direct-trade-content">
				<h2 class="section-title">DIRECT TRADE</h2>
				<p class="section-text">
					We work directly with coffee farmers, cutting out middlemen to ensure fair compensation 
					and sustainable practices. Our relationships span decades, built on trust, respect, 
					and a shared commitment to excellence.
				</p>
				<p class="section-text">
					By visiting farms personally and cupping samples on-site, we ensure every bean meets 
					our rigorous standards before it ever reaches your cup.
				</p>
			</div>
		</div>
	</section>

	<!-- Regions Section -->
	<section class="regions-section">
		<div class="regions-container">
			<h2 class="section-title">OUR REGIONS</h2>
			<div class="regions-grid">
				<div class="region-card">
					<h3 class="region-name">Ethiopia</h3>
					<p class="region-description">
						The birthplace of coffee. We source from the highlands of Yirgacheffe, 
						known for their floral and citrus notes.
					</p>
				</div>
				<div class="region-card">
					<h3 class="region-name">Colombia</h3>
					<p class="region-description">
						Mountain-grown beans with balanced acidity and rich body. Our Colombian 
						partners practice sustainable farming methods.
					</p>
				</div>
				<div class="region-card">
					<h3 class="region-name">Kenya</h3>
					<p class="region-description">
						Bright, complex coffees from smallholder cooperatives. Known for their 
						distinctive blackcurrant and wine-like flavors.
					</p>
				</div>
				<div class="region-card">
					<h3 class="region-name">Guatemala</h3>
					<p class="region-description">
						Volcanic soil produces coffees with chocolate and spice notes. We work 
						with family farms in Antigua and Huehuetenango.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Quality Standards Section -->
	<section class="quality-section">
		<div class="quality-container">
			<div class="quality-image">
				<video
					src="/bean-hands.mp4"
					autoplay
					loop
					muted
					playsinline
					class="section-video"
				></video>
			</div>
			<div class="quality-content">
				<h2 class="section-title">QUALITY STANDARDS</h2>
				<p class="section-text">
					We cup thousands of samples annually, selecting only the top 1% that meet our 
					exacting standards. Our quality control process includes:
				</p>
				<ul class="quality-list">
					<li>On-site cupping at origin</li>
					<li>Laboratory analysis for defects</li>
					<li>Flavor profile evaluation</li>
					<li>Sustainability certification</li>
					<li>Traceability verification</li>
				</ul>
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

	/* Direct Trade Section */
	.direct-trade-section {
		position: relative;
		width: 100%;
		padding: 4rem 1rem;
		background: #171717;
	}

	@media (min-width: 768px) {
		.direct-trade-section {
			padding: 6rem 2rem;
		}
	}

	@media (min-width: 1024px) {
		.direct-trade-section {
			padding: 8rem 2rem;
		}
	}

	.direct-trade-container {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: stretch;
	}

	@media (min-width: 1024px) {
		.direct-trade-container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
			align-items: center;
		}

		/* Reorder on desktop: content first, video second */
		.direct-trade-content {
			order: 1;
		}

		.direct-trade-image {
			order: 2;
		}
	}

	.direct-trade-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.direct-trade-image {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: 1rem;
		overflow: hidden;
	}

	/* Regions Section */
	.regions-section {
		position: relative;
		width: 100%;
		padding: 4rem 1rem;
		background: #0f0f0f;
	}

	@media (min-width: 768px) {
		.regions-section {
			padding: 6rem 2rem;
		}
	}

	@media (min-width: 1024px) {
		.regions-section {
			padding: 8rem 2rem;
		}
	}

	.regions-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.regions-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-top: 4rem;
	}

	@media (min-width: 768px) {
		.regions-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 3rem;
		}
	}

	.region-card {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		padding: 3rem;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}

	.region-card:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(245, 158, 11, 0.5);
		transform: translateY(-5px);
	}

	.region-name {
		font-size: clamp(1.5rem, 2vw, 2rem);
		font-weight: 700;
		color: #f59e0b;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 1rem 0;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
	}

	.region-description {
		font-size: clamp(0.95rem, 1.2vw, 1.125rem);
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.7;
		margin: 0;
		font-family: 'Georgia', 'Times New Roman', serif;
	}

	/* Quality Section */
	.quality-section {
		position: relative;
		width: 100%;
		padding: 4rem 1rem;
		background: #171717;
	}

	@media (min-width: 768px) {
		.quality-section {
			padding: 6rem 2rem;
		}
	}

	@media (min-width: 1024px) {
		.quality-section {
			padding: 8rem 2rem;
		}
	}

	.quality-container {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: stretch;
	}

	@media (min-width: 1024px) {
		.quality-container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
			align-items: center;
		}
	}

	.quality-image {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: 1rem;
		overflow: hidden;
	}

	.quality-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.section-title {
		font-size: clamp(2rem, 4vw, 3.5rem);
		font-weight: 700;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
	}

	.section-text {
		font-size: clamp(1rem, 1.5vw, 1.25rem);
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.8;
		margin: 0;
		font-family: 'Georgia', 'Times New Roman', serif;
	}

	.section-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.quality-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.quality-list li {
		font-size: clamp(1rem, 1.2vw, 1.125rem);
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.7;
		font-family: 'Georgia', 'Times New Roman', serif;
		padding-left: 2rem;
		position: relative;
	}

	.quality-list li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #f59e0b;
		font-weight: 700;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.direct-trade-container,
		.quality-container {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.regions-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}

	@media (max-width: 768px) {
		.direct-trade-section,
		.regions-section,
		.quality-section {
			padding: 5rem 1.5rem;
		}

		.region-card {
			padding: 2rem;
		}
	}
</style>

