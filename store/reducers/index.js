import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import requestsSlice from './requestsSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  requests: requestsSlice
});

export default rootReducer
