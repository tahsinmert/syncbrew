<script>
	import { isCartOpen, cartCount } from '../stores.js';
	import { fly, fade } from 'svelte/transition';

	function closeCart() {
		isCartOpen.set(false);
	}

	// Mock cart items with the 3 specified items
	const mockItems = [
		{ 
			id: 1, 
			name: 'Ethiopian Yirgacheffe', 
			variant: 'Whole Bean',
			price: '$24.00', 
			image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=200' 
		},
		{ 
			id: 2, 
			name: 'Glass Server', 
			variant: '500ml',
			price: '$28.00', 
			image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=200' 
		},
		{ 
			id: 3, 
			name: 'Coffee Filters', 
			variant: 'Pack of 100',
			price: '$20.00', 
			image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=200' 
		}
	];

	const subtotal = 72.00; // $24 + $28 + $20
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
					{#each mockItems as item}
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
										<p class="text-sm text-stone-400 mb-2">{item.variant}</p>
										<button 
											class="text-xs text-red-400 hover:text-red-300 underline"
											on:click={() => { /* Handle remove */ }}
										>
											Remove
										</button>
									</div>
								</div>

								<!-- Price -->
								<div class="flex items-start">
									<span class="text-xl text-amber-400 font-mono">{item.price}</span>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Footer -->
				<div class="p-8 bg-black/90 border-t border-white/10">
					<!-- Total Row -->
					<div class="flex justify-between items-center mb-6">
						<span class="text-stone-400 uppercase tracking-wider text-lg">Total</span>
						<span class="text-3xl text-white font-mono font-bold">${subtotal.toFixed(2)}</span>
					</div>

					<!-- Checkout Button -->
					<button 
						class="w-full bg-white text-black py-4 uppercase tracking-widest transition-transform hover:scale-[1.02] font-semibold text-lg"
						on:click={() => { /* Handle checkout */ }}
					>
						CHECKOUT NOW
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
