<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { magneticButton } from '../src/lib/magneticButton';

	gsap.registerPlugin(ScrollTrigger);

	let container: HTMLElement;
	let contentSection: HTMLElement;
	let videoSection: HTMLElement;

	onMount(() => {
		if (!container || !contentSection || !videoSection) return;

		// Animate content from left
		gsap.fromTo(
			contentSection,
			{
				opacity: 0,
				x: -50
			},
			{
				opacity: 1,
				x: 0,
				duration: 1.2,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: container,
					start: 'top 80%',
					end: 'top 50%',
					scrub: false,
					once: true
				}
			}
		);

		// Animate video from right
		gsap.fromTo(
			videoSection,
			{
				opacity: 0,
				x: 50
			},
			{
				opacity: 1,
				x: 0,
				duration: 1.2,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: container,
					start: 'top 80%',
					end: 'top 50%',
					scrub: false,
					once: true
				}
			}
		);

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	});
</script>

<section class="subscription-section" bind:this={container}>
	<div class="container">
		<div class="grid">
			<!-- Left: Content & CTA -->
			<div class="content-wrapper" bind:this={contentSection}>
				<h2 class="headline">BRING THE CAFE HOME.</h2>
				<p class="subtext">
					Premium drip bags and fresh roasts delivered to your door. Never run out of your morning ritual.
				</p>
				
				<ul class="features-list">
					<li class="feature-item">
						<svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Roasted to Order</span>
					</li>
					<li class="feature-item">
						<svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Free Shipping</span>
					</li>
					<li class="feature-item">
						<svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Cancel Anytime</span>
					</li>
				</ul>

				<button class="cta-button" use:magneticButton>
					Start Subscription
				</button>
			</div>

			<!-- Right: Video -->
			<div class="video-wrapper" bind:this={videoSection}>
				<div class="video-container">
					<video
						src="/home-subscription.mp4"
						autoplay
						loop
						muted
						playsinline
						class="subscription-video"
					></video>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.subscription-section {
		background: #171717; /* bg-neutral-900 */
		width: 100%;
		margin: 0;
		padding: 0;
	}

	.container {
		max-width: 72rem; /* max-w-6xl */
		margin: 0 auto;
		padding: 5rem 1.5rem; /* py-20, px-6 */
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem; /* gap-16 */
		align-items: center;
	}

	.content-wrapper {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		opacity: 0;
	}

	.headline {
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		color: #ffffff;
		margin: 0;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}

	.subtext {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-size: clamp(1rem, 1.5vw, 1.125rem);
		color: #a3a3a3; /* text-neutral-400 */
		line-height: 1.7;
		margin: 0;
		font-weight: 400;
	}

	.features-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.feature-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: #ffffff;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-size: 1rem;
		font-weight: 400;
	}

	.check-icon {
		width: 1.25rem;
		height: 1.25rem;
		color: #ffffff;
		flex-shrink: 0;
	}

	.cta-button {
		background: #ffffff;
		color: #000000;
		border: none;
		border-radius: 0.5rem;
		padding: 1rem 2rem;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		align-self: flex-start;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.cta-button:hover {
		background: #b91c1c; /* bg-red-700 */
		color: #ffffff;
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(185, 28, 28, 0.3);
	}

	.cta-button:active {
		transform: translateY(0);
	}

	.video-wrapper {
		opacity: 0;
	}

	.video-container {
		position: relative;
		border-radius: 2rem; /* rounded-[2rem] */
		overflow: hidden;
		box-shadow: 0 25px 50px -12px rgba(185, 28, 28, 0.4); /* shadow-2xl shadow-red-900/40 */
		aspect-ratio: 16 / 9;
	}

	.subscription-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Tablet adjustments */
	@media (max-width: 1024px) {
		.container {
			padding: 4rem 1.5rem;
		}

		.grid {
			gap: 3rem;
		}

		.headline {
			font-size: clamp(2rem, 4.5vw, 3rem);
		}
	}

	/* Mobile: Stack vertically */
	@media (max-width: 768px) {
		.container {
			padding: 3rem 1.5rem;
		}

		.grid {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.content-wrapper {
			order: 1;
		}

		.video-wrapper {
			order: 2;
		}

		.headline {
			font-size: clamp(1.875rem, 6vw, 2.5rem);
		}

		.subtext {
			font-size: clamp(0.95rem, 2vw, 1rem);
		}

		.feature-item {
			font-size: 0.95rem;
		}

		.cta-button {
			width: 100%;
			align-self: stretch;
		}
	}

	@media (max-width: 640px) {
		.container {
			padding: 2.5rem 1rem;
		}

		.grid {
			gap: 2.5rem;
		}

		.content-wrapper {
			gap: 1.5rem;
		}

		.headline {
			font-size: clamp(1.75rem, 7vw, 2.25rem);
		}

		.video-container {
			border-radius: 1.5rem;
		}
	}
</style>
