<script>
	import { onMount } from 'svelte';
	import HomePage from './src/routes/+page.svelte';
	import OriginPage from './src/routes/origin/+page.svelte';
	import ProcessPage from './src/routes/process/+page.svelte';
	import ShopPage from './src/routes/shop/+page.svelte';
	import ReservationPage from './src/routes/reservation/+page.svelte';
	import CartPage from './src/routes/cart/+page.svelte';
	import StoryPage from './src/routes/story/+page.svelte';
	import SourcingPage from './src/routes/sourcing/+page.svelte';
	import ContactPage from './src/routes/contact/+page.svelte';
	import { currentRoute, initRouter } from './src/stores/router';
	import PageTransition from './src/lib/components/PageTransition.svelte';
	import Preloader from './src/lib/components/Preloader.svelte';
	import { preloaderComplete } from './src/lib/stores';
	import Navbar from './components/Navbar.svelte';

	let contentVisible = false;

	// Subscribe to preloader completion
	$: if ($preloaderComplete) {
		contentVisible = true;
	}

	onMount(() => {
		initRouter();
		
		// Initially hide body overflow to prevent flash
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
			
			// Re-enable overflow when preloader completes
			const unsubscribe = preloaderComplete.subscribe((complete) => {
				if (complete) {
					setTimeout(() => {
						document.body.style.overflow = '';
					}, 100);
				}
			});

			return () => {
				unsubscribe();
				document.body.style.overflow = '';
			};
		}
	});
</script>

<!-- Preloader at the very top -->
<Preloader />

<!-- Main content - hidden until preloader completes -->
<div class="main-content" class:visible={contentVisible}>
	<Navbar />
	<PageTransition />

	{#key $currentRoute}
	{#if $currentRoute === '/'}
		<HomePage />
	{:else if $currentRoute === '/origin'}
		<OriginPage />
	{:else if $currentRoute === '/process'}
		<ProcessPage />
	{:else if $currentRoute.startsWith('/shop')}
		<ShopPage />
	{:else if $currentRoute === '/reservation'}
		<ReservationPage />
	{:else if $currentRoute === '/cart'}
		<CartPage />
	{:else if $currentRoute === '/story'}
		<StoryPage />
	{:else if $currentRoute === '/sourcing'}
		<SourcingPage />
	{:else if $currentRoute === '/contact'}
		<ContactPage />
	{:else}
		<HomePage />
	{/if}
	{/key}
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}
	
	:global(html, body) {
		width: 100%;
		height: 100%;
	}

	.main-content {
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
	}

	.main-content.visible {
		opacity: 1;
		visibility: visible;
	}

	.app-container {
		position: relative;
		width: 100%;
		min-height: 100vh;
	}

	.noise-texture {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('http://googleusercontent.com/image_collection/image_retrieval/17604644822115687045_0');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		opacity: 0.15;
		mix-blend-mode: overlay;
		pointer-events: none;
		z-index: 1;
	}
</style>

