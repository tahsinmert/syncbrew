import { gsap } from 'gsap';

export function smoothScrollTo(target: string | number, options: {
	duration?: number;
	offset?: number;
} = {}) {
	const { duration = 1.5, offset = 0 } = options;

	let scrollTarget: number;

	if (typeof target === 'string') {
		const element = document.querySelector(target);
		if (!element) return;
		scrollTarget = (element as HTMLElement).offsetTop + offset;
	} else {
		scrollTarget = target + offset;
	}

	// Use native smooth scroll or GSAP animation
	window.scrollTo({
		top: scrollTarget,
		behavior: 'smooth'
	});
	
	// Alternative: Use GSAP if ScrollToPlugin is available
	// gsap.to(window, {
	// 	scrollTo: { y: scrollTarget, autoKill: false },
	// 	duration,
	// 	ease: 'power2.inOut'
	// });
}

export function initSmoothScroll() {
	// Add smooth scroll to all anchor links
	document.querySelectorAll('a[href^="#"]').forEach((link) => {
		link.addEventListener('click', (e) => {
			const href = (link as HTMLAnchorElement).getAttribute('href');
			if (href && href !== '#') {
				e.preventDefault();
				smoothScrollTo(href);
			}
		});
	});
}

