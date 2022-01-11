import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { categoriesApi } from "../features/categories";

export const store = configureStore({
  reducer: { [categoriesApi.reducerPath]: categoriesApi.reducer },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoriesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
