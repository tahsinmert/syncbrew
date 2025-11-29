import { writable } from 'svelte/store';

export const currentRoute = writable<string>('/');

export function navigate(path: string) {
	currentRoute.set(path);
	window.history.pushState({ path }, '', path);
}

export function initRouter() {
	// Set initial route from URL
	const path = window.location.pathname;
	currentRoute.set(path);

	// Handle browser back/forward buttons
	window.addEventListener('popstate', (event) => {
		const path = event.state?.path || window.location.pathname;
		currentRoute.set(path);
	});
}

