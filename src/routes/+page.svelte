<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Navbar from '../../components/Navbar.svelte';
	import Hero from '../../Hero.svelte';
	import ProductShowcase from '../../ProductShowcase.svelte';
	import MenuGrid from '../../MenuGrid.svelte';
	import VideoBackground from '../../components/VideoBackground.svelte';
	import BeanStory from '../../components/BeanStory.svelte';
	import CreatorsHub from '../../components/CreatorsHub.svelte';
	import TheLibrary from '../../components/TheLibrary.svelte';
	import Subscription from '../../components/Subscription.svelte';
	import BeanCorridor from '../../components/BeanCorridor.svelte';
	import Sourcing from '../../components/Sourcing.svelte';
	import Heritage from '../../components/Heritage.svelte';
	import BrewingProcess from '../../components/BrewingProcess.svelte';
	import TheRitual from '../../components/TheRitual.svelte';
	import TheBloom from '../../components/TheBloom.svelte';
	import Footer from '../../components/Footer.svelte';

	gsap.registerPlugin(ScrollTrigger);

	let appContainer: HTMLElement;

	onMount(() => {
		if (!appContainer) return;

		// 1. Typography Reveal (Headings h1, h2)
		const headings = appContainer.querySelectorAll('h1, h2');
		gsap.set(headings, { y: 100, opacity: 0 });
		gsap.to(headings, {
			y: 0,
			opacity: 1,
			duration: 1.5,
			ease: 'power4.out',
			scrollTrigger: {
				trigger: headings[0] || appContainer,
				start: 'top 85%',
				toggleActions: 'play none none none'
			},
			stagger: 0.1
		});

		// Apply to all headings with individual scroll triggers
		headings.forEach((heading) => {
			gsap.fromTo(
				heading,
				{ y: 100, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1.5,
					ease: 'power4.out',
					scrollTrigger: {
						trigger: heading,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
		});

		// 2. Paragraphs & Subtext (Fade Up)
		const paragraphs = appContainer.querySelectorAll('p, span');
		paragraphs.forEach((para) => {
			gsap.fromTo(
				para,
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1.2,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: para,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
		});

		// 3. Images & Videos (Parallax & Scale)
		const videos = appContainer.querySelectorAll('video');
		const images = appContainer.querySelectorAll('img');

		[...videos, ...images].forEach((media) => {
			// Scale effect
			gsap.fromTo(
				media,
				{ scale: 1.1 },
				{
					scale: 1,
					duration: 1.5,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: media,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);

			// Parallax effect
			gsap.to(media, {
				y: -50,
				ease: 'none',
				scrollTrigger: {
					trigger: media,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		});

		// 4. Grids & Lists (Staggered Entry)
		const menuGrid = appContainer.querySelector('.menu-grid-container');
		const productGrid = appContainer.querySelector('.products-grid');
		const timelineItems = appContainer.querySelectorAll('.timeline-item');

		// MenuGrid items
		if (menuGrid) {
			const menuItems = menuGrid.querySelectorAll('.menu-card');
			gsap.set(menuItems, { y: 50, opacity: 0 });
			gsap.to(menuItems, {
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',
				stagger: 0.2,
				scrollTrigger: {
					trigger: menuGrid,
					start: 'top 85%',
					toggleActions: 'play none none none'
				}
			});
		}

		// ProductGrid items
		if (productGrid) {
			const productItems = productGrid.querySelectorAll('.product-card');
			gsap.set(productItems, { y: 50, opacity: 0 });
			gsap.to(productItems, {
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',
				stagger: 0.2,
				scrollTrigger: {
					trigger: productGrid,
					start: 'top 85%',
					toggleActions: 'play none none none'
				}
			});
		}

		// Timeline items
		if (timelineItems.length > 0) {
			gsap.set(timelineItems, { y: 50, opacity: 0 });
			gsap.to(timelineItems, {
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',
				stagger: 0.2,
				scrollTrigger: {
					trigger: timelineItems[0],
					start: 'top 85%',
					toggleActions: 'play none none none'
				}
			});
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<div class="app-container" bind:this={appContainer}>
	<VideoBackground />
	<div class="noise-texture"></div>
	<Hero />
	<BeanStory />
	<CreatorsHub />
	<TheLibrary />
	<Subscription />
	<BeanCorridor />
	<Sourcing />
	<Heritage />
	<BrewingProcess />
	<ProductShowcase />
	<MenuGrid />
	<TheBloom />
	<TheRitual />
	<Footer />
</div>

<style>
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

