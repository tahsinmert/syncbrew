import { gsap } from 'gsap';

interface MagneticButtonOptions {
	maxDistance?: number;
	strength?: number;
}

export function magneticButton(
	node: HTMLElement,
	options: MagneticButtonOptions = {}
): { destroy: () => void } {
	const { maxDistance = 10, strength = 0.5 } = options;

	let isHovering = false;
	let animationId: number | null = null;
	let targetX = 0;
	let targetY = 0;
	let currentX = 0;
	let currentY = 0;

	function getCenterPosition() {
		const rect = node.getBoundingClientRect();
		return {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2
		};
	}

	function handleMouseMove(event: MouseEvent) {
		if (!isHovering) return;

		const mouseX = event.clientX;
		const mouseY = event.clientY;
		const center = getCenterPosition();

		// Calculate distance from center to mouse
		const deltaX = mouseX - center.x;
		const deltaY = mouseY - center.y;

		// Calculate distance
		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

		// Apply magnetic effect with limit
		if (distance > 0) {
			const angle = Math.atan2(deltaY, deltaX);
			const targetDistance = Math.min(distance * strength, maxDistance);
			targetX = Math.cos(angle) * targetDistance;
			targetY = Math.sin(angle) * targetDistance;
		} else {
			targetX = 0;
			targetY = 0;
		}
	}

	function animate() {
		// Smooth interpolation
		currentX += (targetX - currentX) * 0.2;
		currentY += (targetY - currentY) * 0.2;

		gsap.set(node, {
			x: currentX,
			y: currentY
		});

		if (isHovering || Math.abs(currentX) > 0.01 || Math.abs(currentY) > 0.01) {
			animationId = requestAnimationFrame(animate);
		} else {
			animationId = null;
		}
	}

	function handleMouseEnter() {
		isHovering = true;
		if (!animationId) {
			animate();
		}
	}

	function handleMouseLeave() {
		isHovering = false;
		targetX = 0;
		targetY = 0;

		// Kill any ongoing GSAP animations
		gsap.killTweensOf(node);

		// Elastic spring back animation
		gsap.to(node, {
			x: 0,
			y: 0,
			duration: 1,
			ease: 'elastic.out(1, 0.3)',
			onComplete: () => {
				currentX = 0;
				currentY = 0;
			}
		});
	}

	// Add event listeners
	node.addEventListener('mouseenter', handleMouseEnter);
	node.addEventListener('mouseleave', handleMouseLeave);
	window.addEventListener('mousemove', handleMouseMove);

	return {
		destroy() {
			node.removeEventListener('mouseenter', handleMouseEnter);
			node.removeEventListener('mouseleave', handleMouseLeave);
			window.removeEventListener('mousemove', handleMouseMove);
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
			// Reset position
			gsap.set(node, { x: 0, y: 0 });
		}
	};
}

