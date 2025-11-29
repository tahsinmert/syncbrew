import { writable } from 'svelte/store';

export const isCartOpen = writable(false);
export const isSearchOpen = writable(false);
export const cartCount = writable(3);
export const preloaderComplete = writable(false);

