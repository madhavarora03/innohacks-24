import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../../utils/updateCarts';

const localItem = localStorage.getItem('cart');
const initialState: Cart = localItem
	? JSON.parse(localItem)
	: {
			cartItems: [],
			shippingAddress: {},
			paymentMethod: 'paypal',
	  };

type Cart = {
	cartItems: [];
	shippingAddress: {};
	paymentMethod: string;
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;
			const existItem = state.cartItems.find((x: any) => x.id == item.id);
			if (existItem) {
				state.cartItems = state.cartItems.map((x: any) =>
					x.id === existItem.id ? item : x
				);
			} else {
				state.cartItems = [...state.cartItems, item];
			}
			return updateCart(state);
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(x: any) => x.id !== action.payload
			);

			return updateCart(state);
		},
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;

			return updateCart(state);
		},

		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;

			return updateCart(state);
		},

		clearCartItems: (state, _action) => {
			state.cartItems = [];
			return updateCart(state);
		},

		resetCart: state => (state = initialState),
	},
});

export const {
	addToCart,
	removeFromCart,
	saveShippingAddress,
	savePaymentMethod,
	clearCartItems,
	resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
