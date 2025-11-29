<script lang="ts">
    import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Navbar from '../../../components/Navbar.svelte';
	import Footer from '../../../components/Footer.svelte';
	import { cart, type CartItem } from '../../stores/cart';
	import { navigate } from '../../stores/router';
	import { animateNumber } from '../../lib/utils/numberCounter';
	import { createRipple } from '../../lib/utils/rippleEffect';

	gsap.registerPlugin(ScrollTrigger);

	let cartContainer: HTMLElement;
	let emptyState: HTMLElement;
	let totalValueElement: HTMLElement;
	let subtotalValueElement: HTMLElement;
    let shipping = 12.00;

	$: subtotal = $cart.reduce((sum: number, item: CartItem) => {
		const price = parseFloat(item.price.replace('$', ''));
		return sum + price * item.quantity;
	}, 0);

    $: total = subtotal + shipping;

	function increment(id: number) {
		const item = $cart.find((i: CartItem) => i.id === id);
		if (item) {
			cart.updateQuantity(id, item.quantity + 1);
		}
	}

	function decrement(id: number) {
		const item = $cart.find((i: CartItem) => i.id === id);
		if (item && item.quantity > 1) {
			cart.updateQuantity(id, item.quantity - 1);
		} else if (item) {
			cart.removeItem(id);
		}
	}

	function removeItem(id: number) {
		cart.removeItem(id);
	}

	function handleCheckout(event: MouseEvent) {
		if ($cart.length === 0) return;
		const button = event.currentTarget as HTMLElement;
		if (button) createRipple(event, button);
		// Navigate to checkout or show checkout modal
		setTimeout(() => {
			alert('Checkout functionality coming soon!');
		}, 300);
	}

	function handleContinueShopping(event?: MouseEvent) {
		if (event) {
			const button = event.currentTarget as HTMLElement;
			if (button) createRipple(event, button);
			setTimeout(() => navigate('/shop'), 300);
		} else {
			navigate('/shop');
		}
	}

    onMount(() => {
		// Animate cart items on mount
		if (cartContainer) {
			const items = cartContainer.querySelectorAll('.cart-item');
			
			gsap.set(items, {
				opacity: 0,
				y: 30
			});

			gsap.to(items, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: 'power3.out',
				stagger: 0.1,
				delay: 0.2
			});
		}

		// Animate summary section
		const summary = document.querySelector('.cart-summary');
		if (summary) {
			gsap.fromTo(
				summary,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: 'power3.out',
					delay: 0.4,
					scrollTrigger: {
						trigger: summary,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
		}

		// Animate numbers with counter
		if (totalValueElement && subtotalValueElement) {
			gsap.delayedCall(0.6, () => {
				animateNumber(subtotalValueElement, subtotal, { prefix: '$', duration: 1 });
				animateNumber(totalValueElement, total, { prefix: '$', duration: 1.2 });
			});
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
		};
	});
</script>

<Navbar />

<div class="cart-page">
	<!-- Background Video -->
	<div class="cart-background">
		<video
			src="/cart-brew.mp4"
			autoplay
			loop
			muted
			playsinline
			class="background-video"
		></video>
		<div class="background-overlay"></div>
            </div>

	<!-- Content -->
	<div class="cart-container">
		{#if $cart.length === 0}
			<!-- Empty State -->
			<div class="empty-state" bind:this={emptyState}>
				<div class="empty-content">
					<h1 class="empty-title">Your Cart is Empty</h1>
					<p class="empty-text">Looks like you haven't added anything to your cart yet.</p>
					<button class="shop-button" on:click={(e) => handleContinueShopping(e)}>
                Continue Shopping
					</button>
				</div>
			</div>
		{:else}
			<!-- Cart Header -->
			<div class="cart-header">
				<div class="header-content">
					<h1 class="cart-title">Your Selection</h1>
					<p class="cart-subtitle">Review your items</p>
        </div>
				<button class="continue-shopping-btn" on:click={(e) => handleContinueShopping(e)}>
					Continue Shopping
				</button>
                    </div>

			<!-- Cart Content -->
			<div class="cart-content">
				<!-- Cart Items -->
				<div class="cart-items-section" bind:this={cartContainer}>
					{#each $cart as item (item.id)}
						<div class="cart-item">
							<div class="item-image">
								<img src={item.image} alt={item.name} loading="lazy" />
                            </div>
							<div class="item-details">
								<div class="item-header">
									<h3 class="item-name">{item.name}</h3>
									<span class="item-price">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                        </div>
								<div class="item-controls">
									<div class="quantity-controls">
										<button
											class="quantity-btn"
											on:click={() => decrement(item.id)}
											aria-label="Decrease quantity"
										>
											−
										</button>
										<span class="quantity-value">{item.quantity}</span>
										<button
											class="quantity-btn"
											on:click={() => increment(item.id)}
											aria-label="Increase quantity"
										>
											+
										</button>
                            </div>
									<button
										class="remove-btn"
										on:click={() => removeItem(item.id)}
										aria-label="Remove item"
									>
										Remove
									</button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

				<!-- Cart Summary -->
				<div class="cart-summary">
					<div class="summary-content">
						<div class="summary-row">
							<span class="summary-label">Subtotal</span>
							<span class="summary-value" bind:this={subtotalValueElement}>${subtotal.toFixed(2)}</span>
            </div>
						<div class="summary-row">
							<span class="summary-label">Shipping</span>
							<span class="summary-value">${shipping.toFixed(2)}</span>
            </div>
						<div class="summary-divider"></div>
						<div class="summary-row total-row">
							<span class="summary-label">Total</span>
							<span class="summary-value total-value" bind:this={totalValueElement}>${total.toFixed(2)}</span>
            </div>
						<button class="checkout-btn" on:click={(e) => handleCheckout(e)}>
                Check Out
            </button>
        </div>
				</div>
    </div>
		{/if}
        </div>
    </div>

<Footer />

<style>
	.cart-page {
		position: relative;
		width: 100%;
		min-height: 100dvh;
		background: #050505;
		color: #ffffff;
		overflow-x: hidden;
	}

	.cart-background {
		position: relative;
		width: 100%;
		height: 30vh;
		z-index: 0;
		display: block;
		margin-bottom: 2rem;
	}

	@media (min-width: 1024px) {
		.cart-background {
			position: fixed;
			top: 0;
			right: 0;
			width: 40%;
			height: 100dvh;
			margin-bottom: 0;
		}
	}

	.background-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.background-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		z-index: 1;
	}

	.cart-container {
		position: relative;
		z-index: 10;
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: 100px 24px 40px;
	}

	@media (min-width: 768px) {
		.cart-container {
			padding: 120px 40px 60px;
		}
	}

	@media (min-width: 1024px) {
		.cart-container {
			padding: 140px 40px 80px;
		}
	}

	/* Cart Header */
	.cart-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding-bottom: 24px;
		margin-bottom: 48px;
		flex-wrap: wrap;
		gap: 24px;
	}

	.header-content {
		flex: 1;
	}

	.cart-title {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 8px 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.cart-subtitle {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		margin: 0;
	}

	.continue-shopping-btn {
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: #f59e0b;
		padding: 0.75rem 1.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
		white-space: nowrap;
	}

	.continue-shopping-btn:hover {
		border-color: #f59e0b;
		background: rgba(245, 158, 11, 0.1);
		color: #ffffff;
		transform: translateY(-2px);
	}

	/* Cart Content */
	.cart-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;
	}

	@media (min-width: 1024px) {
		.cart-content {
			grid-template-columns: 1fr 400px;
		}
	}

	/* Cart Items */
	.cart-items-section {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.cart-item {
		display: flex;
		gap: 24px;
		padding: 24px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		transition: all 0.3s ease;
	}

	.cart-item:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(245, 158, 11, 0.3);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}

	.item-image {
		width: 120px;
		height: 120px;
		flex-shrink: 0;
		border-radius: 12px;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.3);
	}

	.item-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.item-details {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 16px;
	}

	.item-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 16px;
	}

	.item-name {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: 1.5rem;
		font-weight: 600;
		color: #ffffff;
		margin: 0;
		line-height: 1.3;
	}

	.item-price {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		color: #f59e0b;
		white-space: nowrap;
	}

	.item-controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
	}

	.quantity-controls {
		display: flex;
		align-items: center;
		gap: 12px;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 8px 12px;
	}

	.quantity-btn {
		background: transparent;
		border: none;
		color: #ffffff;
		font-size: 1.25rem;
		font-weight: 300;
		cursor: pointer;
		padding: 4px 8px;
		transition: all 0.2s ease;
		line-height: 1;
	}

	.quantity-btn:hover {
		color: #f59e0b;
		transform: scale(1.2);
	}

	.quantity-value {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
		font-size: 1rem;
		font-weight: 500;
		color: #ffffff;
		min-width: 30px;
		text-align: center;
	}

	.remove-btn {
		background: transparent;
		border: none;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.875rem;
		font-weight: 400;
		cursor: pointer;
		text-decoration: underline;
		transition: all 0.2s ease;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
	}

	.remove-btn:hover {
		color: #ef4444;
	}

	/* Cart Summary */
	.cart-summary {
		position: sticky;
		top: 120px;
		height: fit-content;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		padding: 32px;
	}

	.summary-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.summary-label {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.6);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
	}

	.summary-value {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.6);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
	}

	.summary-divider {
		width: 100%;
		height: 1px;
		background: rgba(255, 255, 255, 0.1);
		margin: 8px 0;
	}

	.total-row {
		margin-top: 8px;
	}

	.total-row .summary-label {
		font-size: 1.25rem;
		color: #ffffff;
		font-weight: 600;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
	}

	.total-value {
		font-size: 2rem;
		color: #ffffff;
		font-weight: 700;
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
	}

	.checkout-btn {
		width: 100%;
		background: #ffffff;
		color: #000000;
		border: none;
		padding: 16px 24px;
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		cursor: pointer;
		border-radius: 8px;
		transition: all 0.3s ease;
		margin-top: 8px;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
	}

	.checkout-btn:hover {
		background: #f59e0b;
		color: #ffffff;
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(245, 158, 11, 0.4);
	}

	.checkout-btn:active {
		transform: translateY(0);
	}

	:global(.ripple-effect) {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.6);
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 10;
	}

	/* Empty State */
	.empty-state {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		text-align: center;
	}

	.empty-content {
		max-width: 500px;
		padding: 48px;
	}

	.empty-title {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 16px 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.empty-text {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.6);
		margin: 0 0 32px 0;
		line-height: 1.6;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
	}

	.shop-button {
		background: #ffffff;
		color: #000000;
		border: none;
		padding: 16px 32px;
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		cursor: pointer;
		border-radius: 8px;
		transition: all 0.3s ease;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
	}

	.shop-button:hover {
		background: #f59e0b;
		color: #ffffff;
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(245, 158, 11, 0.4);
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.cart-content {
			grid-template-columns: 1fr;
		}

		.cart-summary {
			position: relative;
			top: 0;
		}
	}

	@media (max-width: 768px) {
		.cart-container {
			padding: 100px 20px 40px;
		}

		.cart-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.cart-item {
			flex-direction: column;
			gap: 16px;
		}

		.item-image {
			width: 100%;
			height: 200px;
		}

		.item-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.item-controls {
			flex-direction: column;
			align-items: stretch;
		}

		.quantity-controls {
			justify-content: center;
		}

		.remove-btn {
			text-align: center;
		}

		.cart-summary {
			padding: 24px;
		}
	}

	@media (max-width: 480px) {
		.cart-container {
			padding: 100px 16px 40px;
		}

		.cart-title {
			font-size: clamp(1.75rem, 5vw, 2.5rem);
		}

		.item-name {
			font-size: 1.125rem;
		}

		.item-price {
			font-size: 1rem;
		}

		.total-value {
			font-size: 1.5rem;
		}
	}
</style>
