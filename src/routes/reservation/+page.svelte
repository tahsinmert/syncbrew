<script lang="ts">
	import Navbar from '../../../components/Navbar.svelte';

	let name = '';
	let date = '';
	let time = '';
	let guests = '';
	let specialRequests = '';

	function handleSubmit() {
		// Handle form submission
		console.log({ name, date, time, guests, specialRequests });
		// You can add actual submission logic here
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
			<!-- Header -->
			<div class="form-header">
				<h1 class="form-title">Your Table Awaits</h1>
				<p class="form-subtitle">Reserve a spot for coffee, work, or conversation.</p>
			</div>

			<!-- Form -->
			<form class="reservation-form" on:submit|preventDefault={handleSubmit}>
				<!-- Name -->
				<div class="form-group">
					<input
						id="name"
						type="text"
						class="form-input"
						bind:value={name}
						placeholder="Name"
						required
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
						/>
					</div>
					<div class="form-group">
						<input
							id="time"
							type="time"
							class="form-input"
							bind:value={time}
							required
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
					></textarea>
				</div>

				<!-- Submit Button -->
				<button type="submit" class="submit-button">
					Confirm Reservation
				</button>
			</form>
		</div>
	</div>
</div>

<style>
	.page-container {
		position: relative;
		width: 100%;
		height: 100vh;
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
		height: 100vh;
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
	}
</style>
