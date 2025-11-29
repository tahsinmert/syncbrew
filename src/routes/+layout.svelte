<script lang="ts">
	import { onMount } from 'svelte';
	import PageTransition from '../lib/components/PageTransition.svelte';
	import Preloader from '../lib/components/Preloader.svelte';
	import { preloaderComplete } from '../lib/stores.js';

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
	});
</script>

<!-- Preloader at the very top -->
<Preloader />

<!-- Main content - hidden until preloader completes -->
<div class="main-content" class:visible={contentVisible}>
	<PageTransition />
	<slot />
</div>

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
</style>

