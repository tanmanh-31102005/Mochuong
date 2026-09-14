# TÀI LIỆU BÀN GIAO TOÀN DIỆN DỰ ÁN MỘC HƯƠNG

> **Dự án**: Website Thương mại Điện tử Mộc Hương — Tinh dầu Xịt thơm phòng & Quần áo  
> **Kiến trúc**: Next.js 15+ (App Router), TypeScript, Tailwind CSS, Feature-Based Architecture, Zustand  
> **Dữ liệu sản phẩm**: Đã cập nhật 100% dữ liệu chính thức do khách hàng cung cấp (18 sản phẩm đơn lẻ 30ml, 1 combo tự chọn, 4 bộ sưu tập, 4 set quà tặng).

---

## 1. TỔNG QUAN CATALOG CHÍNH THỨC

Tất cả sản phẩm lẻ đều có **dung tích cố định 30ml**.

### 1.1. Bảng 18 Sản Phẩm Lẻ (Phân theo 4 Dòng Hương)

| STT | Mã Sản Phẩm (ID) | Tên Mùi Hương | Dòng Hương | Đơn Giá | Nốt Hương & Công Dụng Chính |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `thao-moc-sa-java` | Sả Java | Thảo mộc – Thanh lọc | 45.000đ | Thanh lọc – Kháng khuẩn. Khử mùi ẩm mốc, làm sạch không khí, xua muỗi nhẹ. |
| 2 | `thao-moc-tram-gio` | Tràm gió | Thảo mộc – Thanh lọc | 45.000đ | Ấm dịu – Thông thoáng. Sát khuẩn nhẹ, hỗ trợ thông thoáng đường thở. |
| 3 | `thao-moc-tram-trang` | Tràm trắng | Thảo mộc – Thanh lọc | 45.000đ | Thanh khiết – Nhẹ nhàng. Thanh lọc không gian, dịu nhẹ cho hệ hô hấp. |
| 4 | `thao-moc-huong-thao` | Hương thảo | Thảo mộc – Thanh lọc | 45.000đ | Tỉnh táo – Tập trung. Tăng sự tỉnh táo, hỗ trợ tinh thần minh mẫn. |
| 5 | `hoa-hoa-sen` | Hoa sen | Hoa – Dịu nhẹ | 55.000đ | Thanh khiết – Thư thái. Cân bằng cảm xúc, mang lại cảm giác thanh tịnh. |
| 6 | `hoa-hoa-nhai` | Hoa nhài | Hoa – Dịu nhẹ | 55.000đ | Dịu dàng – Thư giãn. Giảm căng thẳng, hỗ trợ giấc ngủ ngon hơn. |
| 7 | `hoa-ngoc-lan-tay` | Ngọc lan tây | Hoa – Dịu nhẹ | 55.000đ | Quyến rũ – Cân bằng. Cân bằng cảm xúc, tạo cảm giác thư thái sâu. |
| 8 | `hoa-hoa-ly` | Hoa ly | Hoa – Dịu nhẹ | 55.000đ | Sang trọng – Nhẹ nhàng. Mang lại không gian sang trọng, tinh tế. |
| 9 | `hoa-hoa-violet` | Hoa violet | Hoa – Dịu nhẹ | 55.000đ | Dịu dàng – Nữ tính. Tạo cảm giác ấm áp, gần gũi, nữ tính. |
| 10 | `hoa-hoa-anh-dao` | Hoa anh đào | Hoa – Dịu nhẹ | 55.000đ | Ngọt ngào – Tươi trẻ. Mang lại cảm giác tươi mới, vui tươi. |
| 11 | `trai-cay-buoi` | Bưởi | Trái cây – Tươi mát | 45.000đ | Tươi mát – Sảng khoái. Khử mùi hiệu quả, mang lại cảm giác tươi mới. |
| 12 | `trai-cay-quyt` | Quýt | Trái cây – Tươi mát | 45.000đ | Vui tươi – Ấm áp nhẹ. Tạo không khí vui vẻ, ấm cúng. |
| 13 | `trai-cay-cam` | Cam | Trái cây – Tươi mát | 45.000đ | Tràn đầy năng lượng. Kích thích tinh thần, tăng sự hứng khởi. |
| 14 | `trai-cay-chanh` | Chanh | Trái cây – Tươi mát | 45.000đ | Sảng khoái tức thì. Khử mùi nhanh, mang lại cảm giác sạch sẽ. |
| 15 | `trai-cay-dua` | Dứa | Trái cây – Tươi mát | 45.000đ | Nhiệt đới – Vui nhộn. Mang lại không khí tươi vui, phóng khoáng. |
| 16 | `trai-cay-tao-xanh` | Táo xanh | Trái cây – Tươi mát | 45.000đ | Tươi mới – Trẻ trung. Cảm giác trẻ trung, năng động. |
| 17 | `am-nong-que` | Quế | Ấm nồng – Cá tính | 50.000đ | Ấm áp – Quyến rũ. Tạo cảm giác ấm cúng, thu hút, phù hợp mùa lạnh. |
| 18 | `am-nong-ca-phe` | Cà phê | Ấm nồng – Cá tính | 50.000đ | Tỉnh táo – Cá tính. Khử mùi mạnh, kích thích tỉnh táo, phong cách riêng. |

---

### 1.2. Combo 3 Chai Tự Chọn (`combo-3-chai-tu-chon`)
- **Đặc điểm**: Khách hàng tự do chọn đúng 3 trong 18 chai 30ml qua giao diện **Combo Builder UI**.
- **Giá cố định**: **129.000đ** (Tham khảo giá lẻ 135.000đ – 165.000đ, tiết kiệm tới 15%).
- **Quy tắc**:
  - Không cho phép chọn quá 3 chai.
  - Phải đủ đúng 3 chai mới kích hoạt nút thêm giỏ hàng.
  - Được chọn nhiều chai cùng dòng hương, nhưng không được chọn trùng 1 sản phẩm hai lần.
  - Cart Item lưu mảng `selectedProductIds` và `selectedProducts` để hiển thị chi tiết trong giỏ hàng.

---

### 1.3. Bốn (4) Bộ Sưu Tập Cố Định

| Bộ Sưu Tập | Số Chai | Giá Lẻ Gốc | Giá Trọn Bộ | Tiết Kiệm | Ghi Chú & Link Sản Phẩm |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Trọn bộ Thảo mộc – Thanh lọc** | 4 chai | 180.000đ | **160.000đ** | 20.000đ (-11%) | Sả Java, Tràm gió, Tràm trắng, Hương thảo |
| **Trọn bộ Hoa – Dịu nhẹ** | 6 chai | 330.000đ | **290.000đ** | 40.000đ (-12%) | Hoa sen, Hoa nhài, Ngọc lan tây, Hoa ly, Hoa violet, Hoa anh đào |
| **Trọn bộ Trái cây – Tươi mát** | 6 chai | 270.000đ | **235.000đ** | 35.000đ (-13%) | Bưởi, Quýt, Cam, Chanh, Dứa, Táo xanh |
| **Trọn bộ Ấm nồng – Cá tính** | 2 chai | 100.000đ | **89.000đ** | 11.000đ (-11%) | Quế, Cà phê |

*Mỗi card và trang chi tiết bộ sưu tập hiển thị đầy đủ: danh sách chai kèm link mua lẻ, giá lẻ, giá bộ, số tiền và % tiết kiệm, nút Thêm trọn bộ.*

---

### 1.4. Bốn (4) Set Quà Tặng Mộc Hương

1. **Set Quà Tặng Mini (Tự chọn — 99.000đ)**:
   - Khách tự chọn đúng **2 chai** trong 18 chai (Gift Set Builder UI).
   - Phụ kiện bao gồm: Hộp giấy kraft + thiệp cảm ơn + dây ruy băng.
2. **Set Quà Tặng Tinh Tế (Tự chọn — 189.000đ)**:
   - Khách tự chọn đúng **3 chai** trong 18 chai (Gift Set Builder UI).
   - Phụ kiện bao gồm: Hộp cứng cao cấp + ruy băng lụa + thiệp viết tay + túi thơm khô mini.
3. **Set Thư Giãn Ngủ Ngon (Cố định — 169.000đ)**:
   - 3 Chai có sẵn: Hoa nhài + Ngọc lan tây + Hương thảo + hộp quà + thiệp chúc.
4. **Set Tỉnh Táo Tràn Đầy Năng Lượng (Cố định — 159.000đ)**:
   - 3 Chai có sẵn: Cam + Chanh + Cà phê + hộp quà + thiệp chúc.

---

## 2. NỘI DUNG VÀ HƯỚNG DẪN DÙNG CHUNG

Được lưu trữ tập trung tại `src/core/config/product-shared.config.ts`, không sao chép lặp code trên 18 object:
- **Thành phần**: Nước cất tinh khiết, cồn thực phẩm lên men từ mía đường tự nhiên, tinh dầu thiên nhiên nguyên chất — không chất bảo quản, không hương liệu tổng hợp.
- **5 Bước Hướng Dẫn Sử Dụng**:
  1. Lắc đều chai trước khi sử dụng.
  2. Xịt cách bề mặt vải hoặc không gian khoảng 20–30cm.
  3. Để khô tự nhiên trong 5–10 phút trước khi mặc hoặc cất vào tủ.
  4. Không xịt trực tiếp lên vải lụa, da thuộc hoặc chất liệu dễ ố màu.
  5. Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.

---

## 3. DỊCH VỤ ADD-ON THANH TOÁN (CHECKOUT)

### 3.1. Dịch Vụ Thiệp Viết Tay
- Tùy chọn checkbox và textarea lời nhắn khách nhập.
- **Miễn phí (0đ)**: Nếu giỏ hàng có bất kỳ sản phẩm nào là Set Quà Tặng (`hasGiftSet() === true`).
- **Phụ thu (10.000đ)**: Nếu giỏ hàng chỉ có sản phẩm đơn lẻ, combo hoặc bộ sưu tập.

### 3.2. Dịch Vụ Giao Hàng Hẹn Giờ
- Chọn ngày nhận (Date Picker, tối thiểu từ ngày hiện tại).
- 5 Khung giờ hẹn được cấu hình linh hoạt:
  - 08:00 – 12:00: 0đ (giờ chuẩn)
  - 13:00 – 17:00: 0đ (giờ chuẩn)
  - Trước 08:00: +15.000đ (`earlyMorning`)
  - Sau 17:00: +15.000đ (`evening`)
  - Cuối tuần (Thứ 7 / CN): +20.000đ (`weekend`)
- Phụ thu được tính động và hiển thị chi tiết trong bảng Tóm tắt đơn hàng.

---

## 4. THÔNG TIN LIÊN HỆ & THƯƠNG HIỆU

Cập nhật chính thức tại `src/core/config/site.config.ts`:
- **Địa chỉ**: “Đang cập nhật” (Hiển thị placeholder rõ ràng).
- **Điện thoại/Zalo**: “Đang cập nhật”.
- **Email chính thức**: `mochuong.handmade@gmail.com`.
- **Mạng xã hội (Facebook/TikTok)**: Hiển thị “Đang cập nhật” rõ ràng, tuyệt đối không tạo link giả.
- **Câu chuyện thương hiệu**: Sử dụng nguyên văn câu mở đầu chính thức:  
  *“Mộc Hương ra đời từ mong muốn mang đến những khoảnh khắc thư giãn giản đơn trong cuộc sống bận rộn hằng ngày...”* (bản đầy đủ tại trang Về Chúng Tôi, bản rút gọn tại Trang chủ & Footer).

---

## 5. HÌNH ẢNH CẦN CUNG CẤP

Hệ thống đang sử dụng đồ họa vector CSS chuẩn studio với màu sắc map chính xác theo 4 dòng hương (xanh rêu, hồng phớt, hổ phách, nâu ấm). Chi tiết danh sách ảnh packshot, bối cảnh và hộp quà xem tại file:
👉 [`docs/DANH-SACH-ANH-CAN-CUNG-CAP.md`](./DANH-SACH-ANH-CAN-CUNG-CAP.md)
