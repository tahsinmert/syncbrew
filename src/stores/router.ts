import { writable } from 'svelte/store';

export const currentRoute = writable<string>('/');
export const isTransitioning = writable<boolean>(false);

export function navigate(path: string) {
	currentRoute.set(path);
	window.history.pushState({ path }, '', path);
}

export function initRouter() {
	// Set initial route from URL
	const path = window.location.pathname + window.location.search;
	currentRoute.set(path);

	// Handle browser back/forward buttons
	window.addEventListener('popstate', (event) => {
		const path = window.location.pathname + window.location.search;
		currentRoute.set(path);
	});
}

