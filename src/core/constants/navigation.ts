export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: { label: string; href: string; desc?: string }[];
}

export const MAIN_NAVIGATION: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Xịt thơm quần áo",
    href: "/san-pham",
    children: [
      {
        label: "Dòng Thảo mộc – Kháng khuẩn",
        href: "/dong-huong/thao-moc-thanh-loc",
        desc: "Khử sạch mùi ẩm mốc, kháng khuẩn sợi vải (Sả Chanh, Tràm gió...)",
      },
      {
        label: "Dòng Hoa – Dịu nhẹ",
        href: "/dong-huong/hoa-diu-nhe",
        desc: "Ướp hương áo quần & chăn gối nhẹ dịu (Hoa sen, Hoa nhài...)",
      },
      {
        label: "Dòng Trái cây – Tươi mát",
        href: "/dong-huong/trai-cay-tuoi-mat",
        desc: "Khử mùi thức ăn & mồ hôi sảng khoái (Bưởi, Cam, Bạc hà...)",
      },
      {
        label: "Dòng Ấm nồng – Cá tính",
        href: "/dong-huong/am-nong-ca-tinh",
        desc: "Hương gỗ sang trọng lưu giữ trên áo khoác (Quế, Cà phê...)",
      },
      {
        label: "Tất cả xịt thơm quần áo",
        href: "/san-pham",
        desc: "Xem trọn bộ 18 nốt hương xịt thơm trang phục 30ml",
      },
    ],
  },
  {
    label: "Bộ sưu tập",
    href: "/bo-suu-tap",
    badge: "Tiết kiệm 20%",
  },
  {
    label: "Set quà tặng",
    href: "/set-qua-tang",
    badge: "Hot",
  },
  { label: "Về Mộc Hương", href: "/ve-chung-toi" },
  { label: "Mẹo xịt thơm vải", href: "/blog" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const FOOTER_LINKS = {
  fragranceLines: [
    { label: "Xịt thơm Thảo mộc (Khử ẩm mốc)", href: "/dong-huong/thao-moc-thanh-loc" },
    { label: "Xịt thơm Hoa (Dịu nhẹ êm ái)", href: "/dong-huong/hoa-diu-nhe" },
    { label: "Xịt thơm Trái cây (Khử mùi lẩu nướng)", href: "/dong-huong/trai-cay-tuoi-mat" },
    { label: "Xịt thơm Ấm nồng (Áo khoác mùa đông)", href: "/dong-huong/am-nong-ca-tinh" },
    { label: "Bộ sưu tập xịt thơm trọn bộ", href: "/bo-suu-tap" },
    { label: "Set quà tặng xịt vải cao cấp", href: "/set-qua-tang" },
  ],
  policies: [
    { label: "Chính sách đổi trả trong 7 ngày", href: "/chinh-sach/doi-tra" },
    { label: "Chính sách vận chuyển & giao hàng", href: "/chinh-sach/van-chuyen" },
    { label: "Chính sách bảo mật thông tin", href: "/chinh-sach/bao-mat" },
    { label: "Điều khoản sử dụng dịch vụ", href: "/chinh-sach/dieu-khoan" },
    { label: "Câu hỏi thường gặp (FAQ)", href: "/faq" },
  ],
  account: [
    { label: "Thông tin cá nhân", href: "/tai-khoan" },
    { label: "Đơn hàng của tôi", href: "/tai-khoan/don-hang" },
    { label: "Danh sách yêu thích", href: "/tai-khoan/yeu-thich" },
    { label: "Giỏ hàng hiện tại", href: "/gio-hang" },
  ],
};
