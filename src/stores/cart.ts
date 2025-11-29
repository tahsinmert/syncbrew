import { writable, derived } from 'svelte/store';

export interface CartItem {
	id: number;
	name: string;
	price: string;
	image: string;
	quantity: number;
}

function createCartStore() {
	const { subscribe, set, update } = writable<CartItem[]>([]);

	return {
		subscribe,
		addItem: (item: Omit<CartItem, 'quantity'>) => {
			update((items) => {
				const existingItem = items.find((i) => i.id === item.id);
				if (existingItem) {
					return items.map((i) =>
						i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
					);
				}
				return [...items, { ...item, quantity: 1 }];
			});
		},
		removeItem: (id: number) => {
			update((items) => items.filter((item) => item.id !== id));
		},
		clear: () => set([])
	};
}

export const cart = createCartStore();

// Derived store for cart count
export const cartCount = derived(cart, ($cart) => {
	return $cart.reduce((sum, item) => sum + item.quantity, 0);
});

