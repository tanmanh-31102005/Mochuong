export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: { label: string; href: string; desc?: string }[];
}

export const MAIN_NAVIGATION: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Sản phẩm",
    href: "/san-pham",
    children: [
      {
        label: "Thảo mộc – Thanh lọc",
        href: "/dong-huong/thao-moc-thanh-loc",
        desc: "Sả Chanh, Tràm gió, Tràm trắng, Hương thảo",
      },
      {
        label: "Hoa – Dịu nhẹ",
        href: "/dong-huong/hoa-diu-nhe",
        desc: "Hoa sen, Hoa nhài, Ngọc lan tây, Hoa ly, Hoa violet, Hoa anh đào",
      },
      {
        label: "Trái cây – Tươi mát",
        href: "/dong-huong/trai-cay-tuoi-mat",
        desc: "Bưởi, Quýt, Cam, Chanh, Dứa, Bạc Hà",
      },
      {
        label: "Ấm nồng – Cá tính",
        href: "/dong-huong/am-nong-ca-tinh",
        desc: "Quế, Cà phê",
      },
      {
        label: "Tất cả sản phẩm",
        href: "/san-pham",
        desc: "Xem trọn bộ 18 nốt hương xịt thơm 30ml",
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
  { label: "Kiến thức mùi hương", href: "/blog" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const FOOTER_LINKS = {
  fragranceLines: [
    { label: "Dòng Thảo mộc – Thanh lọc", href: "/dong-huong/thao-moc-thanh-loc" },
    { label: "Dòng Hoa – Dịu nhẹ", href: "/dong-huong/hoa-diu-nhe" },
    { label: "Dòng Trái cây – Tươi mát", href: "/dong-huong/trai-cay-tuoi-mat" },
    { label: "Dòng Ấm nồng – Cá tính", href: "/dong-huong/am-nong-ca-tinh" },
    { label: "Bộ sưu tập trọn bộ", href: "/bo-suu-tap" },
    { label: "Set quà tặng cao cấp", href: "/set-qua-tang" },
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
