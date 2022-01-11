export interface Product {
  id: number;
  title: string;
  slug: string;
  link: string;
  moreInfo: string;
  description: string;
  taxable: boolean;
  taxableAmount: number;
  decimal: boolean;
  hasOffer: boolean | null;
  categoryId: number;
  categoryTitle: string;
  categorySlug: string;
  categoryIcon: string;
  categoryBackgroundImage: string;
  unitPrice: Price[];
  images: ImageDetails[];
  warehouses: Warehouse[];
  tags: [];
  brand: string | null;
}

export interface Price {
  id: number;
  title: string;
  sellingPrice: number;
  markedPrice: number;
  newPrice: number;
  oldPrice: number;
  size: string | null;
  sku: string;
  description: string | null;
  barcode: string | null;
  stock: number;
  hasOffer: boolean;
  alwaysAvailable: boolean;
}

export interface ImageDetails {
  id: number;
  imageName: string;
  unit_price_id: number | null;
}

export interface Warehouse {
  id: number;
  title: string;
}
