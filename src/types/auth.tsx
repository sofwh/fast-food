export interface User {
  id: number;
  email: string;
  username: null;
  firstName: string;
  lastName: string;
  verified: boolean;
  mobileNumber: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  total_loyalty_points: null;
}

export interface UserSuccess {
  meta: Metas;
  data: User;
  code: number;
}

export interface LoggedUser {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  warehouse_id: number;
}

export interface UserRegister {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface UpdateUserProfile {
  first_name: string;
  last_name: string;
}

export interface ChangePasswordBody {
  old_password: string;
  new_password: string;
  confirm_password: string;
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

export interface UserOrder {
  orderNumber: string;
  orderDate: string;
  orderProductsCount: number;
  total: number;
  status: string;
}

export interface OrderHistory {
  meta: Metas;
  data: UserOrder[];
  code: number;
}

export type UserResponse = UserSuccess | ErrorResponse;

export type LoginUserResponse = LoggedUser | ErrorResponse;

export type UserProfile = UserSuccess;

export type ForgotPasswordResponse = UserResponse | ErrorResponse;

export type ChangePasswordResponse = UserResponse | ErrorResponse;
