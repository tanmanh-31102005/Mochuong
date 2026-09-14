import { User, LoginCredentials, RegisterData } from "../types";

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<User>;
  register(data: RegisterData): Promise<User>;
  logout(): Promise<void>;
  updateProfile(userId: string, data: Partial<User>): Promise<User>;
  requestPasswordReset(email: string): Promise<{ success: boolean; message: string }>;
}
