import { User, LoginCredentials, RegisterData } from "../types";
import { IAuthService } from "./auth-service.interface";

// Danh sách tài khoản mock có sẵn để demo và kiểm thử
interface MockAccount {
  password: string;
  user: User;
}

const INITIAL_MOCK_ACCOUNTS: MockAccount[] = [
  {
    password: "123456",
    user: {
      id: "usr_mochuong_01",
      name: "Nguyễn Văn An",
      email: "nguyenvana@gmail.com",
      phone: "0912345678",
      address: "45/2 Nguyễn Thị Minh Khai, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      birthDate: "1995-08-15",
      createdAt: "2026-01-15T08:00:00.000Z",
    },
  },
  {
    password: "123456",
    user: {
      id: "usr_mochuong_02",
      name: "Khách hàng Mộc Hương",
      email: "khachhang@mochuong.vn",
      phone: "0987654321",
      address: "123 Đường Vườn Thơm, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
      birthDate: "1998-10-20",
      createdAt: "2026-02-01T09:30:00.000Z",
    },
  },
];

class MockAuthService implements IAuthService {
  private accounts: MockAccount[] = [...INITIAL_MOCK_ACCOUNTS];

  async login(credentials: LoginCredentials): Promise<User> {
    // Giả lập độ trễ mạng nhẹ cho trải nghiệm chân thực (300ms)
    await new Promise((resolve) => setTimeout(resolve, 300));

    const email = credentials.email.trim().toLowerCase();
    const account = this.accounts.find(
      (acc) => acc.user.email.toLowerCase() === email
    );

    if (!account) {
      // Nếu là email mới chưa có trong mock, tự động tạo tài khoản vãng lai tiện dụng
      if (credentials.password && credentials.password.length >= 6) {
        const newUser: User = {
          id: `usr_${Date.now()}`,
          name: email.split("@")[0].replace(/[._-]/g, " ").toUpperCase(),
          email: email,
          phone: "0900000000",
          createdAt: new Date().toISOString(),
        };
        this.accounts.push({
          password: credentials.password,
          user: newUser,
        });
        return newUser;
      }
      throw new Error("Tài khoản không tồn tại. Vui lòng kiểm tra lại email hoặc đăng ký.");
    }

    if (credentials.password && account.password !== credentials.password) {
      throw new Error("Mật khẩu không chính xác. Vui lòng thử lại.");
    }

    return account.user;
  }

  async register(data: RegisterData): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const email = data.email.trim().toLowerCase();
    const existing = this.accounts.find(
      (acc) => acc.user.email.toLowerCase() === email
    );

    if (existing) {
      throw new Error("Email này đã được sử dụng. Vui lòng đăng nhập.");
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.name.trim(),
      email: email,
      phone: data.phone.trim(),
      createdAt: new Date().toISOString(),
    };

    this.accounts.push({
      password: data.password || "123456",
      user: newUser,
    });

    return newUser;
  }

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const accIndex = this.accounts.findIndex((acc) => acc.user.id === userId);
    if (accIndex > -1) {
      this.accounts[accIndex].user = {
        ...this.accounts[accIndex].user,
        ...data,
      };
      return this.accounts[accIndex].user;
    }

    // Nếu không tìm thấy trong mock accounts (ví dụ load từ localStorage)
    const updatedUser: User = {
      id: userId,
      name: data.name || "Khách hàng Mộc Hương",
      email: data.email || "",
      phone: data.phone,
      address: data.address,
      birthDate: data.birthDate,
      createdAt: new Date().toISOString(),
      ...data,
    };
    return updatedUser;
  }

  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      success: true,
      message: `Liên kết khôi phục mật khẩu đã được gửi tới email ${email}. Vui lòng kiểm tra hòm thư.`,
    };
  }
}

// Xuất singleton instance
export const authService: IAuthService = new MockAuthService();
