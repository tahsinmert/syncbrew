<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let container: HTMLElement;
	let card: HTMLElement;

	onMount(() => {
		if (!container || !card) return;

		gsap.set(card, {
			opacity: 0,
			x: 100,
			y: 30
		});

		ScrollTrigger.create({
			trigger: container,
			start: 'top 80%',
			onEnter: () => {
				gsap.to(card, {
					opacity: 1,
					x: 0,
					y: 0,
					duration: 1,
					ease: 'power3.out'
				});
			}
		});

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<section class="testimonial-section" bind:this={container}>
	<div class="testimonial-card" bind:this={card}>
		<div class="card-content">
			<!-- Video Section -->
			<div class="video-wrapper">
				<div class="video-container">
					<video
						src="/morning-sun.mp4"
						autoplay
						loop
						muted
						playsinline
						class="testimonial-video"
					></video>
				</div>
			</div>

			<!-- Text Content -->
			<div class="text-content">
				<div class="rating">
					<span class="star">★</span>
					<span class="star">★</span>
					<span class="star">★</span>
					<span class="star">★</span>
					<span class="star">★</span>
				</div>
				<blockquote class="quote">
					<span class="quote-mark">"</span>
					It's not just caffeine, it's the best part of my morning. The aroma fills the whole house.
					<span class="quote-mark">"</span>
				</blockquote>
				<p class="author">– Sarah M., Verified Buyer</p>
			</div>
		</div>
	</div>
</section>

<style>
	.testimonial-section {
		padding: 80px 40px;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
	}

	.testimonial-card {
		max-width: 1400px;
		margin: 0 auto;
		background: rgba(28, 25, 23, 0.95); /* bg-stone-900 with opacity */
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 2rem;
		overflow: hidden;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.card-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
		align-items: center;
		min-height: 500px;
	}

	.video-wrapper {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}

	.video-container {
		width: 100%;
		height: 100%;
		min-height: 500px;
		position: relative;
		overflow: hidden;
	}

	.testimonial-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 0;
		display: block;
	}

	.text-content {
		padding: 4rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		justify-content: center;
		height: 100%;
	}

	.rating {
		display: flex;
		gap: 0.5rem;
		font-size: 1.75rem;
	}

	.star {
		color: #fbbf24; /* text-amber-400 */
		line-height: 1;
	}

	.quote {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-style: italic;
		color: #ffffff;
		line-height: 1.6;
		margin: 0;
		position: relative;
	}

	.quote-mark {
		color: #fbbf24; /* text-amber-400 */
		font-size: 1.5em;
		line-height: 0;
		vertical-align: -0.2em;
	}

	.author {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
		font-size: 0.875rem;
		color: #a3a3a3; /* text-gray-400 */
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.testimonial-section {
			padding: 60px 40px;
		}

		.card-content {
			grid-template-columns: 1fr;
			min-height: auto;
		}

		.video-container {
			min-height: 400px;
		}

		.text-content {
			padding: 3rem;
		}
	}

	@media (max-width: 768px) {
		.testimonial-section {
			padding: 40px 20px;
		}

		.testimonial-card {
			border-radius: 1.5rem;
		}

		.video-container {
			min-height: 350px;
		}

		.text-content {
			padding: 2.5rem 2rem;
			gap: 1.5rem;
		}

		.rating {
			font-size: 1.5rem;
		}

		.quote {
			font-size: clamp(1.25rem, 4vw, 1.75rem);
		}
	}

	@media (max-width: 480px) {
		.testimonial-section {
			padding: 30px 16px;
		}

		.video-container {
			min-height: 300px;
		}

		.text-content {
			padding: 2rem 1.5rem;
			gap: 1.25rem;
		}

		.rating {
			font-size: 1.25rem;
		}

		.quote {
			font-size: clamp(1.125rem, 5vw, 1.5rem);
		}
	}
</style>

