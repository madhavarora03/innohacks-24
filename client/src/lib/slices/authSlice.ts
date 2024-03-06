import { createSlice } from '@reduxjs/toolkit';

const localItem = localStorage.getItem('userInfo');
const initialState = {
	userInfo: localItem ? JSON.parse(localItem) : null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem('userInfo', JSON.stringify(action.payload));
		},
		logout: state => {
			state.userInfo = null;
			localStorage.clear();
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
