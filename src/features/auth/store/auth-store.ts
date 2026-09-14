"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState, LoginCredentials, RegisterData, User } from "../types";
import { authService } from "../services/mock-auth-service";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const user = await authService.login(credentials);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return { success: true };
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Đăng nhập thất bại. Vui lòng thử lại.";
          set({ isLoading: false, error: message });
          return { success: false, error: message };
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const user = await authService.register(data);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return { success: true };
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Đăng ký thất bại. Vui lòng thử lại.";
          set({ isLoading: false, error: message });
          return { success: false, error: message };
        }
      },

      logout: () => {
        authService.logout().catch(() => {});
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      updateProfile: (data: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updated = { ...currentUser, ...data };
        authService.updateProfile(currentUser.id, data).catch(() => {});
        set({ user: updated });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "mochuong-auth-storage",
      storage: createJSONStorage(() => localStorage),
      // BẢO MẬT: Chỉ lưu thông tin profile công khai và cờ isAuthenticated, tuyệt đối KHÔNG lưu password
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/**
 * Trích xuất 1-2 chữ cái viết tắt đại diện cho người dùng (Initials)
 * VD: "Nguyễn Văn An" => "NA", "Lê Hương" => "LH", "Khách" => "K"
 */
export function getUserInitials(name?: string | null): string {
  if (!name || !name.trim()) return "MH";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  const first = words[0][0];
  const last = words[words.length - 1][0];
  return (first + last).toUpperCase();
}
