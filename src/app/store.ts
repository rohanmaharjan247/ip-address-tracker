import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ipTrackerReducer from '../features/ip-tracker/ipTrackerSlice';

export const store = configureStore({
  reducer: {
    ipTrackers: ipTrackerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
