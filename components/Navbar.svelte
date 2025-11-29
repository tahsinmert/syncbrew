<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { isSearchOpen, cartCount } from '../src/lib/stores.js';
	import { navigate } from '../src/stores/router';
	import SearchOverlay from '../src/lib/components/SearchOverlay.svelte';
	import { magneticButton } from '../src/lib/magneticButton';
	import { createRipple } from '../src/lib/utils/rippleEffect';

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
			<img src="/syncbrew-logo.png" alt="SyncBrew Logo" class="brand-logo-image" />
			<span class="brand-logo-text">SYNCBREW</span>
		</a>

		<!-- Center: Navigation Links (Desktop) -->
		<ul class="nav-links hidden md:flex">
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
			<button class="icon-button" aria-label="Search" on:click={(e) => { createRipple(e, e.currentTarget as HTMLElement); isSearchOpen.set(true); }}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.35-4.35"></path>
				</svg>
			</button>
			<a href="/cart" class="icon-button cart-button" aria-label="Cart" on:click={(e) => { e.preventDefault(); navigate('/cart'); }}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="9" cy="21" r="1"></circle>
					<circle cx="20" cy="21" r="1"></circle>
					<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
				</svg>
				{#if $cartCount > 0}
					<span class="cart-badge">{$cartCount}</span>
				{/if}
			</a>
			<a href="/reservation" class="book-table-btn" use:magneticButton data-sveltekit-preload-data="hover" on:click={(e) => { e.preventDefault(); closeMobileMenu(); navigate('/reservation'); }}>Book Table</a>
			<!-- Mobile Menu Toggle (Hamburger) -->
			<button
				class="mobile-menu-toggle block md:hidden"
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
		<div class="mobile-overlay" on:click={closeMobileMenu} role="dialog" aria-modal="true" aria-label="Mobile menu">
			<div class="mobile-menu" on:click|stopPropagation>
				<!-- Close Button (X) -->
				<button
					class="mobile-menu-close"
					on:click={closeMobileMenu}
					aria-label="Close menu"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
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
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.brand-logo-image {
		height: clamp(28px, 4vw, 40px);
		width: auto;
		filter: brightness(0) invert(1);
		transition: opacity 0.3s ease;
	}

	.brand-logo:hover .brand-logo-image {
		opacity: 0.8;
	}

	.brand-logo-text {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: clamp(1rem, 2.5vw, 1.5rem);
		font-weight: 700;
		color: #ffffff;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		white-space: nowrap;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
	}

	.brand-logo:hover {
		transform: translateY(-1px);
	}

	.brand-logo:hover .brand-logo-text {
		opacity: 0.9;
	}

	/* Desktop Navigation Links */
	.nav-links {
		align-items: center;
		gap: 2.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	/* Hide on mobile, show on desktop (md and up) - Tailwind: hidden md:flex */
	.nav-links.hidden {
		display: none;
	}

	@media (min-width: 768px) {
		.nav-links.hidden {
			display: flex;
		}
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

	/* Mobile Menu Toggle (Hamburger) */
	.mobile-menu-toggle {
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

	/* Show on mobile, hide on desktop */
	.mobile-menu-toggle.block {
		display: flex;
	}

	@media (min-width: 768px) {
		.mobile-menu-toggle.md\:hidden {
			display: none;
		}
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

	/* Mobile Overlay - Full Screen with bg-black/95 */
	.mobile-overlay {
		position: fixed;
		inset: 0;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.95); /* bg-black/95 equivalent */
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.3s ease;
		/* Safe area support for iPhone notch */
		padding-top: max(env(safe-area-inset-top), 0px);
		padding-bottom: max(env(safe-area-inset-bottom), 0px);
		padding-left: max(env(safe-area-inset-left), 0px);
		padding-right: max(env(safe-area-inset-right), 0px);
	}

	.mobile-menu {
		width: 100%;
		height: 100%;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
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
		font-size: 3rem; /* text-5xl: 3rem */
		font-weight: 700;
		color: #ffffff;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: all 0.3s ease;
		display: block;
		text-align: center;
		line-height: 1.2;
	}

	/* Mobile Menu Close Button */
	.mobile-menu-close {
		position: absolute;
		top: 2rem;
		right: 2rem;
		background: transparent;
		border: none;
		color: #ffffff;
		cursor: pointer;
		padding: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		z-index: 101;
		/* Safe area support */
		top: calc(2rem + env(safe-area-inset-top));
		right: calc(2rem + env(safe-area-inset-right));
	}

	.mobile-menu-close:hover {
		color: #f59e0b;
		transform: rotate(90deg);
	}

	.mobile-menu-close svg {
		width: 24px;
		height: 24px;
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
			/* Safe area support for navbar */
			padding-top: calc(1rem + env(safe-area-inset-top));
			padding-left: calc(1.5rem + env(safe-area-inset-left));
			padding-right: calc(1.5rem + env(safe-area-inset-right));
		}

		.navbar.scrolled {
			padding: 0.875rem 1.5rem;
			padding-top: calc(0.875rem + env(safe-area-inset-top));
			padding-left: calc(1.5rem + env(safe-area-inset-left));
			padding-right: calc(1.5rem + env(safe-area-inset-right));
		}

		.book-table-btn {
			display: none;
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

		.mobile-menu-close {
			top: calc(1.5rem + env(safe-area-inset-top));
			right: calc(1.5rem + env(safe-area-inset-right));
		}
	}

	@media (max-width: 640px) {
		.navbar {
			padding: 1rem;
		}

		.navbar.scrolled {
			padding: 0.875rem 1rem;
		}

		.brand-logo-text {
			font-size: clamp(0.875rem, 3vw, 1.25rem);
		}

		.brand-logo-image {
			height: clamp(24px, 3.5vw, 32px);
		}

		.mobile-nav-link {
			font-size: clamp(1.75rem, 6vw, 2.5rem);
		}

		.navbar-actions {
			gap: 0.5rem;
		}

		.icon-button svg {
			width: 16px;
			height: 16px;
		}
	}
</style>

