import { Metas } from "./auth";

export interface Address {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  customer: string;
  contactNo: string;
  address: string;
  detail: {
    country: string;
    provience: string;
    district: string;
    local_government: string;
    ward: string;
    street_address: string;
    formatted_address: string;
    intersection: string;
  };
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddressData {
  meta: Metas;
  data: Address[];
  code: number;
}

export interface NewAddressData {
  meta: Metas;
  data: AddressData;
  code: number;
}

export interface NewAddress {
  title: string;
  latitude: string;
  longitude: string;
  isDefault: boolean;
}
