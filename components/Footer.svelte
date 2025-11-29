<script lang="ts">
	import { magneticButton } from '../src/lib/magneticButton';
	
	let email = '';
	
	function handleSubscribe() {
		if (email.trim()) {
			// Handle subscription logic here
			console.log('Subscribing:', email);
			email = '';
		}
	}
</script>

<footer class="footer">
	<!-- Background Video -->
	<video
		src="/footer-brew.mp4"
		autoplay
		loop
		muted
		playsinline
		class="footer-video"
	></video>
	
	<!-- Dark Overlay -->
	<div class="footer-overlay"></div>
	
	<!-- Content Container -->
	<div class="footer-content">
		<div class="footer-grid">
			<!-- Column 1: Brand -->
			<div class="footer-col">
				<h3 class="footer-brand">SYNCBREW</h3>
				<p class="footer-slogan">Taste the Future</p>
			</div>
			
			<!-- Column 2: Shop -->
			<div class="footer-col">
				<h4 class="footer-heading">Shop</h4>
				<ul class="footer-links">
					<li><a href="#beans">Beans</a></li>
					<li><a href="#machines">Machines</a></li>
					<li><a href="#merch">Merch</a></li>
				</ul>
			</div>
			
			<!-- Column 3: Company -->
			<div class="footer-col">
				<h4 class="footer-heading">Company</h4>
				<ul class="footer-links">
					<li><a href="#story">Our Story</a></li>
					<li><a href="#sourcing">Sourcing</a></li>
					<li><a href="#contact">Contact</a></li>
				</ul>
			</div>
			
			<!-- Column 4: Newsletter -->
			<div class="footer-col">
				<h4 class="footer-heading">Stay Caffeinated.</h4>
				<form on:submit|preventDefault={handleSubscribe} class="newsletter-form">
					<input
						type="email"
						bind:value={email}
						placeholder="your@email.com"
						class="newsletter-input"
						required
					/>
					<button type="submit" class="newsletter-button" use:magneticButton>
						Subscribe
					</button>
				</form>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		width: 100%;
		min-height: 60vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.footer-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
	}

	.footer-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.6) 100%);
		z-index: 2;
	}

	.footer-content {
		position: relative;
		z-index: 3;
		width: 100%;
		max-width: 1280px;
		margin: 0 auto;
		padding: 4rem 2rem;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 3rem;
	}

	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.footer-brand {
		font-size: 2rem;
		font-weight: 900;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		margin: 0;
		line-height: 1.2;
	}

	.footer-slogan {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.7);
		margin: 0;
		font-weight: 400;
	}

	.footer-heading {
		font-size: 0.75rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.4);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 0.5rem 0;
	}

	.footer-links {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.footer-links a {
		color: #ffffff;
		text-decoration: none;
		font-size: 0.95rem;
		transition: color 0.3s ease;
	}

	.footer-links a:hover {
		color: #f59e0b; /* amber-500 */
	}

	.newsletter-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.newsletter-input {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 0.5rem;
		padding: 0.875rem 1rem;
		color: #ffffff;
		font-size: 0.95rem;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: all 0.3s ease;
		outline: none;
	}

	.newsletter-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.newsletter-input:focus {
		border-color: rgba(255, 255, 255, 0.6);
		background: rgba(255, 255, 255, 0.15);
	}

	.newsletter-button {
		background: #ffffff;
		color: #000000;
		border: none;
		border-radius: 0.5rem;
		padding: 0.875rem 1.5rem;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.newsletter-button:hover {
		background: rgba(255, 255, 255, 0.9);
		transform: translateY(-1px);
	}

	.newsletter-button:active {
		transform: translateY(0);
	}

	/* Tablet: 2 columns */
	@media (max-width: 1024px) {
		.footer-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 2.5rem;
		}

		.footer-content {
			padding: 3rem 2rem;
		}
	}

	/* Mobile: 1 column */
	@media (max-width: 768px) {
		.footer {
			min-height: 50vh;
		}

		.footer-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.footer-content {
			padding: 2.5rem 1.5rem;
		}

		.footer-brand {
			font-size: 1.75rem;
		}

		.newsletter-form {
			gap: 0.875rem;
		}
	}

	@media (max-width: 640px) {
		.footer-content {
			padding: 2rem 1rem;
		}

		.footer-grid {
			gap: 1.5rem;
		}
	}
</style>

