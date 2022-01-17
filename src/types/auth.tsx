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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface UpdateUserProfile {
  firstName: string;
  lastName: string;
}

export interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ErrorResponse {
  meta: {
    version: string;
    error_type: string;
  };
  errors: Error[];
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
export type UserResponse = UserSuccess | ErrorResponse;

export type LoginUserResponse = LoggedUser | ErrorResponse;

export type UserProfile = UserSuccess;

export type ForgotPasswordResponse = UserResponse | ErrorResponse;

export type ChangePasswordResponse = UserResponse | ErrorResponse;
