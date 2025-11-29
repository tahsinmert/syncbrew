<script lang="ts">
	import { onMount } from 'svelte';
	import PageTransition from '../lib/components/PageTransition.svelte';
	import Preloader from '../lib/components/Preloader.svelte';
	import CookieConsent from '../lib/components/CookieConsent.svelte';
	import { preloaderComplete } from '../lib/stores.js';
	import { isTransitioning } from '../stores/router';
	import { initSmoothScroll } from '../lib/utils/smoothScroll';
	import '../app.css';

	let contentVisible = false;

	// Subscribe to preloader completion
	$: if ($preloaderComplete) {
		contentVisible = true;
	}

	onMount(() => {
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
		
		// Initialize smooth scroll after a delay
		setTimeout(() => {
			initSmoothScroll();
		}, 1000);
	});
</script>

<!-- Preloader at the very top -->
<Preloader />

<!-- Main content - hidden until preloader completes -->
<div class="main-content" class:visible={contentVisible}>
	<PageTransition />
	<div class="page-content" class:hidden={$isTransitioning}>
		<slot />
	</div>
</div>

<!-- Cookie Consent Banner -->
<CookieConsent />

<style>
	.main-content {
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
	}

	.main-content.visible {
		opacity: 1;
		visibility: visible;
	}

	.page-content {
		opacity: 1;
		visibility: visible;
		transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
	}

	.page-content.hidden {
		opacity: 0;
		visibility: hidden;
	}
</style>

