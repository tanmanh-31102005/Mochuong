# Mộc Hương — Website Thương Mại Điện Tử (Chuẩn Production-Grade 2026)

Hệ thống website bán hàng trực tuyến thương hiệu **Mộc Hương** ("Hương thơm từ thiên nhiên — Thơm mát từng khoảnh khắc"), chuyên dòng sản phẩm xịt thơm quần áo & thơm phòng 30ml chiết xuất tinh dầu thảo mộc thiên nhiên.

---

## Công Nghệ Sử Dụng (Stack 2026)

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/) — Type-safety tuyệt đối cho dữ liệu sản phẩm, đơn hàng và giỏ hàng.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — Cấu hình hệ thống Design Tokens (Màu sắc, Spacing, Typography).
- **Icons**: [Lucide React](https://lucide.dev/) — Bộ icon hiện đại, sắc nét.
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) — Quản lý giỏ hàng toàn cục kèm lưu trữ tự động `localStorage`.
- **Typography**: Google Fonts qua `next/font`:
  - `Playfair Display` (Serif tiêu đề sang trọng)
  - `Nunito` (Sans-serif thân thiện, dễ đọc)

---

## Bảng Màu Thương Hiệu (Design Tokens)

- **`cream` (`#FAF7F2`)**: Nền chính toàn trang, tạo cảm giác nhẹ nhàng, tự nhiên.
- **`moss` (`#8A9A5B`)**: Màu chủ đạo (Xanh rêu), dùng cho Logo, Badge, Icon, Tiêu đề dòng hương.
- **`terracotta` (`#C97C5D`)**: Màu nhấn / CTA (Nâu đất), dùng cho nút Thêm vào giỏ, Mua ngay, Badge giảm giá.
- **`beige` (`#F0EAE0`)**: Nền xen kẽ (Cam kết thương hiệu, Footer) tạo nhịp điệu thị giác.
- **`ink` (`#4A4A4A`)**: Chữ chính nội dung, sắc độ êm dịu bảo vệ thị giác.

---

## Cấu Trúc Thư Mục (Feature-Based Architecture)

```text
moc-huong-web/
├── src/
│   ├── app/                              # App Router (Chỉ chứa routing & layout)
│   │   ├── layout.tsx                    # Root layout (Header, Footer, fonts, metadata)
│   │   ├── page.tsx                      # Trang chủ 14 khối nội dung
│   │   ├── globals.css                   # Tailwind base + Design Tokens
│   │   ├── (shop)/                       # Mua hàng (sản phẩm, giỏ hàng, thanh toán)
│   │   │   ├── san-pham/                 # Danh mục & Chi tiết sản phẩm [slug]
│   │   │   ├── gio-hang/                 # Giỏ hàng & voucher
│   │   │   └── thanh-toan/               # Checkout 4 bước
│   │   ├── (account)/                    # Tài khoản, đơn hàng, yêu thích
│   │   └── (info)/                       # Về chúng tôi, liên hệ, blog, chính sách, faq
│   ├── features/                         # Feature Modules (UI + Logic + Data)
│   │   ├── products/                     # ProductCard, Filter, Sort, Mock Data, Types
│   │   ├── cart/                         # CartDrawer, Zustand Store
│   │   ├── reviews/                      # Reviews data
│   │   └── blog/                         # Blog data
│   ├── shared/                           # Dùng chung (Atomic UI, Layout, Hooks, Utils)
│   └── core/                             # Config, constants
├── public/                               # Static images (banner, logo, products)
├── docs/
│   ├── Cau-truc-Website-Moc-Huong.docx   # File yêu cầu gốc từ khách hàng
│   └── GHI-CHU-BAN-GIAO.md               # Hướng dẫn thay thế ảnh & nội dung thật
└── tailwind.config.ts                    # Cấu hình tokens màu & font
```

---

## Hướng Dẫn Cài Đặt & Khởi Chạy

1. **Cài đặt thư viện phụ thuộc**:
   ```bash
   npm install
   ```

2. **Chạy máy chủ phát triển (Dev Server)**:
   ```bash
   npm run dev
   ```
   Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

3. **Build kiểm tra Production**:
   ```bash
   npm run build
   ```
