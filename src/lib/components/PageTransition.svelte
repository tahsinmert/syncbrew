<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { currentRoute } from '../../stores/router';

	const COLUMNS = Array(5).fill(0);

	let columnsContainer: HTMLElement;
	let logoContainer: HTMLElement;
	let logo: HTMLElement;
	let columns: HTMLElement[] = [];
	let isTransitioning = false;
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
		} else if ($currentRoute !== previousRoute && !isTransitioning) {
			// Route changed - start transition
			startTransition();
			previousRoute = $currentRoute;
		}
	}

	function startTransition() {
		if (isTransitioning || columns.length === 0) return;
		isTransitioning = true;

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
	}

	function endTransition() {
		if (!isTransitioning) return;

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
				isTransitioning = false;
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
		align-items: center;
		justify-content: center;
		pointer-events: none;
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
