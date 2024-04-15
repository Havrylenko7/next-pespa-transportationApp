import { createSlice  } from '@reduxjs/toolkit';

const localStorageAvailable = typeof window !== 'undefined' && window.localStorage;

const initialState = {
  user: localStorageAvailable ? JSON.parse(localStorage.getItem('user')) || null : null,
  users: localStorageAvailable ? JSON.parse(localStorage.getItem('users')) || [] : []
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload.token));

      state.user = action.payload.token
    },
    signUp: (state, action) => {
      const token = Math.random().toString(36).substr(2);
      const users = [...state.users, { ...action.payload, token }];

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(token));

      state.users = users;
      state.user = token
    },
    signOut: (state) => {
      localStorage.setItem('user', null);

      state.user = null
    }
  }
});

export const { signIn, signUp, signOut } = authSlice.actions;

export default authSlice.reducer
