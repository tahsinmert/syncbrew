<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import SEO from '../../lib/components/SEO.svelte';
	import Navbar from '../../../components/Navbar.svelte';
	import Footer from '../../../components/Footer.svelte';
	import Subscription from '../../../components/Subscription.svelte';
	import ShopTestimonial from '../../../components/ShopTestimonial.svelte';
	import { cart } from '../../stores/cart';
	import { currentRoute } from '../../stores/router';
	import { createRipple } from '../../lib/utils/rippleEffect';
	import { imageReveal } from '../../lib/utils/imageReveal';

	gsap.registerPlugin(ScrollTrigger);

	type Category = 'all' | 'beans' | 'equipment' | 'merch';

	interface Product {
		id: number;
		name: string;
		price: string;
		image: string;
		category: 'beans' | 'equipment' | 'merch';
	}

	const products: Product[] = [
		// Beans
		{
			id: 1,
			name: 'Ethiopian Yirgacheffe',
			price: '$24.00',
			image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
			category: 'beans'
		},
		{
			id: 2,
			name: 'Colombian Supremo',
			price: '$22.00',
			image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop',
			category: 'beans'
		},
		{
			id: 3,
			name: 'Kenyan AA',
			price: '$26.00',
			image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
			category: 'beans'
		},
		{
			id: 4,
			name: 'Guatemalan Antigua',
			price: '$23.00',
			image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop',
			category: 'beans'
		},
		{
			id: 5,
			name: 'Sumatran Mandheling',
			price: '$25.00',
			image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
			category: 'beans'
		},
		{
			id: 6,
			name: 'Costa Rican Tarrazu',
			price: '$24.00',
			image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop',
			category: 'beans'
		},
		// Equipment
		{
			id: 7,
			name: 'French Press',
			price: '$45.00',
			image: 'https://images.unsplash.com/photo-1517668808823-f8f16e90975a?q=80&w=800&auto=format&fit=crop',
			category: 'equipment'
		},
		{
			id: 8,
			name: 'Pour Over Set',
			price: '$38.00',
			image: 'https://images.unsplash.com/photo-1517668808823-f8f16e90975a?q=80&w=800&auto=format&fit=crop',
			category: 'equipment'
		},
		{
			id: 9,
			name: 'Coffee Grinder',
			price: '$89.00',
			image: 'https://images.unsplash.com/photo-1517668808823-f8f16e90975a?q=80&w=800&auto=format&fit=crop',
			category: 'equipment'
		},
		{
			id: 10,
			name: 'AeroPress',
			price: '$32.00',
			image: 'https://images.unsplash.com/photo-1517668808823-f8f16e90975a?q=80&w=800&auto=format&fit=crop',
			category: 'equipment'
		},
		{
			id: 11,
			name: 'Scale & Timer',
			price: '$55.00',
			image: 'https://images.unsplash.com/photo-1517668808823-f8f16e90975a?q=80&w=800&auto=format&fit=crop',
			category: 'equipment'
		},
		{
			id: 12,
			name: 'Cold Brew Maker',
			price: '$42.00',
			image: 'https://images.unsplash.com/photo-1517668808823-f8f16e90975a?q=80&w=800&auto=format&fit=crop',
			category: 'equipment'
		},
		// Merch
		{
			id: 13,
			name: 'SyncBrew T-Shirt',
			price: '$28.00',
			image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
			category: 'merch'
		},
		{
			id: 14,
			name: 'Coffee Mug Set',
			price: '$35.00',
			image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop',
			category: 'merch'
		},
		{
			id: 15,
			name: 'Canvas Tote Bag',
			price: '$18.00',
			image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
			category: 'merch'
		},
		{
			id: 16,
			name: 'Coffee Art Print',
			price: '$22.00',
			image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop',
			category: 'merch'
		}
	];

	let selectedCategory: Category = 'all';
	let gridContainer: HTMLElement;
	let toastVisible = false;
	let toastMessage = '';

	function filterProducts() {
		if (selectedCategory === 'all') {
			return products;
		}
		return products.filter((p) => p.category === selectedCategory);
	}

	function handleAddToCart(product: Product, event: MouseEvent) {
		const button = event.currentTarget as HTMLElement;
		if (button) createRipple(event, button);
		
		cart.addItem({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image
		});

		// Show toast
		toastMessage = 'Added to Cart';
		toastVisible = true;

		setTimeout(() => {
			toastVisible = false;
		}, 2000);
	}

	function handleMouseMove(event: MouseEvent, card: HTMLElement, glow: HTMLElement) {
		const rect = card.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = ((y - centerY) / centerY) * -8;
		const rotateY = ((x - centerX) / centerX) * 8;

		gsap.to(card, {
			duration: 0.3,
			rotationX: rotateX,
			rotationY: rotateY,
			force3D: true,
			ease: 'power2.out'
		});

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
		// Check URL for category query parameter
		if (typeof window !== 'undefined') {
			const urlParams = new URLSearchParams(window.location.search);
			const categoryParam = urlParams.get('category');
			if (categoryParam === 'beans' || categoryParam === 'equipment' || categoryParam === 'merch') {
				selectedCategory = categoryParam;
			} else if (categoryParam === 'machines') {
				selectedCategory = 'equipment';
			}
		}

		// 1. Typography Reveal (Headings h1, h2)
		const headings = document.querySelectorAll('.page-container h1, .page-container h2');
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

		// 3. Images & Videos (Parallax & Scale & Reveal)
		const images = document.querySelectorAll('.page-container .product-image img');
		images.forEach((img) => {
			// Scale effect
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
			
			// Image reveal effect
			imageReveal(img as HTMLElement, { direction: 'left', duration: 1.2 });
		});

		// 4. Grids & Lists (Staggered Entry)
		if (!gridContainer) return;

		const cardElements = Array.from(
			gridContainer.querySelectorAll('.product-card')
		) as HTMLElement[];

		gsap.set(cardElements, {
			opacity: 0,
			y: 50
		});

		gsap.to(cardElements, {
			opacity: 1,
			y: 0,
			duration: 1,
			ease: 'power3.out',
			stagger: 0.2,
			scrollTrigger: {
				trigger: gridContainer,
				start: 'top 85%',
				toggleActions: 'play none none none'
			}
		});

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});

	// Generate JSON-LD Structured Data for Rich Snippets
	$: baseUrl = typeof window !== 'undefined' 
		? window.location.origin 
		: 'https://syncbrew.com';

	$: structuredData = {
		'@context': 'https://schema.org',
		'@graph': [
			// Organization Schema
			{
				'@type': 'Organization',
				'@id': `${baseUrl}/#organization`,
				'name': 'SyncBrew',
				'url': baseUrl,
				'logo': `${baseUrl}/syncbrew-logo.png`,
				'description': 'Premium coffee beans, brewing equipment, and merchandise. Taste the Future.',
				'contactPoint': {
					'@type': 'ContactPoint',
					'email': 'hello@syncbrew.com',
					'telephone': '+1-234-567-890',
					'contactType': 'Customer Service'
				},
				'address': {
					'@type': 'PostalAddress',
					'streetAddress': '123 Coffee Street',
					'addressLocality': 'San Francisco',
					'addressRegion': 'CA',
					'postalCode': '94102',
					'addressCountry': 'US'
				},
				'sameAs': []
			},
			// ItemList Schema with Products
			{
				'@type': 'ItemList',
				'@id': `${baseUrl}/shop#itemlist`,
				'name': 'SyncBrew Shop - Premium Coffee Products',
				'description': 'Shop premium coffee beans, brewing equipment, and merchandise',
				'itemListElement': products.map((product, index) => {
					// Extract numeric price from string (e.g., "$24.00" -> "24.00")
					const priceMatch = product.price.match(/\$?([\d.]+)/);
					const numericPrice = priceMatch ? priceMatch[1] : '0.00';
					
					// Generate description based on category
					let description = '';
					if (product.category === 'beans') {
						description = `Premium ${product.name} whole bean coffee. Fresh roasted, single origin specialty coffee.`;
					} else if (product.category === 'equipment') {
						description = `${product.name} - Professional coffee brewing equipment for the perfect cup.`;
					} else {
						description = `${product.name} - Official SyncBrew merchandise.`;
					}

					return {
						'@type': 'ListItem',
						'position': index + 1,
						'item': {
							'@type': 'Product',
							'@id': `${baseUrl}/shop#product-${product.id}`,
							'name': product.name,
							'image': product.image,
							'description': description,
							'category': product.category === 'beans' 
								? 'Coffee Beans' 
								: product.category === 'equipment' 
									? 'Coffee Equipment' 
									: 'Merchandise',
							'offers': {
								'@type': 'Offer',
								'price': numericPrice,
								'priceCurrency': 'USD',
								'availability': 'https://schema.org/InStock',
								'url': `${baseUrl}/shop`,
								'seller': {
									'@id': `${baseUrl}/#organization`
								}
							},
							'brand': {
								'@id': `${baseUrl}/#organization`
							}
						}
					};
				})
			}
		]
	};

	$: structuredDataJson = JSON.stringify(structuredData);
</script>

<SEO 
	title="Shop Premium Beans & Gear"
	description="Order fresh roasted coffee beans, drippers, and barista tools online. Free shipping on subscriptions."
/>

<svelte:head>
	<script type="application/ld+json">
		{@html structuredDataJson}
	</script>
</svelte:head>

<Navbar />

<div class="page-container">
	<!-- Shop Header -->
	<section class="shop-header">
		<h1 class="shop-title">PANTRY & PROVISIONS</h1>
		<div class="category-filters">
			<button
				class="filter-pill"
				class:active={selectedCategory === 'all'}
				onclick={() => (selectedCategory = 'all')}
			>
				All
			</button>
			<button
				class="filter-pill"
				class:active={selectedCategory === 'beans'}
				onclick={() => (selectedCategory = 'beans')}
			>
				Beans
			</button>
			<button
				class="filter-pill"
				class:active={selectedCategory === 'equipment'}
				onclick={() => (selectedCategory = 'equipment')}
			>
				Equipment
			</button>
			<button
				class="filter-pill"
				class:active={selectedCategory === 'merch'}
				onclick={() => (selectedCategory = 'merch')}
			>
				Merch
			</button>
		</div>
	</section>

	<!-- Product Grid -->
	<section class="products-section">
		<div class="products-grid" bind:this={gridContainer}>
			{#each filterProducts() as product (product.id)}
				<div
					class="product-card"
					onmouseleave={() => {
						const card = document.querySelector(
							`[data-product-id="${product.id}"]`
						) as HTMLElement;
						if (card) handleMouseLeave(card);
					}}
				>
					<div
						class="card-content"
						data-product-id={product.id}
						onmousemove={(e) => {
							const card = e.currentTarget.closest('.product-card') as HTMLElement;
							const glow = e.currentTarget.querySelector('.glow') as HTMLElement;
							if (card && glow) handleMouseMove(e, card, glow);
						}}
					>
						<div class="glow"></div>
						<div class="card-inner">
							<div class="product-image">
								<img src={product.image} alt={product.name} loading="lazy" />
							</div>
							<div class="product-info">
								<h3 class="product-name">{product.name}</h3>
								<div class="product-footer">
									<span class="product-price">{product.price}</span>
									<button
										class="add-to-cart-btn"
										onclick={(e) => handleAddToCart(product, e)}
									>
										Add to Cart
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Testimonial Section -->
	<ShopTestimonial />

	<!-- Subscription Banner -->
	<section class="subscription-section">
		<div class="subscription-wrapper">
			<h2 class="subscription-headline">Don't want to shop every week?</h2>
			<Subscription />
		</div>
	</section>
</div>

<!-- Toast Notification -->
{#if toastVisible}
	<div class="toast" transition:fade>
		{toastMessage}
	</div>
{/if}

<Footer />

<style>
	.page-container {
		position: relative;
		width: 100%;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
		min-height: 100dvh;
	}

	/* Shop Header */
	.shop-header {
		padding: 100px 24px 40px;
		text-align: center;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
	}

	@media (min-width: 768px) {
		.shop-header {
			padding: 120px 40px 60px;
		}
	}

	.shop-title {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: clamp(2.5rem, 6vw, 5rem);
		font-weight: 700;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 3rem 0;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
	}

	.category-filters {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.filter-pill {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: #ffffff;
		padding: 0.75rem 2rem;
		border-radius: 2rem;
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.filter-pill:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.4);
		transform: translateY(-2px);
	}

	.filter-pill.active {
		background: #ffffff;
		color: #000000;
		border-color: #ffffff;
		box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
	}

	/* Products Section */
	.products-section {
		padding: 20px;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
	}

	@media (min-width: 768px) {
		.products-section {
			padding: 40px;
		}
	}

	.products-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
		max-width: 1400px;
		margin: 0 auto;
	}

	@media (min-width: 768px) {
		.products-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 20px;
		}
	}

	@media (min-width: 1024px) {
		.products-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 24px;
		}
	}

	.product-card {
		position: relative;
		height: 100%;
		min-height: 400px;
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

	.product-card:hover .card-inner {
		border-color: rgba(245, 158, 11, 0.5);
		box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4), 0 0 20px rgba(245, 158, 11, 0.2);
	}

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

	.product-card:hover .glow {
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

	.product-card:hover .product-image img {
		transform: scale(1.1);
	}

	.product-info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 30%;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, transparent 100%);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 24px;
		z-index: 2;
	}

	.product-name {
		font-size: 1.5rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 12px 0;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
		letter-spacing: 0.02em;
		line-height: 1.2;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
	}

	.product-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.product-price {
		font-size: 1.25rem;
		font-weight: 600;
		color: #f59e0b;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
	}

	.add-to-cart-btn {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: #ffffff;
		padding: 0.625rem 1.25rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
		opacity: 0;
		transform: translateY(10px);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.product-card:hover .add-to-cart-btn {
		opacity: 1;
		transform: translateY(0);
	}

	.add-to-cart-btn:hover {
		background: #ffffff;
		color: #000000;
		border-color: #ffffff;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
	}

	/* Subscription Section */
	.subscription-section {
		padding: 40px 24px;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
	}

	@media (min-width: 768px) {
		.subscription-section {
			padding: 60px 40px;
		}
	}

	@media (min-width: 1024px) {
		.subscription-section {
			padding: 80px 40px;
		}
	}

	.subscription-wrapper {
		max-width: 1400px;
		margin: 0 auto;
	}

	.subscription-headline {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 700;
		color: #ffffff;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 3rem 0;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
	}

	/* Toast Notification */
	.toast {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		background: #ffffff;
		color: #000000;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
		z-index: 1000;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
		animation: slideInRight 0.3s ease;
	}

	:global(.ripple-effect) {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.6);
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 10;
	}

	@keyframes slideInRight {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}


	/* Responsive Design */
	@media (max-width: 768px) {
		.shop-header {
			padding: 100px 20px 40px;
		}

		.products-section {
			padding: 20px;
		}

		.product-card {
			min-height: 350px;
		}

		.product-info {
			padding: 20px;
		}

		.product-name {
			font-size: 1.25rem;
		}

		.product-footer {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}

		.add-to-cart-btn {
			width: 100%;
			opacity: 1;
			transform: translateY(0);
		}

		.subscription-section {
			padding: 60px 20px;
		}

		.toast {
			bottom: 1rem;
			right: 1rem;
			left: 1rem;
			right: auto;
		}
	}

	@media (max-width: 480px) {
		/* Already 1 column by default */

		.product-card {
			min-height: 300px;
		}

		.product-info {
			padding: 16px;
		}

		.product-name {
			font-size: 1.125rem;
		}
	}
</style>

