import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function textReveal(element: HTMLElement, options: {
	duration?: number;
	stagger?: number;
	delay?: number;
} = {}) {
	const { duration = 1, stagger = 0.02, delay = 0 } = options;

	// Split text into spans
	const text = element.textContent || '';
	element.innerHTML = '';
	
	const words = text.split(' ');
	words.forEach((word, wordIndex) => {
		const wordSpan = document.createElement('span');
		wordSpan.style.display = 'inline-block';
		wordSpan.style.marginRight = '0.3em';
		
		word.split('').forEach((char) => {
			const charSpan = document.createElement('span');
			charSpan.style.display = 'inline-block';
			charSpan.textContent = char === ' ' ? '\u00A0' : char;
			wordSpan.appendChild(charSpan);
		});
		
		element.appendChild(wordSpan);
		if (wordIndex < words.length - 1) {
			element.appendChild(document.createTextNode(' '));
		}
	});

	const chars = Array.from(element.querySelectorAll('span span')) as HTMLElement[];
	
	gsap.set(chars, {
		opacity: 0,
		y: 50,
		rotationX: -90
	});

	gsap.to(chars, {
		opacity: 1,
		y: 0,
		rotationX: 0,
		duration,
		stagger,
		delay,
		ease: 'power3.out',
		scrollTrigger: {
			trigger: element,
			start: 'top 85%',
			toggleActions: 'play none none none'
		}
	});
}

