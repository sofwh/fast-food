import { Metas } from "./auth";

export interface Payment {
  id: number;
  title: string;
  default: boolean;
  icon: null;
  live?: boolean;
  merchantCode?: string;
  merchantId?: string;
  merchantSecret?: string;
}

export interface PaymentMethod {
  meta: Metas;
  data: Payment[];
  code: number;
}
