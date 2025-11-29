<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let visible = false;
	let mounted = false;

	onMount(() => {
		mounted = true;
		// Check if user has already made a choice
		const cookieConsent = localStorage.getItem('cookieConsent');
		if (!cookieConsent) {
			// Small delay for entry animation
			setTimeout(() => {
				visible = true;
			}, 500);
		}
	});

	function handleAccept() {
		localStorage.setItem('cookieConsent', 'accepted');
		visible = false;
	}

	function handleDecline() {
		localStorage.setItem('cookieConsent', 'declined');
		visible = false;
	}
</script>

{#if mounted && visible}
	<div
		class="cookie-consent"
		transition:fade={{ duration: 300 }}
	>
		<div class="cookie-content">
			<h3 class="cookie-headline">Digital Cookies.</h3>
			<p class="cookie-text">
				We use cookies to ensure the perfect digital brew. No tracking, just flavor.
			</p>
			<div class="cookie-actions">
				<button class="decline-btn" on:click={handleDecline}>
					Decline
				</button>
				<button class="accept-btn" on:click={handleAccept}>
					Accept
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.cookie-consent {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: 9999;
		max-width: 24rem;
		width: 100%;
		animation: slideUp 0.5s ease-out;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.cookie-consent {
			bottom: 0;
			right: 0;
			left: 0;
			max-width: 100%;
			border-radius: 1.5rem 1.5rem 0 0;
		}
	}

	.cookie-content {
		background: rgba(28, 25, 23, 0.8); /* bg-stone-900/80 */
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		padding: 1.5rem;
		box-shadow: 
			0 8px 32px rgba(0, 0, 0, 0.4),
			0 0 20px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 768px) {
		.cookie-content {
			border-radius: 1.5rem 1.5rem 0 0;
		}
	}

	.cookie-headline {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: 1.5rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 0.75rem 0;
		line-height: 1.2;
	}

	.cookie-text {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
		font-size: 0.875rem;
		color: #a8a29e; /* stone-400 */
		line-height: 1.5;
		margin: 0 0 1.5rem 0;
	}

	.cookie-actions {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		gap: 1rem;
		align-items: center;
	}

	.decline-btn {
		background: transparent;
		border: none;
		color: #a8a29e; /* stone-400 */
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		padding: 0.5rem 0;
		transition: color 0.3s ease;
		text-decoration: none;
	}

	.decline-btn:hover {
		color: #ffffff;
	}

	.accept-btn {
		background: #ffffff;
		color: #000000;
		border: 1px solid #ffffff;
		border-radius: 0.5rem;
		padding: 0.5rem 1.25rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, sans-serif;
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.accept-btn:hover {
		background: #f59e0b; /* amber-500 */
		color: #000000;
		border-color: #f59e0b;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
	}
</style>

