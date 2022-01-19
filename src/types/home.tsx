import { Category } from "./categories";
import { Product } from "./Products";

export interface HomeResponse {
  meta: {
    copyright: string;
    emails: string;
    api: {
      version: string;
    };
    applayout: {
      applayout_id: number;
      applayout_title: string;
    };
  };
  data: HomeData[];
}

export interface HomeData {
  id: number;
  title: string;
  status: boolean;
  position: number;
  details: DataDetails[] | null;
  sectionDetails: {
    id: number;
    title: string;
    design_type: string;
    auto_scroll: boolean;
    method_type: string;
    category_search: string | null;
    collection_type: string;
    description: string;
    start_date: string;
    end_date: string;
    products: Product[] | [];
  };
  categories: Category[];
}

export interface DataDetails {
  title: string;
  category_search: string;
  web_link: string | null;
  status: boolean;
  description: string;
  start_date: string;
  end_date: string;
  method_type: string;
  subsection_exist: string;
  images: string;
  category: number;
  id: number;
  position: number;
}

export interface Error {
  title: string;
  message: string;
}

export interface ErrorResponse {
  data: {
    meta: {
      copyright: string;
      emails: string;
      api: {
        version: string;
      };
    };
    errors: Error[];
    code: number;
  };
}
