<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Navbar from '../../../components/Navbar.svelte';
	import Footer from '../../../components/Footer.svelte';

	gsap.registerPlugin(ScrollTrigger);

	let processHero: HTMLElement;
	let heroVideo: HTMLVideoElement;
	let roastingSection: HTMLElement;
	let grindingSection: HTMLElement;
	let bloomingSection: HTMLElement;
	let extractionSection: HTMLElement;
	let roastCurvePath: SVGPathElement;
	let roastCurveContainer: HTMLElement;
	let bloomVideo: HTMLVideoElement;
	let grindVideo: HTMLVideoElement;
	let grindSectionContainer: HTMLElement;
	let grindTextContainer: HTMLElement;

	// Roast curve data points (temperature over time)
	const roastCurvePoints = [
		{ time: 0, temp: 25 },
		{ time: 60, temp: 100 },
		{ time: 120, temp: 150 },
		{ time: 180, temp: 180 },
		{ time: 240, temp: 200 },
		{ time: 300, temp: 210 },
		{ time: 360, temp: 215 },
		{ time: 420, temp: 218 },
		{ time: 480, temp: 220 }
	];

	function createRoastCurvePath(progress: number): string {
		const points = roastCurvePoints;
		const maxTime = points[points.length - 1].time;
		const maxTemp = Math.max(...points.map(p => p.temp));
		const minTemp = Math.min(...points.map(p => p.temp));
		const tempRange = maxTemp - minTemp;

		const width = 800;
		const height = 400;
		const padding = 60;

		let path = `M ${padding} ${height - padding}`;

		for (let i = 0; i < points.length; i++) {
			const point = points[i];
			const x = padding + (point.time / maxTime) * (width - padding * 2);
			const y = height - padding - ((point.temp - minTemp) / tempRange) * (height - padding * 2);

			if (point.time <= maxTime * progress) {
				if (i === 0) {
					path += ` L ${x} ${y}`;
				} else {
					// Smooth curve using quadratic bezier
					const prevPoint = points[i - 1];
					const prevX = padding + (prevPoint.time / maxTime) * (width - padding * 2);
					const prevY = height - padding - ((prevPoint.temp - minTemp) / tempRange) * (height - padding * 2);
					const cpX = (prevX + x) / 2;
					const cpY = (prevY + y) / 2;
					path += ` Q ${cpX} ${prevY} ${x} ${y}`;
				}
			}
		}

		return path;
	}

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
		// Hero Video - Scale and Parallax
		if (processHero && heroVideo) {
			gsap.fromTo(
				heroVideo,
				{ scale: 1.1 },
				{
					scale: 1,
					duration: 1.5,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: processHero,
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
					trigger: processHero,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		}

		// Grind Video - Slide in from right
		if (grindVideo && grindingSection) {
			gsap.fromTo(
				grindVideo,
				{ x: 50, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 1.2,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: grindingSection,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
		}

		// Grind Text - Stagger from left
		if (grindTextContainer && grindingSection) {
			const textElements = grindTextContainer.querySelectorAll('.grind-header, .grind-subhead, .data-line');
			gsap.fromTo(
				textElements,
				{ x: -50, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 1,
					ease: 'power3.out',
					stagger: 0.15,
					scrollTrigger: {
						trigger: grindingSection,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
		}

		// Bloom Video - Scale and Parallax
		if (bloomVideo && bloomingSection) {
			gsap.fromTo(
				bloomVideo,
				{ scale: 1.1 },
				{
					scale: 1,
					duration: 1.5,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: bloomingSection,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);

			gsap.to(bloomVideo, {
				y: -50,
				ease: 'none',
				scrollTrigger: {
					trigger: bloomingSection,
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

		// Roast curve animation on scroll
		if (roastCurvePath && roastingSection) {
			gsap.to({ progress: 0 }, {
				progress: 1,
				ease: 'none',
				scrollTrigger: {
					trigger: roastingSection,
					start: 'top 80%',
					end: 'bottom 20%',
					scrub: true,
					onUpdate: (self) => {
						const path = createRoastCurvePath(self.progress);
						roastCurvePath.setAttribute('d', path);
					}
				}
			});
		}

		// 4. Grids & Lists (Staggered Entry)
		// Step sections with staggered content
		const sections = [roastingSection, grindingSection, bloomingSection, extractionSection];
		sections.forEach((section) => {
			if (section) {
				// Section container fade in
				gsap.fromTo(
					section,
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0,
						duration: 1,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: section,
							start: 'top 85%',
							toggleActions: 'play none none none'
						}
					}
				);

				// Staggered items within section
				const dataItems = section.querySelectorAll('.data-item, .data-card');
				if (dataItems.length > 0) {
					gsap.set(dataItems, { y: 50, opacity: 0 });
					gsap.to(dataItems, {
						y: 0,
						opacity: 1,
						duration: 1,
						ease: 'power3.out',
						stagger: 0.2,
						scrollTrigger: {
							trigger: section,
							start: 'top 85%',
							toggleActions: 'play none none none'
						}
					});
				}
			}
		});

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	});
</script>

<Navbar />

<div class="page-container">
	<!-- Process Hero Section -->
	<section class="process-hero" bind:this={processHero}>
		<video
			bind:this={heroVideo}
			src="/bean-spill.mp4"
			autoplay
			loop
			muted
			playsinline
			class="hero-video"
		></video>
		<div class="hero-overlay"></div>
		<div class="hero-gradient"></div>
		<div class="hero-content">
			<h1 class="hero-title">THE ALCHEMY</h1>
			<p class="hero-subtitle">Turning raw chaos into liquid perfection.</p>
		</div>
	</section>

	<!-- Step 1: Roasting -->
	<section class="step-section" bind:this={roastingSection}>
		<div class="step-container">
			<div class="step-number">01</div>
			<div class="step-content">
				<h2 class="step-title">ROASTING</h2>
				<p class="step-description">
					The transformation begins at 200°C. We control the roast curve meticulously—each second matters. 
					Too fast, and you lose complexity. Too slow, and bitterness creeps in. The perfect curve unlocks 
					the bean's hidden flavors.
				</p>
				<div class="technical-data">
					<div class="data-item">
						<span class="data-label">TARGET TEMP:</span>
						<span class="data-value">220°C</span>
					</div>
					<div class="data-item">
						<span class="data-label">DURATION:</span>
						<span class="data-value">8:00 MIN</span>
					</div>
					<div class="data-item">
						<span class="data-label">ROAST LEVEL:</span>
						<span class="data-value">MEDIUM-DARK</span>
					</div>
				</div>
				<div class="roast-curve-container" bind:this={roastCurveContainer}>
					<svg class="roast-curve-svg" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
						<!-- Grid lines -->
						<defs>
							<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
								<path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid)" />
						
						<!-- Axes -->
						<line x1="60" y1="340" x2="740" y2="340" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
						<line x1="60" y1="60" x2="60" y2="340" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
						
						<!-- Axis labels -->
						<text x="400" y="380" fill="rgba(255,255,255,0.5)" font-family="Monospace" font-size="12" text-anchor="middle">TIME (SECONDS)</text>
						<text x="20" y="200" fill="rgba(255,255,255,0.5)" font-family="Monospace" font-size="12" text-anchor="middle" transform="rotate(-90 20 200)">TEMPERATURE (°C)</text>
						
						<!-- Temperature markers -->
						<line x1="55" y1="60" x2="65" y2="60" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
						<text x="50" y="65" fill="rgba(255,255,255,0.4)" font-family="Monospace" font-size="10" text-anchor="end">220</text>
						<line x1="55" y1="200" x2="65" y2="200" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
						<text x="50" y="205" fill="rgba(255,255,255,0.4)" font-family="Monospace" font-size="10" text-anchor="end">120</text>
						<line x1="55" y1="340" x2="65" y2="340" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
						<text x="50" y="345" fill="rgba(255,255,255,0.4)" font-family="Monospace" font-size="10" text-anchor="end">25</text>
						
						<!-- Time markers -->
						<line x1="200" y1="335" x2="200" y2="345" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
						<text x="200" y="360" fill="rgba(255,255,255,0.4)" font-family="Monospace" font-size="10" text-anchor="middle">120</text>
						<line x1="400" y1="335" x2="400" y2="345" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
						<text x="400" y="360" fill="rgba(255,255,255,0.4)" font-family="Monospace" font-size="10" text-anchor="middle">240</text>
						<line x1="600" y1="335" x2="600" y2="345" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
						<text x="600" y="360" fill="rgba(255,255,255,0.4)" font-family="Monospace" font-size="10" text-anchor="middle">360</text>
						<line x1="740" y1="335" x2="740" y2="345" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
						<text x="740" y="360" fill="rgba(255,255,255,0.4)" font-family="Monospace" font-size="10" text-anchor="middle">480</text>
						
						<!-- Roast curve path -->
						<path
							bind:this={roastCurvePath}
							class="roast-curve"
							fill="none"
							stroke="rgba(245, 158, 11, 0.8)"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M 60 340"
						/>
					</svg>
				</div>
			</div>
		</div>
	</section>

	<!-- Step 2: The Grind -->
	<section class="grind-section" bind:this={grindingSection}>
		<div class="grind-container max-w-7xl" bind:this={grindSectionContainer}>
			<div class="grind-grid">
				<!-- Text Left -->
				<div class="grind-text-content" bind:this={grindTextContainer}>
					<h2 class="grind-header">UNIFORMITY</h2>
					<p class="grind-subhead">Precision Burr Geometry.</p>
					<div class="grind-data-block">
						<div class="data-line">
							<span class="data-label">TARGET:</span>
							<span class="data-value-amber">20g</span>
						</div>
						<div class="data-line">
							<span class="data-label">SIZE:</span>
							<span class="data-value-amber">300 Microns</span>
						</div>
						<div class="data-line">
							<span class="data-label">RESULT:</span>
							<span class="data-value-amber">Sweetness</span>
						</div>
					</div>
				</div>
				<!-- Video Right -->
				<div class="grind-video-container">
					<video
						bind:this={grindVideo}
						src="/ground-texture.mp4"
						autoplay
						loop
						muted
						playsinline
						class="grind-video"
					></video>
				</div>
			</div>
		</div>
	</section>

	<!-- Step 3: Blooming -->
	<section class="step-section blooming-section" bind:this={bloomingSection}>
		<video
			bind:this={bloomVideo}
			src="/coffee-bloom.mp4"
			autoplay
			loop
			muted
			playsinline
			class="bloom-video"
		></video>
		<div class="bloom-overlay"></div>
		<div class="step-container">
			<div class="step-number">03</div>
			<div class="step-content">
				<h2 class="step-title">BLOOMING</h2>
				<p class="step-description">
					The first contact. Hot water meets ground coffee, and CO2 escapes in a beautiful bloom. 
					This 30-second window is critical—it preps the grounds for even extraction. No bloom, no fresh coffee.
				</p>
				<div class="technical-data">
					<div class="data-item">
						<span class="data-label">BLOOM TIME:</span>
						<span class="data-value">30 SEC</span>
					</div>
					<div class="data-item">
						<span class="data-label">WATER TEMP:</span>
						<span class="data-value">93°C</span>
					</div>
					<div class="data-item">
						<span class="data-label">CO2 RELEASE:</span>
						<span class="data-value">OPTIMAL</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Step 4: Extraction -->
	<section class="step-section" bind:this={extractionSection}>
		<div class="step-container">
			<div class="step-number">04</div>
			<div class="step-content">
				<h2 class="step-title">EXTRACTION</h2>
				<p class="step-description">
					The final phase. Water pressure forces flavor compounds from the coffee grounds. 
					Temperature, pressure, and time must align perfectly. One variable off, and the entire 
					process is compromised.
				</p>
				<div class="technical-data-grid">
					<div class="data-card">
						<div class="data-label">PRESSURE</div>
						<div class="data-value-large">9 BAR</div>
						<div class="data-note">OPTIMAL RANGE: 8-10 BAR</div>
					</div>
					<div class="data-card">
						<div class="data-label">TEMPERATURE</div>
						<div class="data-value-large">93°C</div>
						<div class="data-note">TARGET: 92-94°C</div>
					</div>
					<div class="data-card">
						<div class="data-label">EXTRACTION TIME</div>
						<div class="data-value-large">25 SEC</div>
						<div class="data-note">SWEET SPOT: 23-27 SEC</div>
					</div>
					<div class="data-card">
						<div class="data-label">YIELD</div>
						<div class="data-value-large">36 ML</div>
						<div class="data-note">RATIO: 1:2 (18G IN)</div>
					</div>
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
		min-height: 100vh;
	}

	/* Process Hero Section */
	.process-hero {
		position: relative;
		width: 100%;
		height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.hero-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
	}

	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;
		pointer-events: none;
	}

	.hero-gradient {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(
			circle at center,
			transparent 0%,
			transparent 30%,
			rgba(0, 0, 0, 0.4) 60%,
			rgba(0, 0, 0, 0.8) 100%
		);
		z-index: 2;
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 3;
		text-align: center;
		padding: 2rem;
		transform: translateY(-2.5rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
	}

	.hero-title {
		font-family: 'Monospace', 'Courier New', monospace;
		font-size: clamp(3rem, 10vw, 8rem);
		font-weight: 700;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0;
		text-shadow: 
			0 2px 10px rgba(0, 0, 0, 0.5),
			0 4px 20px rgba(0, 0, 0, 0.4),
			0 0 30px rgba(0, 0, 0, 0.3);
		line-height: 1.1;
	}

	.hero-subtitle {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: clamp(1rem, 2.5vw, 1.75rem);
		font-weight: 400;
		color: #ffffff;
		font-style: italic;
		margin: 0;
		text-shadow: 
			0 2px 8px rgba(0, 0, 0, 0.5),
			0 0 15px rgba(0, 0, 0, 0.3);
		opacity: 0.95;
		letter-spacing: 0.05em;
	}

	/* Step Sections */
	.step-section {
		position: relative;
		width: 100%;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		background: #171717;
	}

	.step-container {
		max-width: 1200px;
		width: 100%;
		display: grid;
		grid-template-columns: 100px 1fr;
		gap: 4rem;
		align-items: start;
	}

	.step-number {
		font-family: 'Monospace', 'Courier New', monospace;
		font-size: clamp(3rem, 6vw, 6rem);
		font-weight: 700;
		color: rgba(255, 255, 255, 0.1);
		line-height: 1;
		writing-mode: vertical-rl;
		text-orientation: mixed;
		transform: rotate(180deg);
	}

	.step-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.step-title {
		font-family: 'Monospace', 'Courier New', monospace;
		font-size: clamp(2rem, 4vw, 3.5rem);
		font-weight: 400;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		margin: 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		padding-bottom: 1rem;
	}

	.step-description {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-size: clamp(1rem, 1.5vw, 1.25rem);
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.8;
		margin: 0;
		max-width: 800px;
	}

	.technical-data {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}

	.data-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-left: 2px solid rgba(245, 158, 11, 0.5);
		background: rgba(0, 0, 0, 0.2);
	}

	.data-label {
		font-family: 'Monospace', 'Courier New', monospace;
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.data-value {
		font-family: 'Monospace', 'Courier New', monospace;
		font-size: 1rem;
		color: #ffffff;
		font-weight: 600;
	}

	/* Roast Curve */
	.roast-curve-container {
		margin-top: 3rem;
		padding: 2rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.3);
		position: relative;
	}

	.roast-curve-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border: 1px solid rgba(255, 255, 255, 0.05);
		pointer-events: none;
	}

	.roast-curve-svg {
		width: 100%;
		height: auto;
		display: block;
	}

	.roast-curve {
		filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.5));
	}

	/* Step 2: The Grind Section */
	.grind-section {
		position: relative;
		width: 100%;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 6rem 2rem;
		background: #171717;
	}

	.grind-container {
		width: 100%;
		max-width: 80rem; /* max-w-7xl equivalent */
		margin: 0 auto;
	}

	.grind-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}

	.grind-text-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.grind-header {
		font-family: 'Monospace', 'Courier New', monospace;
		font-size: clamp(2rem, 4vw, 3.5rem);
		font-weight: 700;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		margin: 0;
		line-height: 1.2;
	}

	.grind-subhead {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: clamp(1.125rem, 1.75vw, 1.5rem);
		font-weight: 400;
		color: rgba(255, 255, 255, 0.7);
		margin: 0;
		font-style: italic;
	}

	.grind-data-block {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
		padding: 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.05);
		background: rgba(0, 0, 0, 0.2);
	}

	.data-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: 'Monospace', 'Courier New', monospace;
		font-size: clamp(0.875rem, 1.25vw, 1rem);
	}

	.data-line .data-label {
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.data-value-amber {
		color: #f59e0b;
		font-weight: 600;
	}

	.grind-video-container {
		position: relative;
		width: 100%;
	}

	.grind-video {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: 0.125rem;
		border: 1px solid rgba(255, 255, 255, 0.05);
		box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
	}

	/* Blueprint Box */
	.blueprint-box {
		margin-top: 3rem;
		position: relative;
		width: 100%;
		height: 400px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.3);
		overflow: hidden;
	}

	.blueprint-grid {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: 
			linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
		background-size: 40px 40px;
	}

	.blueprint-content {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.blueprint-line {
		position: absolute;
		background: rgba(255, 255, 255, 0.1);
	}

	.blueprint-line.horizontal {
		width: 100%;
		height: 1px;
	}

	.blueprint-line.vertical {
		width: 1px;
		height: 100%;
	}

	.blueprint-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.blueprint-label {
		font-family: 'Monospace', 'Courier New', monospace;
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.4);
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}

	.blueprint-value {
		font-family: 'Monospace', 'Courier New', monospace;
		font-size: 1.5rem;
		color: rgba(245, 158, 11, 0.8);
		font-weight: 600;
	}

	/* Blooming Section */
	.blooming-section {
		position: relative;
		padding: 0;
	}

	.bloom-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
		filter: brightness(0.4) contrast(1.1);
	}

	.bloom-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.6) 0%,
			rgba(0, 0, 0, 0.4) 50%,
			rgba(0, 0, 0, 0.6) 100%
		);
		z-index: 1;
	}

	.blooming-section .step-container {
		position: relative;
		z-index: 2;
	}

	/* Extraction Section */
	.technical-data-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		margin-top: 2rem;
	}

	.data-card {
		padding: 2rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.3);
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.data-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border: 1px solid rgba(255, 255, 255, 0.05);
		pointer-events: none;
	}

	.data-card .data-label {
		font-family: 'Monospace', 'Courier New', monospace;
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.15em;
	}

	.data-value-large {
		font-family: 'Monospace', 'Courier New', monospace;
		font-size: clamp(2rem, 4vw, 3rem);
		color: #ffffff;
		font-weight: 600;
		line-height: 1;
	}

	.data-note {
		font-family: 'Monospace', 'Courier New', monospace;
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.4);
		font-style: italic;
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.step-container {
			grid-template-columns: 80px 1fr;
			gap: 3rem;
		}

		.technical-data-grid {
			grid-template-columns: 1fr;
		}

		.grind-grid {
			gap: 3rem;
		}

		.grind-section {
			padding: 4rem 2rem;
		}
	}

	@media (max-width: 768px) {
		.step-section {
			padding: 3rem 1.5rem;
		}

		.step-container {
			grid-template-columns: 60px 1fr;
			gap: 2rem;
		}

		.step-number {
			font-size: 3rem;
		}

		.roast-curve-container {
			padding: 1rem;
		}

		.blueprint-box {
			height: 300px;
		}

		.grind-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.grind-section {
			padding: 3rem 1.5rem;
		}

		.grind-video {
			aspect-ratio: 4 / 3;
		}
	}

	@media (max-width: 640px) {
		.step-section {
			padding: 2rem 1rem;
			min-height: auto;
		}

		.step-container {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.step-number {
			writing-mode: horizontal-tb;
			text-orientation: mixed;
			transform: none;
			font-size: 2rem;
		}

		.data-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.grind-section {
			padding: 2rem 1rem;
			min-height: auto;
		}

		.grind-text-content {
			gap: 1.5rem;
		}

		.grind-data-block {
			padding: 1rem;
		}
	}
</style>

