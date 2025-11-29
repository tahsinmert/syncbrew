<script lang="ts">
	import Navbar from '../../../components/Navbar.svelte';
	import { navigate } from '../../stores/router';

	let name = '';
	let date = '';
	let time = '';
	let guests = '';
	let specialRequests = '';
	let isSubmitting = false;
	let isSuccess = false;

	async function handleSubmit() {
		if (isSubmitting || isSuccess) return;

		isSubmitting = true;

		// Simulate API call with 2 second delay
		await new Promise((resolve) => setTimeout(resolve, 2000));

		isSubmitting = false;
		isSuccess = true;
	}
</script>

<Navbar />

<div class="page-container">
	<!-- Full-screen video background -->
	<video
		src="/steaming-cup.mp4"
		autoplay
		loop
		muted
		playsinline
		class="video-background"
	></video>

	<!-- Dark overlay -->
	<div class="overlay"></div>

	<!-- Glassmorphism form container -->
	<div class="form-container">
		<div class="form-wrapper">
			{#if isSuccess}
				<!-- Success State -->
				<div class="success-container">
					<!-- Animated Checkmark -->
					<div class="checkmark-wrapper">
						<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
							<circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
							<path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
						</svg>
					</div>

					<!-- Success Message -->
					<h2 class="success-title">Table Reserved</h2>
					<p class="success-message">We'll keep the coffee warm.</p>

					<!-- Return Home Button -->
					<button class="return-button" on:click={() => navigate('/')}>
						Return Home
					</button>
				</div>
			{:else}
				<!-- Header -->
				<div class="form-header">
					<h1 class="form-title">Your Table Awaits</h1>
					<p class="form-subtitle">Reserve a spot for coffee, work, or conversation.</p>
				</div>

				<!-- Form -->
				<form class="reservation-form" class:fade-out={isSubmitting} on:submit|preventDefault={handleSubmit}>
					<!-- Name -->
					<div class="form-group">
						<input
							id="name"
							type="text"
							class="form-input"
							bind:value={name}
							placeholder="Name"
							required
							disabled={isSubmitting}
						/>
					</div>

					<!-- Date & Time Row -->
					<div class="form-row">
						<div class="form-group">
							<input
								id="date"
								type="date"
								class="form-input"
								bind:value={date}
								required
								disabled={isSubmitting}
							/>
						</div>
						<div class="form-group">
							<input
								id="time"
								type="time"
								class="form-input"
								bind:value={time}
								required
								disabled={isSubmitting}
							/>
						</div>
					</div>

					<!-- Number of Guests -->
					<div class="form-group">
						<input
							id="guests"
							type="number"
							class="form-input"
							bind:value={guests}
							placeholder="Number of Guests"
							min="1"
							max="12"
							required
							disabled={isSubmitting}
						/>
					</div>

					<!-- Special Requests -->
					<div class="form-group">
						<textarea
							id="specialRequests"
							class="form-input form-textarea"
							bind:value={specialRequests}
							placeholder="Special Requests"
							rows="3"
							disabled={isSubmitting}
						></textarea>
					</div>

					<!-- Submit Button -->
					<button type="submit" class="submit-button" disabled={isSubmitting}>
						{#if isSubmitting}
							<span class="button-content">
								<span class="spinner"></span>
								Brewing...
							</span>
						{:else}
							Confirm Reservation
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>

<style>
	.page-container {
		position: relative;
		width: 100%;
		height: 100dvh;
		overflow: hidden;
	}

	.video-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
		pointer-events: none;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 1;
		pointer-events: none;
	}

	.form-container {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		padding-top: 100px; /* Account for navbar */
	}

	.form-wrapper {
		width: 100%;
		max-width: 28rem; /* max-w-md equivalent */
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		background-color: rgba(28, 25, 23, 0.4); /* bg-stone-900/40 */
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1rem; /* rounded-2xl */
		padding: 2rem; /* p-8 */
	}

	.form-header {
		margin-bottom: 2rem;
		text-align: center;
	}

	.form-title {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: 2rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 0.75rem 0;
		line-height: 1.2;
	}

	.form-subtitle {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.8);
		margin: 0;
		line-height: 1.5;
	}

	.reservation-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-input {
		background: transparent;
		border: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
		color: #ffffff;
		padding: 0.75rem 0;
		font-size: 1rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		outline: none;
		transition: border-color 0.3s ease;
		width: 100%;
	}

	.form-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.form-input:focus {
		border-bottom-color: #2dd4bf; /* border-teal-400 */
	}

	.form-textarea {
		resize: vertical;
		min-height: 80px;
		font-family: inherit;
	}

	.submit-button {
		width: 100%;
		background: #ffffff;
		color: #000000;
		border: none;
		padding: 1rem 2rem;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		border-radius: 0.375rem;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		margin-top: 0.5rem;
	}

	.submit-button:hover {
		background: #2dd4bf; /* bg-teal-400 */
		color: #ffffff;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(45, 212, 191, 0.3);
	}

	.submit-button:active {
		transform: translateY(0);
	}

	.submit-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	.submit-button:disabled:hover {
		background: #ffffff;
		color: #000000;
		transform: none;
		box-shadow: none;
	}

	.button-content {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(0, 0, 0, 0.2);
		border-top-color: #000000;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Fade out animation for form */
	.fade-out {
		opacity: 0;
		transform: translateY(-10px);
		transition: opacity 0.5s ease, transform 0.5s ease;
		pointer-events: none;
	}

	/* Success State */
	.success-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		animation: fadeIn 0.6s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.checkmark-wrapper {
		margin-bottom: 2rem;
	}

	.checkmark {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		display: block;
		stroke-width: 3;
		stroke: #fbbf24; /* amber-400 */
		stroke-miterlimit: 10;
		box-shadow: inset 0px 0px 0px #fbbf24;
		animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
	}

	.checkmark-circle {
		stroke-dasharray: 166;
		stroke-dashoffset: 166;
		stroke-width: 3;
		stroke-miterlimit: 10;
		stroke: #fbbf24;
		fill: none;
		animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
	}

	.checkmark-check {
		transform-origin: 50% 50%;
		stroke-dasharray: 48;
		stroke-dashoffset: 48;
		stroke-width: 3;
		stroke: #ffffff;
		animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
	}

	@keyframes stroke {
		100% {
			stroke-dashoffset: 0;
		}
	}

	@keyframes scale {
		0%,
		100% {
			transform: none;
		}
		50% {
			transform: scale3d(1.1, 1.1, 1);
		}
	}

	@keyframes fill {
		100% {
			box-shadow: inset 0px 0px 0px 30px #fbbf24;
		}
	}

	.success-title {
		font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
		font-size: 2rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 0.75rem 0;
		line-height: 1.2;
	}

	.success-message {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.9);
		margin: 0 0 2rem 0;
		line-height: 1.5;
	}

	.return-button {
		width: 100%;
		background: #ffffff;
		color: #000000;
		border: none;
		padding: 1rem 2rem;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		border-radius: 0.375rem;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}

	.return-button:hover {
		background: #2dd4bf; /* bg-teal-400 */
		color: #ffffff;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(45, 212, 191, 0.3);
	}

	.return-button:active {
		transform: translateY(0);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.form-container {
			padding: 1rem;
			padding-top: 100px;
		}

		.form-wrapper {
			padding: 1.5rem;
		}

		.form-title {
			font-size: 1.75rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.reservation-form {
			gap: 1.25rem;
		}
	}

	@media (max-width: 640px) {
		.form-title {
			font-size: 1.5rem;
		}

		.form-subtitle {
			font-size: 0.8125rem;
		}

		.success-title {
			font-size: 1.75rem;
		}

		.checkmark {
			width: 64px;
			height: 64px;
		}
	}
</style>
