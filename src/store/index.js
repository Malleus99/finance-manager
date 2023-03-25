import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';

import dataSlice from './data-slice';

const store = configureStore({
  reducer: {
    accData: dataSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
