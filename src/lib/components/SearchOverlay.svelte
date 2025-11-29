<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { isSearchOpen } from '../stores.js';

	let searchInput;

	const suggestedItems = ['Ethiopian', 'Espresso Tools', 'Merch', 'Single Origin'];

	function closeSearch() {
		isSearchOpen.set(false);
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closeSearch();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		// Auto-focus the input when overlay opens
		if (searchInput) {
			setTimeout(() => searchInput.focus(), 100);
		}
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	onDestroy(() => {
		document.removeEventListener('keydown', handleKeydown);
	});
</script>

{#if $isSearchOpen}
	<div
		class="search-overlay"
		transition:fade={{ duration: 400 }}
		role="dialog"
		aria-modal="true"
		aria-label="Search"
		on:click|self={closeSearch}
	>
		<!-- Search Panel -->
		<div class="search-panel" on:click|stopPropagation>
			<!-- Close Button -->
			<button
				class="close-button"
				on:click={closeSearch}
				aria-label="Close search"
			>
				CLOSE
			</button>

			<!-- Main Search Container -->
			<div class="search-container">
				<!-- Input -->
				<input
					bind:this={searchInput}
					type="text"
					class="search-input"
					placeholder="What are you craving?"
					on:keydown={(e) => {
						if (e.key === 'Escape') {
							closeSearch();
						}
					}}
				/>

				<!-- Suggested Results -->
				<div class="suggested-section">
					<div class="suggested-label">Suggested</div>
					<div class="suggested-links">
						{#each suggestedItems as item}
							<a href="#" class="suggested-link" on:click|preventDefault>
								{item}
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.search-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		padding: 2rem;
	}

	.search-panel {
		background: rgba(38, 38, 38, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 8px;
		padding: 2rem;
		max-width: 500px;
		width: 100%;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
		position: relative;
	}

	.close-button {
		position: absolute;
		top: 1rem;
		left: 1rem;
		background: rgba(0, 0, 0, 0.6);
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		cursor: pointer;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-weight: 500;
		transition: all 0.3s ease;
		border-radius: 4px;
	}

	.close-button:hover {
		background: rgba(0, 0, 0, 0.8);
	}

	.search-container {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.search-input {
		width: 100%;
		background: transparent;
		border: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		color: white;
		font-size: 1.25rem;
		padding: 0.75rem 0;
		outline: none;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}

	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.search-input:focus {
		border-bottom-color: rgba(255, 255, 255, 0.5);
	}

	.suggested-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.suggested-label {
		font-size: 0.75rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.4);
		font-weight: 500;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}

	.suggested-links {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.suggested-link {
		font-size: 0.875rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.6);
		text-decoration: none;
		font-weight: normal;
		transition: color 0.3s ease;
		cursor: pointer;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}

	.suggested-link:hover {
		color: #f59e0b;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.search-overlay {
			padding: 1rem;
		}

		.search-panel {
			max-width: 100%;
			padding: 1.5rem;
		}

		.search-container {
			margin-top: 2.5rem;
		}

		.search-input {
			font-size: 1.125rem;
		}
	}

	@media (max-width: 640px) {
		.search-panel {
			padding: 1rem;
		}

		.close-button {
			top: 0.75rem;
			left: 0.75rem;
			padding: 0.4rem 0.8rem;
			font-size: 0.7rem;
		}

		.search-container {
			margin-top: 2rem;
		}
	}
</style>

