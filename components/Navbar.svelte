<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { isCartOpen, isSearchOpen, cartCount } from '../src/lib/stores.js';
	import { navigate } from '../src/stores/router';
	import SearchOverlay from '../src/lib/components/SearchOverlay.svelte';
	import CartDrawer from '../src/lib/components/CartDrawer.svelte';
	import { magneticButton } from '../src/lib/magneticButton';

	let scrolled = false;
	let mobileMenuOpen = false;
	let scrollY = 0;

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Our Origin', href: '/origin' },
		{ name: 'The Process', href: '/process' },
		{ name: 'Shop', href: '/shop' }
	];

	function handleScroll() {
		scrollY = window.scrollY;
		scrolled = scrollY > 50;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		// Prevent body scroll when menu is open
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
		document.body.style.overflow = '';
	}

	function handleNavClick(event: MouseEvent, href: string) {
		event.preventDefault();
		closeMobileMenu();
		navigate(href);
	}

	onMount(() => {
		handleScroll();
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});
</script>

<nav class="navbar" class:scrolled={scrolled}>
	<div class="navbar-container">
		<!-- Left: Brand Logo -->
		<a href="/" class="brand-logo" data-sveltekit-preload-data="hover" on:click={(e) => { e.preventDefault(); closeMobileMenu(); navigate('/'); }}>
			SYNCBREW
		</a>

		<!-- Center: Navigation Links (Desktop) -->
		<ul class="nav-links">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class="nav-link"
						data-sveltekit-preload-data="hover"
						on:click={(e) => handleNavClick(e, link.href)}
					>
						{link.name}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Right: Icons & Actions -->
		<div class="navbar-actions">
			<button class="icon-button" aria-label="Search" on:click={() => isSearchOpen.set(true)}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.35-4.35"></path>
				</svg>
			</button>
			<button class="icon-button cart-button" aria-label="Cart" on:click={() => isCartOpen.set(true)}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="9" cy="21" r="1"></circle>
					<circle cx="20" cy="21" r="1"></circle>
					<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
				</svg>
				{#if $cartCount > 0}
					<span class="cart-badge">{$cartCount}</span>
				{/if}
			</button>
			<a href="/reservation" class="book-table-btn" use:magneticButton data-sveltekit-preload-data="hover" on:click={(e) => { e.preventDefault(); closeMobileMenu(); navigate('/reservation'); }}>Book Table</a>
			<!-- Mobile Menu Toggle -->
			<button
				class="mobile-menu-toggle"
				class:active={mobileMenuOpen}
				on:click={toggleMobileMenu}
				aria-label="Toggle menu"
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	</div>

	<!-- Mobile Overlay Menu -->
	{#if mobileMenuOpen}
		<div class="mobile-overlay" on:click={closeMobileMenu}>
			<div class="mobile-menu" on:click|stopPropagation>
				<ul class="mobile-nav-links">
					{#each navLinks as link, index}
						<li
							class="mobile-nav-item"
							style="animation-delay: {index * 0.1}s"
						>
							<a
								href={link.href}
								class="mobile-nav-link"
								data-sveltekit-preload-data="hover"
								on:click={(e) => handleNavClick(e, link.href)}
							>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}

	<!-- Search Overlay -->
	<SearchOverlay />

	<!-- Cart Drawer -->
	<CartDrawer />
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 50;
		padding: 1.5rem 2rem;
		background: transparent;
		backdrop-filter: blur(0px);
		-webkit-backdrop-filter: blur(0px);
		transition: all 0.3s ease;
	}

	.navbar.scrolled {
		padding: 1rem 2rem;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.navbar-container {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}

	/* Brand Logo */
	.brand-logo {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: 1.5rem;
		font-weight: 700;
		color: #ffffff;
		text-decoration: none;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		white-space: nowrap;
		transition: all 0.3s ease;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
	}

	.brand-logo:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	/* Desktop Navigation Links */
	.nav-links {
		display: flex;
		align-items: center;
		gap: 2.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-link {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-size: 0.875rem;
		font-weight: 400;
		color: #ffffff;
		text-decoration: none;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		position: relative;
		padding: 0.5rem 0;
		transition: all 0.3s ease;
		display: block;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		height: 1px;
		background: #ffffff;
		transform: translateX(-50%);
		transition: width 0.3s ease;
		box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
	}

	.nav-link:hover {
		color: #ffffff;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}

	.nav-link:hover::after {
		width: 100%;
	}

	/* Navbar Actions */
	.navbar-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.icon-button {
		background: transparent;
		border: none;
		color: #ffffff;
		cursor: pointer;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		position: relative;
	}

	.icon-button:hover {
		color: #ffffff;
		transform: translateY(-2px);
		filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
	}

	.cart-button {
		position: relative;
	}

	.cart-badge {
		position: absolute;
		top: 0;
		right: 0;
		background: #ef4444;
		color: #ffffff;
		font-size: 0.625rem;
		font-weight: 700;
		border-radius: 12px;
		min-width: 16px;
		height: 16px;
		padding: 0 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		transform: translate(25%, -25%);
		line-height: 1;
	}

	.book-table-btn {
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: #ffffff;
		padding: 0.625rem 1.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		border-radius: 0.25rem;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		white-space: nowrap;
		text-decoration: none;
		display: inline-block;
	}

	.book-table-btn:hover {
		background: #ffffff;
		color: #000000;
		border-color: #ffffff;
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	/* Mobile Menu Toggle */
	.mobile-menu-toggle {
		display: none;
		flex-direction: column;
		justify-content: space-between;
		width: 24px;
		height: 18px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		z-index: 100;
	}

	.mobile-menu-toggle span {
		display: block;
		width: 100%;
		height: 2px;
		background: #ffffff;
		transition: all 0.3s ease;
		transform-origin: center;
	}

	.mobile-menu-toggle.active span:nth-child(1) {
		transform: rotate(45deg) translate(6px, 6px);
	}

	.mobile-menu-toggle.active span:nth-child(2) {
		opacity: 0;
	}

	.mobile-menu-toggle.active span:nth-child(3) {
		transform: rotate(-45deg) translate(6px, -6px);
	}

	/* Mobile Overlay */
	.mobile-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.95);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.3s ease;
	}

	.mobile-menu {
		width: 100%;
		padding: 2rem;
	}

	.mobile-nav-links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.mobile-nav-item {
		opacity: 0;
		transform: translateY(20px);
		animation: slideInUp 0.5s ease forwards;
	}

	.mobile-nav-link {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: 2.5rem;
		font-weight: 700;
		color: #ffffff;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: all 0.3s ease;
		display: block;
		text-align: center;
	}

	.mobile-nav-link:hover {
		color: #f59e0b;
		transform: scale(1.05);
		text-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.nav-links {
			gap: 1.5rem;
		}

		.nav-link {
			font-size: 0.8125rem;
		}

		.book-table-btn {
			padding: 0.5rem 1rem;
			font-size: 0.8125rem;
		}
	}

	@media (max-width: 768px) {
		.navbar {
			padding: 1rem 1.5rem;
		}

		.navbar.scrolled {
			padding: 0.875rem 1.5rem;
		}

		.nav-links {
			display: none;
		}

		.book-table-btn {
			display: none;
		}

		.mobile-menu-toggle {
			display: flex;
		}

		.navbar-actions {
			gap: 0.75rem;
		}

		.icon-button {
			padding: 0.375rem;
		}

		.icon-button svg {
			width: 18px;
			height: 18px;
		}
	}

	@media (max-width: 640px) {
		.navbar {
			padding: 1rem;
		}

		.navbar.scrolled {
			padding: 0.875rem 1rem;
		}

		.brand-logo {
			font-size: 1.25rem;
		}

		.mobile-nav-link {
			font-size: 2rem;
		}

		.navbar-actions {
			gap: 0.5rem;
		}
	}
</style>

