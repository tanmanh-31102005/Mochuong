// 1. FragranceLine: 4 dòng hương Thảo mộc, Hoa, Trái cây, Ấm nồng
export type FragranceLine = "thao-moc" | "hoa" | "trai-cay" | "am-nong";
export type DongHuong = FragranceLine; // Backward compatibility alias

// 2. FragranceName: Tên nốt hương chuẩn theo 18 sản phẩm chính thức
export type FragranceName =
  // Thảo mộc – Thanh lọc (4)
  | "Sả Chanh"
  | "Tràm gió"
  | "Tràm trắng"
  | "Hương thảo"
  // Hoa – Dịu nhẹ (6)
  | "Hoa sen"
  | "Hoa nhài"
  | "Ngọc lan tây"
  | "Hoa ly"
  | "Hoa violet"
  | "Hoa anh đào"
  // Trái cây – Tươi mát (6)
  | "Bưởi"
  | "Quýt"
  | "Cam"
  | "Chanh"
  | "Dứa"
  | "Bạc Hà"
  // Ấm nồng – Cá tính (2)
  | "Quế"
  | "Cà phê"
  | (string & {});

// 3. Benefit: Cảm xúc & công dụng nổi bật
export type Benefit =
  | "thanh-loc"
  | "khang-khuan"
  | "thu-gian"
  | "tuoi-mat"
  | "am-ap"
  | "tinh-tao"
  | "can-bang"
  | "sang-khoai";
export type CongDung = Benefit;

// 4. ProductKind: Phân loại chi tiết đáp ứng Requirement 2
export type ProductKind =
  | "SINGLE_PRODUCT" // 18 sản phẩm lẻ 30ml
  | "CONFIGURABLE_COMBO" // Combo 3 chai tự chọn (129k)
  | "FIXED_COLLECTION" // 4 Bộ sưu tập trọn bộ cố định
  | "GIFT_SET_CUSTOM" // Set quà tự chọn 2 hoặc 3 chai (Mini / Tinh Tế)
  | "GIFT_SET_FIXED"; // Set quà chủ đề cố định (Ngủ ngon / Năng lượng)

// 5. ProductType: Phân loại route tương thích hệ thống Next.js hiện tại
export type ProductType = "SINGLE" | "COLLECTION" | "GIFT_SET";

export interface IncludedItem {
  productId?: string;
  scentName: string;
  capacity?: string;
  quantity?: number;
  description?: string;
  slug?: string;
}

export interface Product {
  id: string;
  slug: string;
  productType: ProductType; // "SINGLE" | "COLLECTION" | "GIFT_SET"
  productKind?: ProductKind; // Phân loại chi tiết data model
  tenMuiHuong: string; // Tên hiển thị đầy đủ
  scentName?: FragranceName; // Tên nốt hương chính (cho chai lẻ)
  dongHuong: FragranceLine | FragranceLine[]; // Thuộc dòng hương nào
  dongHuongLabel?: string; // Tên hiển thị dòng hương ("Thảo mộc – Thanh lọc", v.v.)
  noteHuong?: string; // Tóm tắt nốt hương ("Thanh lọc – Kháng khuẩn", v.v.)
  congDungChinh?: string; // Tóm tắt công dụng chính
  moTaNgan: string;
  moTaCamXuc?: string; // Ví dụ: "Thanh lọc – Kháng khuẩn", "Dịu dàng – Thư giãn"
  congDungNoiBat?: string; // Ví dụ: "Khử mùi ẩm mốc, làm sạch không khí, xua muỗi nhẹ"
  dungTich: "30ml" | string; // Dung tích sản phẩm lẻ cố định là 30ml
  gia: number; // Giá bán
  giaKhuyenMai?: number;
  giaLeGoc?: number; // Giá lẻ gốc tham khảo
  giaLeCongDon?: number; // Giá lẻ tham khảo hoặc tổng giá lẻ cộng dồn
  soTienTietKiem?: number; // Số tiền tiết kiệm (VNĐ)
  phanTramTietKiem?: number; // % Tiết kiệm
  soChai?: number; // Số lượng chai trong bộ
  tietKiem?: string; // Ví dụ: "đến 15%", "~11%"
  requiredBottleCount?: number; // Số chai cần chọn (2 hoặc 3 nếu là combo/set tự chọn)
  isConfigurable?: boolean; // True nếu cho phép khách tự chọn chai
  accessoriesIncluded?: string[]; // Phụ kiện hộp quà kèm theo
  hinhAnh: {
    nhan: string; // ảnh cận nhãn
    boiCanh: string[]; // ảnh bối cảnh sử dụng
  };
  thanhPhanCongDung: string;
  huongDanSuDung: string;
  danhGiaSao: number;
  soLuongDanhGia: number;
  laSetQuaTang: boolean;
  chaiTrongSet?: string[]; // Danh sách IDs các chai bên trong
  includedItems?: IncludedItem[]; // Danh sách chi tiết các chai bên trong
  badge?: string; // "Bán chạy", "Mới", "COMBO TIẾT KIỆM", "Quà tặng ý nghĩa"
  congDung?: Benefit[];
  notHuong?: string[];
  phuHopVoi?: string[];
  boxStyle?: string;
  hasGreetingCard?: boolean;
}

// Model cho Combo tự chọn
export interface ConfigurableOffer extends Product {
  productKind: "CONFIGURABLE_COMBO";
  isConfigurable: true;
  requiredBottleCount: 3;
}

// Model cho Bộ sưu tập trọn bộ cố định
export interface FixedCollection extends Product {
  productKind: "FIXED_COLLECTION";
  productType: "COLLECTION";
  includedItems: IncludedItem[];
  giaLeCongDon: number;
}

// Model cho Set quà tặng
export interface GiftSetOffer extends Product {
  productKind: "GIFT_SET_CUSTOM" | "GIFT_SET_FIXED";
  productType: "GIFT_SET";
  laSetQuaTang: true;
}

// Model cho Add-on dịch vụ thanh toán
export interface AddOnOptions {
  handwrittenCard: {
    enabled: boolean;
    message: string;
    fee: number;
  };
  deliverySchedule: {
    enabled: boolean;
    date: string;
    timeSlot: string;
    fee: number;
  };
}

export type SortOption =
  | "newest"
  | "best-seller"
  | "price-asc"
  | "price-desc"
  | "name-az";

export interface FilterState {
  dongHuong: FragranceLine[];
  minPrice: number;
  maxPrice: number;
  congDung: Benefit[];
  minRating: number;
  searchQuery: string;
  productType?: ProductType | "ALL";
}

/**
 * Trả về URL tuyến đường chuẩn hóa theo loại sản phẩm
 */
export function getProductUrl(product: {
  productType?: ProductType;
  slug: string;
  laSetQuaTang?: boolean;
  id?: string;
}): string {
  if (
    product.productType === "GIFT_SET" ||
    (product.laSetQuaTang && !product.id?.startsWith("combo-"))
  ) {
    return `/set-qua-tang/${product.slug}`;
  }
  if (product.productType === "COLLECTION" || product.id?.startsWith("combo-")) {
    return `/bo-suu-tap/${product.slug}`;
  }
  return `/san-pham/${product.slug}`;
}
