<script lang="ts">
	import { isCartOpen } from '../stores.js';
	import { cart, cartCount } from '../../stores/cart';
	import { fly, fade } from 'svelte/transition';
	import { derived } from 'svelte/store';

	function closeCart() {
		isCartOpen.set(false);
	}

	function removeItem(id: number) {
		cart.removeItem(id);
	}

	// Calculate subtotal from cart items
	const subtotal = derived(cart, ($cart) => {
		return $cart.reduce((sum, item) => {
			const price = parseFloat(item.price.replace('$', ''));
			return sum + (price * item.quantity);
		}, 0);
	});
</script>

{#if $isCartOpen}
	<!-- Backdrop Overlay -->
	<div 
		class="fixed inset-0 bg-black/60 z-[90]"
		on:click={closeCart} 
		transition:fade={{ duration: 300 }}
	>
		<!-- Drawer Container -->
		<div
			class="fixed right-0 top-0 h-full w-full md:w-[500px] z-[100] flex flex-col relative"
			on:click|stopPropagation
			transition:fly={{ x: 500, duration: 400 }}
		>
			<!-- Background Video -->
			<video 
				autoplay
				loop
				muted
				playsinline
				class="absolute inset-0 w-full h-full object-cover"
			>
				<source src="/cart-brew.mp4" type="video/mp4" />
			</video>

			<!-- Glassmorphism Overlay -->
			<div class="absolute inset-0 bg-stone-950/85 backdrop-blur-md"></div>

			<!-- Content Container -->
			<div class="relative z-10 flex flex-col h-full">
				<!-- Header -->
				<div class="flex flex-row justify-between items-center p-8 border-b border-white/10">
					<h2 class="text-white font-serif font-bold tracking-widest uppercase">YOUR BREW</h2>
					<button 
						class="w-10 h-10 text-white hover:text-amber-400 transition-colors flex items-center justify-center text-2xl"
						on:click={closeCart}
						aria-label="Close cart"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-7 h-7">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>

				<!-- Product List -->
				<div class="flex-1 overflow-y-auto p-8">
					{#if $cart.length === 0}
						<div class="flex flex-col items-center justify-center h-full text-center">
							<p class="text-stone-400 text-lg mb-2">Your cart is empty</p>
							<p class="text-stone-500 text-sm">Add some items to get started</p>
						</div>
					{:else}
						{#each $cart as item}
							<div class="bg-black/40 rounded-xl p-4 mb-4 border border-white/5">
								<div class="flex flex-row gap-4">
									<!-- Image -->
									<img 
										src={item.image} 
										alt={item.name} 
										class="w-20 h-20 rounded-lg object-cover flex-shrink-0"
									/>
									
									<!-- Details -->
									<div class="flex-1 flex flex-col justify-between min-w-0">
										<div>
											<h3 class="text-lg text-white font-serif mb-1">{item.name}</h3>
											<p class="text-sm text-stone-400 mb-2">Quantity: {item.quantity}</p>
											<button 
												class="text-xs text-red-400 hover:text-red-300 underline"
												on:click={() => removeItem(item.id)}
											>
												Remove
											</button>
										</div>
									</div>

									<!-- Price -->
									<div class="flex flex-col items-end">
										<span class="text-xl text-amber-400 font-mono">{item.price}</span>
										{#if item.quantity > 1}
											<span class="text-sm text-stone-500">× {item.quantity}</span>
										{/if}
									</div>
								</div>
							</div>
						{/each}
					{/if}
				</div>

				<!-- Footer -->
				<div class="p-8 bg-black/90 border-t border-white/10">
					<!-- Total Row -->
					<div class="flex justify-between items-center mb-6">
						<span class="text-stone-400 uppercase tracking-wider text-lg">Total</span>
						<span class="text-3xl text-white font-mono font-bold">${$subtotal.toFixed(2)}</span>
					</div>

					<!-- Checkout Button -->
					<button 
						class="w-full bg-white text-black py-4 uppercase tracking-widest transition-transform hover:scale-[1.02] font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
						on:click={() => { /* Handle checkout */ }}
						disabled={$cart.length === 0}
					>
						CHECKOUT NOW
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
