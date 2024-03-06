import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
	value: string;
}

const localState = localStorage.getItem('theme');
const initialState: CounterState = {
	value: localState ? localState : 'light',
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		switchTheme: state => {
			state.value = state.value == 'dim' ? 'light' : 'dim';
			localStorage.setItem('theme', state.value);
			document
				.querySelector('html')
				?.setAttribute('data-theme', state.value);
		},
	},
});

// Action creators are generated for each case reducer function
export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
