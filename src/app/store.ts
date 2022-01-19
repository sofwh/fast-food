import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { usersApi } from "../features/auth";
import { cartApi } from "../features/cart";
import { categoriesApi } from "../features/categories";
import { homeApi } from "../features/home";
import { productsApi } from "../features/products";

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      homeApi.middleware,
      productsApi.middleware,
      usersApi.middleware,
      cartApi.middleware
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
