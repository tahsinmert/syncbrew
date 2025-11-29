<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { currentRoute, isTransitioning } from '../../stores/router';

	const COLUMNS = Array(5).fill(0);

	let columnsContainer: HTMLElement;
	let logoContainer: HTMLElement;
	let logo: HTMLElement;
	let logoImage: HTMLElement;
	let columns: HTMLElement[] = [];
	let previousRoute = $currentRoute;
	let isInitialMount = true;

	onMount(() => {
		// Initialize columns - set initial state
		columns.forEach((column) => {
			if (column) {
				gsap.set(column, {
					scaleY: 0,
					transformOrigin: 'top'
				});
			}
		});

		// Initialize logo
		if (logo) {
			gsap.set(logo, {
				opacity: 0,
				y: 0
			});
		}

		// Initialize logo image
		if (logoImage) {
			gsap.set(logoImage, {
				opacity: 0,
				scale: 0.8
			});
		}

		// Mark initial mount as complete after a brief delay
		setTimeout(() => {
			isInitialMount = false;
		}, 100);
	});

	// Watch for route changes
	$: {
		// Skip transition on initial mount
		if (isInitialMount) {
			previousRoute = $currentRoute;
		} else if ($currentRoute !== previousRoute && !$isTransitioning) {
			// Route changed - immediately hide content and start transition
			// Force Scroll to Top Instantly (Behind the closed curtains)
			window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
			startTransition();
			previousRoute = $currentRoute;
		}
	}

	function startTransition() {
		if ($isTransitioning || columns.length === 0) return;
		
		// Set transitioning state to hide content
		$isTransitioning = true;

		// ENTER ANIMATION - Columns expand from top
		columns.forEach((column) => {
			if (column) {
				gsap.set(column, {
					transformOrigin: 'top'
				});
			}
		});

		// Animate columns with stagger
		gsap.to(columns, {
			scaleY: 1,
			duration: 0.8,
			ease: 'power4.inOut',
			stagger: 0.1,
			onComplete: () => {
				// Columns are now fully covering the screen
				// Wait a bit then reveal the new page
				setTimeout(() => {
					endTransition();
				}, 200);
			}
		});

		// Simultaneously fade in logo
		if (logo) {
			gsap.to(logo, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: 'power4.inOut'
			});
		}

		// Simultaneously fade in logo image
		if (logoImage) {
			gsap.to(logoImage, {
				opacity: 1,
				scale: 1,
				duration: 0.8,
				ease: 'power4.inOut'
			});
		}
	}

	function endTransition() {
		if (!$isTransitioning) return;

		// Force Scroll to Top Instantly (Behind the closed curtains)
		// BEFORE the columns start opening (revealing the new page)
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

		// EXIT ANIMATION - Columns shrink from bottom
		columns.forEach((column) => {
			if (column) {
				gsap.set(column, {
					transformOrigin: 'bottom'
				});
			}
		});

		// Animate columns with stagger (revealing the new page)
		gsap.to(columns, {
			scaleY: 0,
			duration: 0.8,
			ease: 'power4.inOut',
			stagger: 0.1,
			onComplete: () => {
				$isTransitioning = false;
			}
		});

		// Simultaneously fade out logo
		if (logo) {
			gsap.to(logo, {
				opacity: 0,
				y: -20,
				duration: 0.8,
				ease: 'power4.inOut'
			});
		}

		// Simultaneously fade out logo image
		if (logoImage) {
			gsap.to(logoImage, {
				opacity: 0,
				scale: 0.8,
				duration: 0.8,
				ease: 'power4.inOut'
			});
		}
	}
</script>

<!-- Columns Container -->
<div
	bind:this={columnsContainer}
	class="columns-container"
>
	{#each COLUMNS as _, index}
		<div
			bind:this={columns[index]}
			class="column"
		></div>
	{/each}
</div>

<!-- Brand Logo Container -->
<div
	bind:this={logoContainer}
	class="logo-container"
>
	<img
		bind:this={logoImage}
		src="/syncbrew-logo.png"
		alt="SyncBrew Logo"
		class="logo-image"
	/>
	<div bind:this={logo} class="logo-text">
		SYNCBREW
	</div>
</div>

<style>
	.columns-container {
		position: fixed;
		inset: 0;
		z-index: 100;
		pointer-events: none;
		display: flex;
	}

	.column {
		width: 20.1%;
		height: 100%;
		background-color: #050505;
		transform-origin: top;
	}

	.logo-container {
		position: fixed;
		inset: 0;
		z-index: 101;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		pointer-events: none;
	}

	.logo-image {
		width: clamp(120px, 20vw, 300px);
		height: auto;
		opacity: 0;
		object-fit: contain;
	}

	.logo-text {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		color: #ffffff;
		letter-spacing: 0.1em;
		font-size: clamp(2rem, 8vw, 6rem);
		font-weight: 400;
		text-transform: uppercase;
		opacity: 0;
	}
</style>
