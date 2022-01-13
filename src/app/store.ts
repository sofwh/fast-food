import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { categoriesApi } from "../features/categories";
import { homeApi } from "../features/home";
import { productsApi } from "../features/products";

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      homeApi.middleware,
      productsApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
