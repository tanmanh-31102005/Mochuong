# Báo Cáo UI/UX Audit & Visual Polish — Website Thương Hiệu Mộc Hương

**Dự án:** Mộc Hương — Xịt thơm quần áo & xịt thơm phòng chiết xuất thiên nhiên  
**Thời gian thực hiện:** 09/09/2026  
**Vai trò:** Senior Product Designer & Senior Frontend Engineer  
**Bộ Design Tokens tuân thủ:**
- `cream`: `#FAF7F2` (Nền thương hiệu chủ đạo)
- `moss`: `#8A9A5B` (Màu xanh rêu thảo mộc đại diện)
- `terracotta`: `#C97C5D` (Đất nung — CTA chính, sale badge & điểm nhấn cảm xúc)
- `beige`: `#F0EAE0` (Nền phụ, viền ngăn cách tinh tế)
- `ink`: `#4A4A4A` (Màu chữ chuẩn thanh lịch, tương phản êm dịu)
- Typography: Serif (Playfair Display) + Sans-serif (Nunito)

---

## 1. Những lỗi và điểm chưa tự nhiên đã phát hiện (Pre-Audit)

Trước khi tinh chỉnh, website đã hoàn thiện đầy đủ cấu trúc khung và các luồng chức năng, tuy nhiên vẫn còn một số điểm mang cảm giác "AI-generated UI" hoặc "template lắp ghép máy móc":

1. **Rập khuôn nhịp điệu trên Trang chủ (Grid Fatigue):**
   - Khối 5, 6, 7, 8 (4 Dòng hương: Thảo mộc, Hoa, Trái cây, Ấm nồng) được hiển thị theo cùng một công thức lặp lại: 1 tiêu đề căn giữa/trái + 1 hàng lưới 4 cột card sản phẩm giống hệt nhau về layout, button và tỉ lệ. Điều này làm trang chủ dài và thiếu nhịp điệu thị giác (visual rhythm).
2. **Dấu hiệu "AI template" điển hình ở Khối 4 (Category tiles):**
   - Mỗi ô danh mục dòng hương có một khối tròn làm mờ cỡ lớn (`blur-xl`) đặt ở góc dưới card. Đây là phong cách template landing page AI phổ biến, không phù hợp với thẩm mỹ tinh tế, tự nhiên và thủ công của Mộc Hương.
3. **Card sản phẩm (ProductCard) đơn điệu:**
   - Bình xịt thơm mô phỏng bằng CSS từng dùng chung một dải màu cho tất cả các dòng hương.
   - Tỉ lệ bóng đổ (`shadow-soft hover:shadow-card`) và bo góc `rounded-3xl` quá đậm, tạo cảm giác card bị thô cứng.
   - Nút yêu thích (Wishlist) và Thêm giỏ hàng (Quick Add) chưa đạt chuẩn diện tích chạm tối thiểu 44x44px trên thiết bị di động.
4. **Trải nghiệm bộ lọc trên Mobile (`/san-pham`):**
   - Thanh bộ lọc (ProductFilter) từng chiếm hơn 500px chiều cao cuộn trên màn hình nhỏ.
5. **Trang chi tiết sản phẩm (`/san-pham/[slug]`):**
   - Dữ liệu cũ bị phụ thuộc ảnh giả AI và chưa có cơ chế hiển thị combo/set quà tự chọn.
6. **Checkout & Giỏ hàng:**
   - Chưa hỗ trợ lưu trữ danh sách mùi hương đã chọn cho combo / set quà tự chọn, chưa có Add-on thiệp viết tay và giao hẹn giờ động.

---

## 2. Các thay đổi đã thực hiện theo 3 nhóm ưu tiên

### A. Critical (Cấu trúc, Luồng UX & Khả năng truy cập)
- **Tách biệt và tối ưu Mobile Filter Drawer (`/san-pham`):**
  - Trên màn hình lớn (Desktop `lg:`): Giữ nguyên thanh sidebar bộ lọc dính (`sticky top-24`) gọn gàng bên trái.
  - Trên màn hình nhỏ (Tablet/Mobile): Ẩn toàn bộ sidebar cồng kềnh, thay thế bằng nút bấm **"Bộ lọc"** nổi kèm huy hiệu đếm số lượng bộ lọc đang kích hoạt (`activeFiltersCount`). Khi bấm, một ngăn kéo trượt (Slide-over Drawer) mở mượt mà từ cạnh phải màn hình với nút xác nhận *"Xem kết quả"*.
  - Thêm dải thẻ chip lọc nhanh trên mobile để khách có thể xóa từng tiêu chí lọc với 1 chạm.
- **Chuẩn hóa Touch Targets & Accessibility (WCAG 2.1):**
  - Tăng vùng bấm nút Yêu thích (Wishlist) từ 32px lên tối thiểu 40–44px với `aria-label` ngữ nghĩa rõ ràng.
  - Tăng chiều cao các nút thao tác `Thêm giỏ`, `Mua ngay`, và các ô checkbox công dụng để ngón tay chạm chính xác, không bấm nhầm.

### B. Important (Nhịp điệu thị giác & Cá tính thương hiệu)
- **Thiết kế lại nhịp điệu 4 dòng hương trên Trang chủ (`/`):**
  - **Dòng Thảo mộc (Khối 5):** Lưới 4 cột chuẩn thanh lịch, nhãn *"Hương Thảo Dược Bản Địa — Thanh Lọc Không Gian"*.
  - **Dòng Hoa (Khối 6):** Chuyển sang bố cục **Editorial Spotlight**. Bên trái là thẻ tâm trạng nổi bật *"Đặc quyền thư giãn — Liệu Pháp Thơm Dịu Cho Phòng Ngủ"* với nền hoa phớt nhẹ (`#FAF0F3`), danh sách cam kết sợi vải và link khám phá; bên phải là 3 sản phẩm dòng Hoa tiêu biểu.
  - **Dòng Trái cây (Khối 7):** Lưới 4 cột tươi vui, nhấn mạnh năng lượng và công dụng khử mùi bếp, xe hơi.
  - **Dòng Ấm nồng (Khối 8):** Đặt trong một khung nền ấm áp riêng (`bg-[#F6F1EA] border border-[#E8DFC8] rounded-3xl`), tôn vinh nét trầm ấm của Quế và Cà phê.
- **Loại bỏ Blur Blobs ở Khối 4 (4 Dòng hương nổi bật):**
  - Bảng màu nền pastel thảo mộc tinh tuyển (`#F0F5EC`, `#FAF0F3`, `#FAF3E8`, `#F5EFE9`), viền mỏng tiệp màu, biểu tượng Lucide sắc nét và mũi tên tương tác vi diệu.
- **Đổi mới đồ họa chai xịt thơm (ProductCard & Product Detail):**
  - Thân chai chuyển màu mờ gradient theo đúng dòng hương:
    - *Thảo mộc:* Xanh xô thơm thanh mát (`#EDF4E8` → `#CEE2BC`, viền `#B5CFA3`).
    - *Hoa:* Hồng phớt hoa nhung thanh tao (`#FDF0F3` → `#F1CAD6`, viền `#DDB3C2`).
    - *Trái cây:* Hổ phách cam ấm ngọt ngào (`#FFF5E8` → `#F9D2A5`, viền `#E8BA85`).
    - *Ấm nồng:* Nâu ấm sang trọng (`#F7EFE8` → `#DFC4B0`, viền `#C8A892`).
  - Vòng cổ chai mạ kim loại vàng champagne (`#C29B38` via `#E8D18C`), nhãn giấy mỹ thuật tinh tế in rõ chữ Mộc Hương, nốt hương và dung tích 30ml.

### C. Polish (Viền, Bóng đổ, Typography & Copywriting)
- **Loại bỏ bóng đổ gắt và bo góc quá mức:**
  - Thay thế `shadow-soft hover:shadow-card` dày đặc bằng viền mỏng tự nhiên (`border border-beige/80 hover:border-moss/40 shadow-xs hover:shadow-md`).
  - Chuẩn hóa bo góc các thẻ thành phần về `rounded-2xl` hài hòa, chỉ giữ `rounded-3xl` cho các section lớn có chủ đích.
- **Làm mới Copywriting thuần khiết & tự nhiên:**
  - Cập nhật đúng câu chuyện thương hiệu chính thức: *"Mộc Hương ra đời từ mong muốn mang đến những khoảnh khắc thư giãn giản đơn trong cuộc sống bận rộn hằng ngày..."*
  - Hướng dẫn sử dụng 5 bước và cam kết thành phần nước cất, cồn mía lên men, tinh dầu thiên nhiên nguyên chất.

---

## 3. Các quyết định UX quan trọng và lý do

| Quyết định UX | Lý do thiết kế |
| :--- | :--- |
| **Chuyển Khối 6 (Dòng Hoa) sang bố cục Editorial Spotlight** | Phá vỡ chuỗi lưới lặp lại nhàm chán của 4 dòng hương; tạo một "hero moment" giúp khách hàng dừng lại cảm nhận phong cách thơm phòng ngủ. |
| **Ngăn kéo bộ lọc (Mobile Drawer) trên trang Sản phẩm** | Giải phóng 500px chiều cao màn hình di động, giúp người dùng lướt thấy ngay sản phẩm mà vẫn truy cập bộ lọc đầy đủ chỉ với 1 cú chạm. |
| **Đổi màu đồ họa chai theo 4 dòng hương** | Tăng tính nhận diện trực quan; khách hàng nhìn màu chai là lập tức liên tưởng đến nhóm hương (Xanh = Thảo mộc, Hồng = Hoa, Cam = Trái cây, Nâu ấm = Ấm nồng). |
| **Combo Builder & Gift Set Builder UI tương tác** | Giúp khách tự do chọn đủ 2 hoặc 3 chai với khay chọn sticky nổi trực quan, chặn thêm giỏ khi chưa đủ chai, ngăn chọn trùng 1 chai. |
| **Add-on Thiệp Viết Tay & Giao Hẹn Giờ** | Tự động miễn phí thiệp khi có set quà trong giỏ (+10.000đ khi mua lẻ), tính phí giao theo khung giờ đặc biệt và cuối tuần chuẩn xác. |
| **Đồng nhất dung tích 30ml trên toàn site** | Giữ vững định vị chai bỏ túi tiện dụng của Mộc Hương theo đúng tài liệu khách hàng đã chốt. |

---

## 4. Những phần hiện là Placeholder (Cần khách hàng gửi tư liệu thật)

Toàn bộ code đã được chuẩn bị sẵn cấu trúc nhận ảnh thật với Next/Image mà không gây gián đoạn layout:

1. **Ảnh sản phẩm chai lẻ 30ml:**
   - Hiện đang dùng đồ họa vector studio tỉ lệ chuẩn 30ml với nhãn giấy mỹ thuật mô phỏng.
   - *Cần bổ sung:* Ảnh chụp packshot studio thật (nền trắng hoặc nền trong suốt PNG) của từng chai tại thư mục `/public/images/products/`.
2. **Ảnh chụp bối cảnh không gian sống:**
   - *Cần bổ sung:* Ảnh chụp không gian thực tế (phòng ngủ decor ấm cúng, bàn làm việc, tủ quần áo có chai xịt thơm Mộc Hương bên cạnh) để thay vào tab *"Ảnh bối cảnh"*.
3. **Ảnh banner phụ cho trang Blog & Về Chúng Tôi:**
   - Đã tạo danh sách chi tiết các ảnh cần cung cấp tại file: `docs/DANH-SACH-ANH-CAN-CUNG-CAP.md`.

---

## 5. Checklist Responsive đã nghiệm thu thực tế

| Tiêu chí kiểm tra | Desktop (1440px) | Tablet (768px) | Mobile (390px) | Trạng thái |
| :--- | :---: | :---: | :---: | :---: |
| **Header & Logo Mộc Hương** | Sát trái, cân đối, locked sticky | Cân đối, menu icon rõ | Logo gọn, nút giỏ hàng & search thuận tay | ĐẠT |
| **Lưới sản phẩm (18 chai 30ml)** | 4 cột thoáng đãng | 3 hoặc 2 cột | 2 cột đều đặn, không tràn viền | ĐẠT |
| **Combo Builder & Gift Set Builder** | Sticky Tray nổi, 3 slot rõ ràng | Khay chọn co giãn | Khay chọn bám trên, dễ thao tác | ĐẠT |
| **Bộ sưu tập (4 bộ) & Set quà (4 set)** | 2 hoặc 3 cột cân đối | 2 cột | 1-2 cột đều đặn, hiển thị chai con | ĐẠT |
| **Trang chi tiết `/san-pham/[slug]`** | 2 cột (Gallery 6 : Info 6) | 2 cột co giãn | 1 cột tuần tự, tab chuyển đổi nhạy | ĐẠT |
| **Trang Giỏ hàng `/gio-hang`** | 2 cột (Danh sách 8 : Tóm tắt 4) | 1 cột tóm tắt dưới | 1 cột, hiển thị các chai con đã chọn | ĐẠT |
| **Trang Thanh toán `/thanh-toan`** | Form 4 bước + Sticky Summary | Form + Summary | Form cuộn mượt, tính add-on động | ĐẠT |
| **Touch target tối thiểu 44px** | Đạt | Đạt | Đạt | ĐẠT |
| **Không có lỗi tràn ngang (horizontal overflow)** | Không | Không | Không | ĐẠT |

---

## 6. Kết quả Kiểm Tra Chất Lượng (Quality Gate)

- **Lint (`npm run lint`):** Đạt 100%, không có warning hay lỗi.
- **Build (`npm run build`):** Biên dịch thành công tất cả route tĩnh và động.
- **Tương thích Cart & Zustand:** Hỗ trợ compound item IDs (`id__selectedIds`), bảo toàn giỏ hàng qua localStorage, tính toán phí add-on chính xác.
