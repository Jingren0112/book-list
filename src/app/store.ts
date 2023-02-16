import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookListSlice from '../features/bookList/bookListSlice';

export const store = configureStore({
  reducer: {
    bookList: bookListSlice,
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
