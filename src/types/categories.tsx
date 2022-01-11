export interface Category {
  id: number;
  parentId: number | null;
  title: string;
  description: string | null;
  slug: string;
  icon: string;
  backgroundImage: string;
  position: number;
  hasProduct: boolean;
  avgRating: number;
  ratingCount: number;
  productCount: number;
  userRating: number;
  banner: [];
  hierarchy_level: number;
  isRestaurant: boolean;
  isRestaurantOPen: boolean;
  subcategories: SubCategories[];
  profile: {
    id: number;
    openingTime: string;
    description: string;
    logo: string | null;
    address: {
      country: string;
      provience: string;
      district: string;
      local_government: string;
      ward: number;
      street_address: string | null;
      formatted_address: string;
    } | null;
    minimumOrder: number;
    fullAddress: string;
    promo_text: string | null;
  };
}

export interface SubCategories {
  id: number;
  parentId: number | null;
  title: string;
  description: string | null;
  slug: string;
  icon: string;
  backgroundImage: string;
  position: number;
  hasProduct: boolean;
  avgRating: number;
  ratingCount: number;
  productCount: number;
  userRating: null;
  banner: [];
  subcategories: [];
}

export interface CategoryResponse {
  meta: Metas;
  data: Category[];
  code: number;
}

export interface Metas {
  copyright: string;
  emails: string;
  api: {
    version: string;
  };
  category: null;
  tag: null;
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: [];
  };
}
