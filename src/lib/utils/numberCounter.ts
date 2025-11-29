import { gsap } from 'gsap';

import { gsap } from 'gsap';

export function animateNumber(
	element: HTMLElement,
	targetValue: number,
	options: {
		duration?: number;
		prefix?: string;
		suffix?: string;
		decimals?: number;
	} = {}
) {
	const { duration = 1, prefix = '', suffix = '', decimals = 2 } = options;
	
	const currentText = element.textContent || '0';
	const currentValue = parseFloat(currentText.replace(prefix, '').replace(suffix, '').replace(/,/g, '').trim()) || 0;
	const obj = { value: currentValue };
	
	gsap.to(obj, {
		value: targetValue,
		duration,
		ease: 'power2.out',
		onUpdate: () => {
			if (element) {
				element.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`;
			}
		}
	});
}

