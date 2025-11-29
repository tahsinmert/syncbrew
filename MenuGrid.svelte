<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	interface CoffeeProduct {
		id: number;
		name: string;
		description: string;
		price: string;
		image: string;
		span: string; // CSS grid span (e.g., "span 2", "span 1")
		rowSpan?: string; // Optional row span
	}

	const products: CoffeeProduct[] = [
		{
			id: 1,
			name: 'Espresso',
			description: 'Bold, intense, and full-bodied',
			price: '$3.50',
			image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop',
			span: 'span 2',
			rowSpan: 'span 2'
		},
		{
			id: 2,
			name: 'Americano',
			description: 'Smooth and balanced',
			price: '$4.00',
			image: 'https://images.unsplash.com/photo-1551030173-122297bc8a81?q=80&w=800&auto=format&fit=crop',
			span: 'span 1'
		},
		{
			id: 3,
			name: 'Cappuccino',
			description: 'Rich espresso with velvety foam',
			price: '$4.50',
			image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop',
			span: 'span 1',
			rowSpan: 'span 2'
		},
		{
			id: 4,
			name: 'Latte',
			description: 'Creamy, smooth, and perfectly balanced',
			price: '$5.00',
			image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
			span: 'span 2'
		},
		{
			id: 5,
			name: 'Mocha',
			description: 'Chocolate meets coffee perfection',
			price: '$5.50',
			image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80&fit=crop',
			span: 'span 1'
		},
		{
			id: 6,
			name: 'Macchiato',
			description: 'Espresso with a dollop of foam',
			price: '$4.00',
			image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80&fit=crop',
			span: 'span 1'
		},
		{
			id: 7,
			name: 'Flat White',
			description: 'Double shot with microfoam',
			price: '$4.75',
			image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80&fit=crop',
			span: 'span 2',
			rowSpan: 'span 2'
		},
		{
			id: 8,
			name: 'Cold Brew',
			description: 'Smooth, refreshing, and bold',
			price: '$4.50',
			image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80&fit=crop',
			span: 'span 1'
		},
		{
			id: 9,
			name: 'Cortado',
			description: 'Equal parts espresso and steamed milk',
			price: '$4.25',
			image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80&fit=crop',
			span: 'span 1'
		}
	];

	let gridContainer: HTMLElement;
	let cardElements: HTMLElement[] = [];

	function handleMouseMove(event: MouseEvent, card: HTMLElement, glow: HTMLElement) {
		const rect = card.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		// Calculate rotation based on mouse position
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = ((y - centerY) / centerY) * -8; // Max 8 degrees
		const rotateY = ((x - centerX) / centerX) * 8; // Max 8 degrees

		// Apply 3D transform
		gsap.to(card, {
			duration: 0.3,
			rotationX: rotateX,
			rotationY: rotateY,
			force3D: true,
			ease: 'power2.out'
		});

		// Update glow position (relative to card center)
		const glowX = x - rect.width / 2;
		const glowY = y - rect.height / 2;
		
		gsap.to(glow, {
			duration: 0.3,
			x: glowX,
			y: glowY,
			ease: 'power2.out'
		});
	}

	function handleMouseLeave(card: HTMLElement) {
		gsap.to(card, {
			duration: 0.5,
			rotationX: 0,
			rotationY: 0,
			force3D: true,
			ease: 'power2.out'
		});
	}

	onMount(() => {
		if (!gridContainer) return;

		// Get all card elements
		cardElements = Array.from(gridContainer.querySelectorAll('.menu-card')) as HTMLElement[];

		// Set initial state
		gsap.set(cardElements, {
			opacity: 0,
			y: 60,
			scale: 0.8
		});

		// Create scroll trigger animation with stagger
		ScrollTrigger.create({
			trigger: gridContainer,
			start: 'top 80%',
			onEnter: () => {
				gsap.to(cardElements, {
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.8,
					stagger: 0.1,
					ease: 'power3.out'
				});
			}
		});

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	});
</script>

<div class="menu-grid-container" bind:this={gridContainer}>
	<div class="menu-grid">
		{#each products as product (product.id)}
			<div
				class="menu-card"
				style="grid-column: {product.span}; {product.rowSpan ? `grid-row: ${product.rowSpan};` : ''}"
				onmouseleave={() => {
					const card = document.querySelector(`[data-product-id="${product.id}"]`) as HTMLElement;
					if (card) handleMouseLeave(card);
				}}
			>
				<div
					class="card-content"
					data-product-id={product.id}
					onmousemove={(e) => {
						const card = e.currentTarget.closest('.menu-card') as HTMLElement;
						const glow = e.currentTarget.querySelector('.glow') as HTMLElement;
						if (card && glow) handleMouseMove(e, card, glow);
					}}
				>
					<div class="glow"></div>
					<div class="card-inner">
						<div class="product-image">
							<img 
								src={product.image} 
								alt={product.name}
								loading="lazy"
							/>
						</div>
						<div class="product-info">
							<h3 class="product-name">{product.name}</h3>
							<p class="product-description">{product.description}</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.menu-grid-container {
		width: 100%;
		min-height: 100vh;
		padding: 80px 40px;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.menu-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: minmax(350px, auto);
		gap: 24px;
		max-width: 1400px;
		width: 100%;
	}

	.menu-card {
		position: relative;
		height: 100%;
		min-height: 350px;
		transform-style: preserve-3d;
	}

	.card-content {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 24px;
		cursor: pointer;
		transform-style: preserve-3d;
		perspective: 1000px;
	}

	/* Glassmorphism effect */
	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 24px;
		display: flex;
		flex-direction: column;
		transition: all 0.3s ease;
		z-index: 2;
		overflow: hidden;
	}

	.menu-card:hover .card-inner {
		border-color: rgba(245, 158, 11, 0.5);
		box-shadow: 
			0 12px 48px rgba(0, 0, 0, 0.4),
			0 0 20px rgba(245, 158, 11, 0.2);
	}

	/* Magnetic glow effect */
	.glow {
		position: absolute;
		width: 200px;
		height: 200px;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
		border-radius: 50%;
		pointer-events: none;
		opacity: 0;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		transition: opacity 0.3s ease;
		z-index: 1;
		filter: blur(25px);
		will-change: transform;
	}

	.menu-card:hover .glow {
		opacity: 1;
	}

	.product-image {
		width: 100%;
		height: 70%;
		overflow: hidden;
		position: relative;
		z-index: 1;
	}

	.product-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		transition: transform 0.5s ease;
	}

	.menu-card:hover .product-image img {
		transform: scale(1.1);
	}

	.product-info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 30%;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 24px;
		z-index: 2;
	}

	.product-name {
		font-size: 2rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 8px 0;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
		letter-spacing: 0.02em;
		line-height: 1.2;
	}

	.product-description {
		font-size: 0.95rem;
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
		line-height: 1.5;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
	}

	/* Responsive design */
	@media (max-width: 1200px) {
		.menu-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 768px) {
		.menu-grid-container {
			padding: 60px 20px;
		}

		.menu-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 16px;
		}

		.product-info {
			padding: 20px;
		}

		.product-name {
			font-size: 1.75rem;
		}
	}

	@media (max-width: 480px) {
		.menu-grid {
			grid-template-columns: 1fr;
		}

		.menu-card {
			min-height: 280px;
		}

		.product-info {
			padding: 16px;
		}

		.product-name {
			font-size: 1.5rem;
		}

		.product-description {
			font-size: 0.85rem;
		}
	}
</style>
