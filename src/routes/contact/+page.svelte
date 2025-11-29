<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Navbar from '../../../components/Navbar.svelte';
	import Footer from '../../../components/Footer.svelte';
	import { magneticButton } from '../../../src/lib/magneticButton';

	gsap.registerPlugin(ScrollTrigger);

	let pageContainer: HTMLElement;
	let name = '';
	let email = '';
	let subject = '';
	let message = '';

	function handleSubmit(event: Event) {
		event.preventDefault();
		// Handle form submission here
		console.log('Form submitted:', { name, email, subject, message });
		// Reset form
		name = '';
		email = '';
		subject = '';
		message = '';
	}

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

		// Form elements fade in
		const formElements = pageContainer.querySelectorAll('.form-group, .contact-info-item');
		formElements.forEach((element) => {
			gsap.fromTo(
				element,
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1.2,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: element,
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
			src="/cafe-work.mp4"
			autoplay
			loop
			muted
			playsinline
			class="hero-video"
		></video>
		<div class="hero-overlay"></div>
		<div class="hero-content">
			<h1 class="hero-title">CONTACT US</h1>
			<p class="hero-subtitle">We'd love to hear from you</p>
		</div>
	</section>

	<!-- Contact Section -->
	<section class="contact-section">
		<div class="contact-container">
			<!-- Contact Info -->
			<div class="contact-info">
				<h2 class="section-title">GET IN TOUCH</h2>
				<p class="section-text">
					Have a question about our coffee? Want to learn more about our sourcing practices? 
					Or just want to say hello? We're here to help.
				</p>
				
				<div class="contact-info-list">
					<div class="contact-info-item">
						<h3 class="info-label">Email</h3>
						<a href="mailto:hello@syncbrew.com" class="info-value">hello@syncbrew.com</a>
					</div>
					<div class="contact-info-item">
						<h3 class="info-label">Phone</h3>
						<a href="tel:+1234567890" class="info-value">+1 (234) 567-890</a>
					</div>
					<div class="contact-info-item">
						<h3 class="info-label">Address</h3>
						<p class="info-value">123 Coffee Street<br />San Francisco, CA 94102</p>
					</div>
					<div class="contact-info-item">
						<h3 class="info-label">Hours</h3>
						<p class="info-value">Monday - Friday: 8am - 6pm<br />Saturday - Sunday: 9am - 5pm</p>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div class="contact-form-wrapper">
				<form on:submit={handleSubmit} class="contact-form">
					<div class="form-group">
						<label for="name" class="form-label">Name</label>
						<input
							type="text"
							id="name"
							bind:value={name}
							class="form-input"
							required
						/>
					</div>
					<div class="form-group">
						<label for="email" class="form-label">Email</label>
						<input
							type="email"
							id="email"
							bind:value={email}
							class="form-input"
							required
						/>
					</div>
					<div class="form-group">
						<label for="subject" class="form-label">Subject</label>
						<input
							type="text"
							id="subject"
							bind:value={subject}
							class="form-input"
							required
						/>
					</div>
					<div class="form-group">
						<label for="message" class="form-label">Message</label>
						<textarea
							id="message"
							bind:value={message}
							class="form-textarea"
							rows="6"
							required
						></textarea>
					</div>
					<button type="submit" class="submit-button" use:magneticButton>
						Send Message
					</button>
				</form>
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

	/* Contact Section */
	.contact-section {
		position: relative;
		width: 100%;
		padding: 4rem 1rem;
		background: #171717;
	}

	@media (min-width: 768px) {
		.contact-section {
			padding: 6rem 2rem;
		}
	}

	@media (min-width: 1024px) {
		.contact-section {
			padding: 8rem 2rem;
		}
	}

	.contact-container {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	@media (min-width: 1024px) {
		.contact-container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 6rem;
		}
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 3rem;
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

	.contact-info-list {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.contact-info-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.info-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}

	.info-value {
		font-size: clamp(1rem, 1.2vw, 1.25rem);
		color: #ffffff;
		text-decoration: none;
		line-height: 1.6;
		font-family: 'Georgia', 'Times New Roman', serif;
		transition: color 0.3s ease;
	}

	.info-value:hover {
		color: #f59e0b;
	}

	/* Contact Form */
	.contact-form-wrapper {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		padding: 3rem;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.form-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.7);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}

	.form-input,
	.form-textarea {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		padding: 1rem;
		color: #ffffff;
		font-size: 1rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		transition: all 0.3s ease;
		outline: none;
	}

	.form-input::placeholder,
	.form-textarea::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	.form-input:focus,
	.form-textarea:focus {
		border-color: rgba(245, 158, 11, 0.5);
		background: rgba(255, 255, 255, 0.15);
	}

	.form-textarea {
		resize: vertical;
		min-height: 150px;
	}

	.submit-button {
		background: #ffffff;
		color: #000000;
		border: none;
		border-radius: 0.5rem;
		padding: 1rem 2rem;
		font-size: 0.95rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		margin-top: 1rem;
	}

	.submit-button:hover {
		background: rgba(255, 255, 255, 0.9);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		/* Already flex-col by default */
	}

	@media (max-width: 768px) {
		.contact-section {
			padding: 5rem 1.5rem;
		}

		.contact-form-wrapper {
			padding: 2rem;
		}
	}
</style>
