<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let container: HTMLElement;
	let coffeeElement: HTMLElement;
	let leftTexts: HTMLElement;
	let rightTexts: HTMLElement;
	let ingredients: HTMLElement;

	const roastTypes = [
		{
			name: 'Espresso',
			description: 'Bold, intense, and full-bodied',
			color: '#2C1810',
			position: 0
		},
		{
			name: 'Americano',
			description: 'Smooth and balanced',
			color: '#3D2817',
			position: 0.25
		},
		{
			name: 'Cappuccino',
			description: 'Rich espresso with velvety foam',
			color: '#5C4033',
			position: 0.5
		},
		{
			name: 'Latte',
			description: 'Creamy, smooth, and perfectly balanced',
			color: '#D4A574',
			position: 0.75
		},
		{
			name: 'Mocha',
			description: 'Chocolate meets coffee perfection',
			color: '#8B6F47',
			position: 1
		}
	];

	onMount(() => {
		if (!container || !coffeeElement) return;

		// Create timeline for the entire animation
		const mainTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				start: 'top top',
				end: '+=300%',
				pin: true,
				scrub: 1,
				anticipatePin: 1
			}
		});

		// Coffee element transformation - explode into ingredients
		mainTimeline
			.to(coffeeElement, {
				scale: 1.3,
				rotation: 720,
				duration: 0.25,
				ease: 'power3.out'
			}, 0.1)
			.to(coffeeElement, {
				scale: 0.7,
				opacity: 0.6,
				duration: 0.2,
				ease: 'power3.in'
			}, 0.35)
			.to(coffeeElement, {
				scale: 0,
				opacity: 0,
				rotation: 1080,
				duration: 0.35,
				ease: 'power4.in'
			}, 0.55);

		// Ingredients explosion animation
		if (ingredients) {
			const ingredientItems = ingredients.children;
			
			// Set initial positions
			gsap.set(ingredientItems, {
				opacity: 0,
				scale: 0,
				x: 0,
				y: 0
			});

			// Animate ingredients appearing and exploding
			mainTimeline.to(ingredientItems, {
				opacity: 1,
				scale: 1,
				duration: 0.4,
				stagger: 0.08,
				ease: 'elastic.out(1, 0.5)'
			}, 0.55);

			// Explode ingredients outward
			Array.from(ingredientItems).forEach((item: Element, index) => {
				const angle = (index / ingredientItems.length) * Math.PI * 2;
				const distance = 250;
				const x = Math.cos(angle) * distance;
				const y = Math.sin(angle) * distance;

				mainTimeline.to(item, {
					x: x,
					y: y,
					rotation: 720 * (index % 2 === 0 ? 1 : -1),
					scale: 1.2,
					duration: 0.5,
					ease: 'power3.out'
				}, 0.8);
			});

			// Bring ingredients back together
			mainTimeline.to(ingredientItems, {
				x: 0,
				y: 0,
				rotation: 0,
				scale: 1,
				duration: 0.6,
				stagger: 0.06,
				ease: 'power3.inOut'
			}, 1.3);

			// Fade out ingredients
			mainTimeline.to(ingredientItems, {
				opacity: 0,
				scale: 0,
				duration: 0.3,
				stagger: 0.05,
				ease: 'power2.in'
			}, 1.7);

			// Coffee cup reappears
			mainTimeline.to(coffeeElement, {
				scale: 1,
				opacity: 1,
				rotation: 0,
				duration: 0.5,
				ease: 'elastic.out(1, 0.6)'
			}, 2);
		}

		// Text animations on sides
		if (leftTexts && rightTexts) {
			const leftTextItems = leftTexts.children;
			const rightTextItems = rightTexts.children;

			// Set initial positions
			gsap.set(leftTextItems, {
				opacity: 0,
				x: -100,
				y: 0
			});

			gsap.set(rightTextItems, {
				opacity: 0,
				x: 100,
				y: 0
			});

			// Animate text items appearing
			// Odd items (index 0, 2, 4) on left, even items (index 1, 3) on right
			roastTypes.forEach((roast, index) => {
				const isOdd = index % 2 === 0; // 0, 2, 4 are "odd" positions (1st, 3rd, 5th)
				const isEven = index % 2 === 1; // 1, 3 are "even" positions (2nd, 4th)
				
				const leftText = isOdd ? leftTextItems[index] : null;
				const rightText = isEven ? rightTextItems[index] : null;

				if (leftText) {
					mainTimeline.to(leftText, {
						opacity: 1,
						x: 0,
						y: -30,
						duration: 0.5,
						ease: 'power3.out'
					}, roast.position);
				}

				if (rightText) {
					mainTimeline.to(rightText, {
						opacity: 1,
						x: 0,
						y: -30,
						duration: 0.5,
						ease: 'power3.out'
					}, roast.position);
				}

				// Fade out previous text from the same side
				if (index > 0) {
					const prevIsOdd = (index - 1) % 2 === 0;
					const prevIsEven = (index - 1) % 2 === 1;
					
					if (prevIsOdd && leftTextItems[index - 1]) {
						mainTimeline.to(leftTextItems[index - 1], {
							opacity: 0,
							x: -100,
							y: 0,
							duration: 0.4,
							ease: 'power3.in'
						}, roast.position - 0.05);
					}
					if (prevIsEven && rightTextItems[index - 1]) {
						mainTimeline.to(rightTextItems[index - 1], {
							opacity: 0,
							x: 100,
							y: 0,
							duration: 0.4,
							ease: 'power3.in'
						}, roast.position - 0.05);
					}
				}
			});
		}

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	});
</script>

<div class="product-showcase" bind:this={container}>
	<!-- Video Background -->
	<video
		class="background-video"
		src="/rustic-table.mp4"
		autoplay
		loop
		muted
		playsinline
	></video>
	
	<!-- Overlay with blur -->
	<div class="background-overlay"></div>

	<!-- Left side text descriptions (odd items: 0, 2, 4) -->
	<div class="text-container left-texts" bind:this={leftTexts}>
		{#each roastTypes as roast, index}
			<div class="text-item" class:hidden={index % 2 === 1}>
				<h2 class="roast-name">{roast.name}</h2>
				<p class="roast-description">{roast.description}</p>
			</div>
		{/each}
	</div>

	<!-- Center coffee element -->
	<div class="coffee-container">
		<div class="coffee-element" bind:this={coffeeElement}>
			<div class="coffee-cup">
				<div class="cup-body"></div>
				<div class="cup-handle"></div>
				<div class="coffee-liquid"></div>
				<div class="foam"></div>
			</div>
		</div>

		<!-- Ingredients that explode -->
		<div class="ingredients" bind:this={ingredients}>
			<div class="ingredient water">
				<img 
					src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&q=80&fit=crop" 
					alt="Water" 
					class="ingredient-image"
					loading="lazy"
				/>
				<span>Water</span>
			</div>
			<div class="ingredient beans">
				<img 
					src="http://googleusercontent.com/image_collection/image_retrieval/13800886462715723165_0" 
					alt="Coffee beans" 
					class="ingredient-image"
					loading="lazy"
				/>
				<span>Beans</span>
			</div>
			<div class="ingredient milk">
				<img 
					src="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&q=80&fit=crop" 
					alt="Milk" 
					class="ingredient-image"
					loading="lazy"
				/>
				<span>Milk</span>
			</div>
			<div class="ingredient foam-ingredient">
				<img 
					src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=200&q=80&fit=crop" 
					alt="Foam" 
					class="ingredient-image"
					loading="lazy"
				/>
				<span>Foam</span>
			</div>
		</div>
	</div>

	<!-- Right side text descriptions (even items: 1, 3) -->
	<div class="text-container right-texts" bind:this={rightTexts}>
		{#each roastTypes as roast, index}
			<div class="text-item" class:hidden={index % 2 === 0}>
				<h2 class="roast-name">{roast.name}</h2>
				<p class="roast-description">{roast.description}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.product-showcase {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.background-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
		pointer-events: none;
	}

	.background-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(28 25 23 / 0.7); /* bg-stone-900/70 */
		backdrop-filter: blur(4px); /* backdrop-blur-sm */
		z-index: 1;
		pointer-events: none;
	}

	.coffee-container {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.coffee-element {
		position: relative;
		width: 200px;
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.coffee-cup {
		position: relative;
		width: 120px;
		height: 140px;
	}

	.cup-body {
		position: absolute;
		width: 100%;
		height: 80%;
		bottom: 0;
		background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
		border-radius: 0 0 20px 20px;
		box-shadow: 
			inset -10px 0 20px rgba(0, 0, 0, 0.3),
			0 10px 30px rgba(0, 0, 0, 0.5);
	}

	.cup-handle {
		position: absolute;
		right: -15px;
		top: 20px;
		width: 30px;
		height: 50px;
		border: 8px solid #8B4513;
		border-left: none;
		border-radius: 0 15px 15px 0;
	}

	.coffee-liquid {
		position: absolute;
		width: 90%;
		height: 60%;
		top: 10%;
		left: 5%;
		background: linear-gradient(135deg, #3d2817 0%, #5C4033 100%);
		border-radius: 0 0 15px 15px;
		box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
	}

	.foam {
		position: absolute;
		width: 90%;
		height: 25%;
		top: 10%;
		left: 5%;
		background: linear-gradient(135deg, #f5f5dc 0%, #fff8dc 100%);
		border-radius: 15px 15px 0 0;
		box-shadow: 
			inset 0 5px 10px rgba(255, 255, 255, 0.5),
			0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.ingredients {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.ingredient {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 16px 20px;
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(15px);
		border-radius: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		box-shadow: 
			0 8px 32px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);
		transform-origin: center center;
	}

	.ingredient-icon {
		font-size: 40px;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
	}

	.ingredient-image {
		width: 60px;
		height: 60px;
		object-fit: cover;
		border-radius: 8px;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
	}

	.ingredient span {
		color: white;
		font-size: 16px;
		font-weight: 700;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
		letter-spacing: 0.5px;
	}

	.text-container {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		width: 300px;
	}

	.left-texts {
		left: 5%;
	}

	.right-texts {
		right: 5%;
	}

	.text-item {
		position: absolute;
		width: 100%;
	}

	.text-item.hidden {
		display: none;
	}

	.roast-name {
		font-size: 2.5rem;
		font-weight: 900;
		color: white;
		margin: 0 0 1rem 0;
		text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
		letter-spacing: 0.15em;
		text-transform: uppercase;
	}

	.roast-description {
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
		line-height: 1.6;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
	}

	@media (max-width: 768px) {
		.text-container {
			width: 200px;
		}

		.left-texts {
			left: 2%;
		}

		.right-texts {
			right: 2%;
		}

		.roast-name {
			font-size: 1.8rem;
		}

		.roast-description {
			font-size: 0.9rem;
		}
	}
</style>

