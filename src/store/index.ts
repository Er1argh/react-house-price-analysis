import { configureStore } from '@reduxjs/toolkit';

import predictionSlice from './slices/predictionSlice';

export const store = configureStore({
  reducer: {
    prediction: predictionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
