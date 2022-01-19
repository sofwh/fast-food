import { ErrorResponse, Metas } from "./auth";
import { ImageDetails, Product } from "./Products";

export interface Cart {
  id: number;
  cartNumber: string;
  categoryId: null;
  warehouseId: number;
  orderAmount: number;
  discount: number;
  scheme: number;
  subTotal: number;
  deliveryCharge: number;
  extra: Extras[];
  message: string;
  campaign_message: string;
  total: number;
  pickupTotal: number;
  cartProducts: CartItems[] | [];
}

export interface Extras {
  title: string;
  value: number;
}

export interface CartItems {
  id: number;
  price: number;
  quantity: number;
  selectedUnit: SelectedUnit;
  note: string;
  product: Product;
}

export interface SelectedUnit {
  id: number;
  title: string;
  sellingPrice: number;
  markedPrice: number;
  newPrice: number;
  oldPrice: number;
  size: string;
  sku: string;
  barcode: string;
  stock: number;
  hasOffer: boolean;
  alwaysAvailable: boolean;
}

export interface AddToCartItems {
  productId: number;
  priceId: number;
  quantity: number;
}

export interface UpdateCartItems {
  cartProductId: number;
  quantity: number;
}

export interface AddToCartResponse {
  meta: Metas;
  data: CartItems;
  code: number;
}

export interface GetCartResponse {
  meta: Metas;
  data: Cart;
  code: number;
}

export type AddToCartData = AddToCartResponse | ErrorResponse;
