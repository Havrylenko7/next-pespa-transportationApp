import { createSlice } from '@reduxjs/toolkit';

const localStorageAvailable = typeof window !== 'undefined' && window.localStorage;

const initialState = {
  requests: localStorageAvailable ? JSON.parse(localStorage.getItem('requests')) || [] : []
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    createRequest: (state, action) => {
      const token = Math.random().toString(36).substr(2);
      const requests = [...state.requests, { ...action.payload, token }];

      localStorage.setItem('requests', JSON.stringify(requests));
      
      state.requests = requests
    },
    editRequest: (state, action) => {
      const requests = state.requests.filter(request => request.token !== action.payload.token);
      const newRequests = [...requests, action.payload];

      localStorage.setItem('requests', JSON.stringify(newRequests));

      state.requests = newRequests
    },
    deleteRequest: (state, action) => {
      const requests = state.requests.filter(request => request.token !== action.payload);

      localStorage.setItem('requests', JSON.stringify(requests));

      state.requests = requests
    }
  }
});

export const { createRequest, editRequest, deleteRequest } = requestsSlice.actions;

export default requestsSlice.reducer
