<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Navbar from '../../../components/Navbar.svelte';
	import Footer from '../../../components/Footer.svelte';
	import { navigate } from '../../stores/router';

	gsap.registerPlugin(ScrollTrigger);

	let heroContainer: HTMLElement;
	let heroVideo: HTMLVideoElement;
	let heroContent: HTMLElement;
	let timelineContainer: HTMLElement;
	let farmersContainer: HTMLElement;
	let qualitySection: HTMLElement;
	let qualityVideo: HTMLVideoElement;
	let qualityCard: HTMLElement;
	let sanctuarySection: HTMLElement;
	let sanctuaryVideo: HTMLVideoElement;
	let sanctuaryContent: HTMLElement;

	const timelineMilestones = [
		{ 
			year: '1985', 
			title: 'The First Seed', 
			description: 'Our grandfather planted the first Typica variety on the volcanic slopes.',
			image: 'https://source.unsplash.com/random/400x300/?seedling,coffee,plant'
		},
		{ 
			year: '2008', 
			title: 'Direct Trade', 
			description: 'We cut out the middlemen to ensure fair wages for our community.',
			image: 'https://source.unsplash.com/random/400x300/?handshake,fairtrade,coffee'
		},
		{ 
			year: '2024', 
			title: 'Global Recognition', 
			description: 'SyncBrew is named \'Roaster of the Year\'.',
			image: 'https://source.unsplash.com/random/400x300/?award,trophy,coffee'
		}
	];

	const farmers = [
		{ name: 'Maria Santos', role: 'Head Cultivator', image: '/placeholder-farmer-1.jpg' },
		{ name: 'Carlos Mendez', role: 'Quality Specialist', image: '/placeholder-farmer-2.jpg' },
		{ name: 'Ana Rodriguez', role: 'Sustainability Lead', image: '/placeholder-farmer-3.jpg' }
	];

	onMount(() => {
		// 1. Typography Reveal (Headings h1, h2)
		const headings = document.querySelectorAll('.page-container h1, .page-container h2, .page-container h3');
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

		// 2. Paragraphs & Subtext (Fade Up)
		const paragraphs = document.querySelectorAll('.page-container p, .page-container span');
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

		// 3. Images & Videos (Parallax & Scale)
		// Hero Video - Scale effect
		if (heroVideo && heroContainer) {
			gsap.fromTo(
				heroVideo,
				{ scale: 1.1 },
				{
					scale: 1,
					duration: 1.5,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: heroContainer,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);

			// Parallax effect
			gsap.to(heroVideo, {
				y: -100,
				ease: 'none',
				scrollTrigger: {
					trigger: heroContainer,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		}

		// Quality Video - Scale and Parallax
		if (qualityVideo && qualitySection) {
			gsap.fromTo(
				qualityVideo,
				{ scale: 1.1 },
				{
					scale: 1,
					duration: 1.5,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: qualitySection,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);

			gsap.to(qualityVideo, {
				y: -50,
				ease: 'none',
				scrollTrigger: {
					trigger: qualitySection,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		}

		// Sanctuary Video - Scale and Parallax
		if (sanctuaryVideo && sanctuarySection) {
			gsap.fromTo(
				sanctuaryVideo,
				{ scale: 1.1 },
				{
					scale: 1,
					duration: 1.5,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: sanctuarySection,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);

			gsap.to(sanctuaryVideo, {
				y: -50,
				ease: 'none',
				scrollTrigger: {
					trigger: sanctuarySection,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		}

		// All images
		const images = document.querySelectorAll('.page-container img');
		images.forEach((img) => {
			gsap.fromTo(
				img,
				{ scale: 1.1 },
				{
					scale: 1,
					duration: 1.5,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: img,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
		});

		// Hero Content fade in
		if (heroContent) {
			gsap.fromTo(
				heroContent,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 1.2,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: heroContainer,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
		}

		// 4. Grids & Lists (Staggered Entry)
		// Timeline items
		if (timelineContainer) {
			const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
			gsap.set(timelineItems, { y: 50, opacity: 0 });
			gsap.to(timelineItems, {
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',
				stagger: 0.2,
				scrollTrigger: {
					trigger: timelineContainer,
					start: 'top 85%',
					toggleActions: 'play none none none'
				}
			});
		}

		// Farmers Grid animations
		if (farmersContainer) {
			const farmerCards = farmersContainer.querySelectorAll('.farmer-card');
			gsap.set(farmerCards, { y: 50, opacity: 0 });
			gsap.to(farmerCards, {
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',
				stagger: 0.2,
				scrollTrigger: {
					trigger: farmersContainer,
					start: 'top 85%',
					toggleActions: 'play none none none'
				}
			});
		}

		// Quality Selection - Glass card fade in
		if (qualityCard) {
			gsap.fromTo(
				qualityCard,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 1.2,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: qualitySection,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
		}

		// Sanctuary Section - Fade in animation
		if (sanctuarySection && sanctuaryContent) {
			gsap.fromTo(
				sanctuaryContent,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 1.2,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: sanctuarySection,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
		}

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	});
</script>

<Navbar />

<div class="page-container">
	<!-- Hero Section -->
	<section class="hero-section" bind:this={heroContainer}>
		<video
			bind:this={heroVideo}
			src="/plantation-culture.mp4"
			autoplay
			loop
			muted
			playsinline
			class="hero-video"
		></video>
		
		<!-- Vignette overlay -->
		<div class="vignette-overlay"></div>

		<!-- Hero Content -->
		<div class="hero-content" bind:this={heroContent}>
			<h1 class="hero-title">ROOTS & HERITAGE</h1>
			<p class="hero-subtitle">Respecting the soil that feeds us.</p>
		</div>
	</section>

	<!-- Timeline Section -->
	<section class="timeline-section">
		<div class="timeline-container" bind:this={timelineContainer}>
			<div class="timeline-line"></div>
			
			{#each timelineMilestones as milestone, index}
				<div class="timeline-item" class:timeline-left={index % 2 === 0} class:timeline-right={index % 2 !== 0}>
					<div class="timeline-dot"></div>
					<div class="timeline-content">
						{#if milestone.image}
							<img src={milestone.image} alt={milestone.title} class="timeline-image" loading="lazy" />
						{/if}
						<div class="timeline-text">
							<div class="timeline-year">{milestone.year}</div>
							<h3 class="timeline-title">{milestone.title}</h3>
							<p class="timeline-description">{milestone.description}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- The Farmers Grid -->
	<section class="farmers-section">
		<div class="farmers-container">
			<h2 class="farmers-title">Meet the Hands</h2>
			<div class="farmers-grid" bind:this={farmersContainer}>
				{#each farmers as farmer}
					<div class="farmer-card">
						<div class="farmer-image-wrapper">
							<div class="farmer-image-placeholder">
								<span class="farmer-initial">{farmer.name.charAt(0)}</span>
							</div>
						</div>
						<div class="farmer-info">
							<h3 class="farmer-name">{farmer.name}</h3>
							<p class="farmer-role">{farmer.role}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Quality Selection Section -->
	<section class="quality-selection-section" bind:this={qualitySection}>
		<div class="quality-video-container">
			<video
				bind:this={qualityVideo}
				src="/bean-burlap.mp4"
				autoplay
				loop
				muted
				playsinline
				class="quality-video"
			></video>
		</div>
		<div class="quality-overlay"></div>
		<div class="quality-content">
			<div class="quality-glass-card" bind:this={qualityCard}>
				<h2 class="quality-title">THE TOP 1%</h2>
				<p class="quality-body">We cup thousands of samples. We select only the few that speak to us.</p>
			</div>
		</div>
	</section>

	<!-- Final Destination: Your Sanctuary -->
	<section class="sanctuary-section" bind:this={sanctuarySection}>
		<div class="sanctuary-container">
			<h2 class="sanctuary-title">YOUR SANCTUARY</h2>
			<div class="sanctuary-video-wrapper" bind:this={sanctuaryContent}>
				<video
					bind:this={sanctuaryVideo}
					src="/cafe-reading.mp4"
					autoplay
					loop
					muted
					playsinline
					class="sanctuary-video"
				></video>
				<div class="sanctuary-overlay-text">
					<p class="sanctuary-quote">From our soil to your soul. The journey ends here, in your moment of pause.</p>
				</div>
			</div>
			<a 
				href="/" 
				class="sanctuary-link"
				on:click={(e) => { e.preventDefault(); navigate('/'); }}
			>
				Back to Home
			</a>
		</div>
	</section>
</div>

<Footer />

<style>
	.page-container {
		position: relative;
		width: 100%;
		background: #171717; /* bg-neutral-900 equivalent */
		min-height: 100vh;
	}

	/* Hero Section */
	.hero-section {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #0a0a0a;
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

	.hero-title {
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

	.hero-subtitle {
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

	/* Timeline Section */
	.timeline-section {
		position: relative;
		width: 100%;
		background: #171717;
		padding: 8rem 2rem;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.timeline-container {
		position: relative;
		max-width: 1200px;
		width: 100%;
		padding: 0 2rem;
	}

	.timeline-line {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 2px;
		background: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0.3),
			rgba(255, 255, 255, 0.1)
		);
		transform: translateX(-50%);
		z-index: 1;
	}

	.timeline-item {
		position: relative;
		width: calc(50% - 2rem);
		margin-bottom: 6rem;
	}

	.timeline-item.timeline-left {
		left: 0;
		text-align: right;
	}

	.timeline-item.timeline-right {
		left: 50%;
		margin-left: 2rem;
		text-align: left;
	}

	.timeline-dot {
		position: absolute;
		top: 50%;
		width: 20px;
		height: 20px;
		background: #f59e0b; /* amber-500 */
		border-radius: 50%;
		transform: translateY(-50%);
		box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
		z-index: 3;
	}

	.timeline-item.timeline-left .timeline-dot {
		right: calc(-2rem - 10px); /* Position dot exactly on center line: item ends at (50% - 2rem), dot center should be at 50% */
		transform: translateY(-50%);
	}

	.timeline-item.timeline-right .timeline-dot {
		left: calc(-2rem - 10px); /* Position dot exactly on center line */
		transform: translateY(-50%);
	}

	.timeline-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background: rgba(12, 10, 9, 0.5); /* bg-stone-900/50 */
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		padding: 1.5rem; /* p-6 */
		border-radius: 0.75rem; /* rounded-xl */
		border: 1px solid rgba(255, 255, 255, 0.05);
		opacity: 1; /* Always visible */
	}

	.timeline-item.timeline-left .timeline-content {
		align-items: flex-end;
	}

	.timeline-item.timeline-right .timeline-content {
		align-items: flex-start;
	}

	.timeline-image {
		width: 100%;
		max-width: 400px;
		height: 300px;
		object-fit: cover;
		border-radius: 0.5rem;
		opacity: 0.9;
	}

	.timeline-text {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.timeline-item.timeline-left .timeline-text {
		text-align: right;
		align-items: flex-end;
	}

	.timeline-item.timeline-right .timeline-text {
		text-align: left;
		align-items: flex-start;
	}

	.timeline-year {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		color: #d6d3d1; /* text-stone-300 */
		text-transform: uppercase;
		margin-bottom: 0.5rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}

	.timeline-title {
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 700;
		color: #ffffff; /* text-white */
		margin: 0 0 0.75rem 0;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
	}

	.timeline-description {
		font-size: clamp(0.95rem, 1.5vw, 1.125rem);
		color: #d6d3d1; /* text-stone-300 */
		line-height: 1.6;
		margin: 0;
		font-family: 'Georgia', 'Times New Roman', serif;
	}

	/* Farmers Section */
	.farmers-section {
		position: relative;
		width: 100%;
		background: #171717;
		padding: 8rem 2rem;
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.farmers-container {
		max-width: 1200px;
		width: 100%;
	}

	.farmers-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		color: #ffffff;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 5rem 0;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
	}

	.farmers-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem;
	}

	.farmer-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.farmer-card:hover {
		transform: translateY(-8px);
	}

	.farmer-image-wrapper {
		width: 100%;
		aspect-ratio: 3 / 4;
		overflow: hidden;
		border-radius: 0.5rem;
		margin-bottom: 1.5rem;
		position: relative;
	}

	.farmer-image-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		filter: grayscale(100%);
		transition: filter 0.5s ease, transform 0.5s ease;
	}

	.farmer-card:hover .farmer-image-placeholder {
		filter: grayscale(0%);
		transform: scale(1.05);
	}

	.farmer-initial {
		font-size: 4rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.3);
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		transition: color 0.5s ease;
	}

	.farmer-card:hover .farmer-initial {
		color: rgba(255, 255, 255, 0.8);
	}

	.farmer-info {
		text-align: center;
	}

	.farmer-name {
		font-size: 1.5rem;
		font-weight: 600;
		color: #ffffff;
		margin: 0 0 0.5rem 0;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
	}

	.farmer-role {
		font-size: 0.875rem;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.6);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}

	/* Quality Selection Section */
	.quality-selection-section {
		position: relative;
		width: 100%;
		height: 60vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.quality-video-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.quality-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
	}

	.quality-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(120, 53, 15, 0.6); /* amber-900/60 */
		z-index: 1;
		pointer-events: none;
	}

	.quality-content {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.quality-glass-card {
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		background-color: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 2.5rem;
		border-radius: 0;
		text-align: center;
		max-width: 600px;
	}

	.quality-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		margin: 0 0 1.5rem 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-stretch: condensed;
		line-height: 1.2;
	}

	.quality-body {
		font-size: clamp(1rem, 2vw, 1.25rem);
		font-weight: 400;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1.6;
		margin: 0;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.timeline-container {
			padding: 0 1rem;
		}

		.timeline-item {
			width: 48%;
		}

		.farmers-grid {
			gap: 2rem;
		}
	}

	@media (max-width: 768px) {
		.hero-content {
			padding: 1rem;
			gap: 1rem;
		}

		.timeline-section {
			padding: 5rem 1rem;
		}

		.timeline-container {
			padding: 0;
		}

		.timeline-line {
			left: 1rem;
		}

		.timeline-item {
			width: calc(100% - 3rem);
			left: 0 !important;
			margin-left: 3rem !important;
		}

		.timeline-item.timeline-left .timeline-content,
		.timeline-item.timeline-right .timeline-content {
			align-items: flex-start !important;
		}

		.timeline-item.timeline-left .timeline-text,
		.timeline-item.timeline-right .timeline-text {
			text-align: left !important;
			align-items: flex-start !important;
		}

		.timeline-item.timeline-left .timeline-dot,
		.timeline-item.timeline-right .timeline-dot {
			left: -2.5rem !important;
			right: auto !important;
			transform: translateX(-50%) translateY(-50%) !important;
		}

		.timeline-image {
			max-width: 100%;
			height: 250px;
		}

		.farmers-section {
			padding: 5rem 1rem;
		}

		.farmers-grid {
			grid-template-columns: 1fr;
			gap: 3rem;
			max-width: 400px;
			margin: 0 auto;
		}

		.farmers-title {
			margin-bottom: 3rem;
		}

		.quality-glass-card {
			padding: 2rem;
			max-width: 90%;
		}

		.quality-title {
			font-size: 1.75rem;
			margin-bottom: 1rem;
		}

		.quality-body {
			font-size: 0.95rem;
		}
	}

	@media (max-width: 640px) {
		.timeline-item {
			padding-left: 2.5rem;
			margin-bottom: 4rem;
		}

		.farmers-section {
			padding: 4rem 1rem;
		}

		.quality-selection-section {
			height: 50vh;
		}

		.quality-content {
			padding: 1rem;
		}

		.quality-glass-card {
			padding: 1.5rem;
		}

		.quality-title {
			font-size: 1.5rem;
			letter-spacing: 0.1em;
		}

		.quality-body {
			font-size: 0.875rem;
		}
	}

	/* Sanctuary Section */
	.sanctuary-section {
		position: relative;
		width: 100%;
		height: 80vh;
		background: #0f172a; /* bg-slate-900 */
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
	}

	.sanctuary-container {
		width: 100%;
		max-width: 1200px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
	}

	.sanctuary-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		margin: 0;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		text-align: center;
	}

	.sanctuary-video-wrapper {
		position: relative;
		width: 100%;
		max-width: 1024px; /* max-w-5xl */
		aspect-ratio: 16 / 9;
		border-radius: 0.75rem; /* rounded-xl */
		overflow: hidden;
		box-shadow: 
			0 25px 50px -12px rgba(0, 0, 0, 0.5),
			0 0 30px rgba(0, 0, 0, 0.8); /* shadow-2xl */
	}

	.sanctuary-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.sanctuary-overlay-text {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 2rem;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.8) 0%,
			rgba(0, 0, 0, 0.4) 50%,
			transparent 100%
		);
		pointer-events: none;
	}

	.sanctuary-quote {
		font-size: clamp(0.875rem, 1.5vw, 1.125rem);
		font-weight: 400;
		color: #ffffff;
		font-style: italic;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		line-height: 1.6;
		margin: 0;
		text-shadow: 
			0 2px 8px rgba(0, 0, 0, 0.8),
			0 0 15px rgba(0, 0, 0, 0.5);
		max-width: 70%;
	}

	.sanctuary-link {
		font-size: clamp(0.875rem, 1.2vw, 1rem);
		font-weight: 400;
		color: #ffffff;
		text-decoration: none;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		cursor: pointer;
		transition: opacity 0.3s ease;
		animation: gentlePulse 3s ease-in-out infinite;
	}

	.sanctuary-link:hover {
		opacity: 0.8;
		text-decoration: underline;
	}

	@keyframes gentlePulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}

	/* Responsive adjustments for Sanctuary Section */
	@media (max-width: 768px) {
		.sanctuary-section {
			height: 70vh;
			padding: 3rem 1rem;
		}

		.sanctuary-container {
			gap: 1.5rem;
		}

		.sanctuary-title {
			font-size: 2rem;
		}

		.sanctuary-video-wrapper {
			max-width: 100%;
		}

		.sanctuary-overlay-text {
			padding: 1.5rem;
		}

		.sanctuary-quote {
			max-width: 85%;
			font-size: 0.875rem;
		}
	}

	@media (max-width: 640px) {
		.sanctuary-section {
			height: 60vh;
			padding: 2rem 1rem;
		}

		.sanctuary-title {
			font-size: 1.75rem;
			margin-bottom: 0.5rem;
		}

		.sanctuary-container {
			gap: 1rem;
		}

		.sanctuary-overlay-text {
			padding: 1rem;
		}

		.sanctuary-quote {
			max-width: 90%;
			font-size: 0.8rem;
		}

		.sanctuary-link {
			font-size: 0.75rem;
		}
	}
</style>

