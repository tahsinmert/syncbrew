import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function imageReveal(element: HTMLElement, options: {
	direction?: 'left' | 'right' | 'top' | 'bottom';
	duration?: number;
} = {}) {
	const { direction = 'left', duration = 1.2 } = options;
	
	const clipPathMap = {
		left: 'inset(0 100% 0 0)',
		right: 'inset(0 0 0 100%)',
		top: 'inset(100% 0 0 0)',
		bottom: 'inset(0 0 100% 0)'
	};
	
	gsap.set(element, {
		clipPath: clipPathMap[direction]
	});
	
	gsap.to(element, {
		clipPath: 'inset(0 0 0 0)',
		duration,
		ease: 'power3.out',
		scrollTrigger: {
			trigger: element,
			start: 'top 85%',
			toggleActions: 'play none none none'
		}
	});
}

