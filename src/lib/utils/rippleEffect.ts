import { gsap } from 'gsap';

export function createRipple(event: MouseEvent, element: HTMLElement) {
	const ripple = document.createElement('div');
	ripple.className = 'ripple-effect';
	
	const rect = element.getBoundingClientRect();
	const size = Math.max(rect.width, rect.height);
	const x = event.clientX - rect.left - size / 2;
	const y = event.clientY - rect.top - size / 2;
	
	ripple.style.width = `${size}px`;
	ripple.style.height = `${size}px`;
	ripple.style.left = `${x}px`;
	ripple.style.top = `${y}px`;
	
	element.style.position = 'relative';
	element.style.overflow = 'hidden';
	element.appendChild(ripple);
	
	gsap.fromTo(
		ripple,
		{
			scale: 0,
			opacity: 0.6
		},
		{
			scale: 2,
			opacity: 0,
			duration: 0.6,
			ease: 'power2.out',
			onComplete: () => {
				ripple.remove();
			}
		}
	);
}

