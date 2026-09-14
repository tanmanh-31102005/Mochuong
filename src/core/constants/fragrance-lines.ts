export interface FragranceLineInfo {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  description: string;
  mood: string;
  colorTone: string;
  bgGradient: string;
  badge: string;
  heroImage: string;
}

export const FRAGRANCE_LINES: Record<string, FragranceLineInfo> = {
  "thao-moc-thanh-loc": {
    id: "thao-moc",
    slug: "thao-moc-thanh-loc",
    title: "Thảo mộc – Thanh lọc",
    subtitle: "Thanh lọc không gian, xua tan mệt mỏi",
    shortDesc: "Tinh túy từ Sả Chanh, Tràm gió, Tràm trắng và Hương thảo giúp kháng khuẩn, thông thoáng đường thở và tỉnh táo.",
    description: "Dòng hương Thảo mộc mang hơi thở tinh khiết của thảo dược bản địa chưng cất tự nhiên. Khử mùi ẩm mốc, làm sạch không khí, mang lại cảm giác nhẹ bẫng và sảng khoái sau ngày dài.",
    mood: "Thanh lọc, kháng khuẩn, tỉnh táo",
    colorTone: "bg-[#EBF2E5] text-[#4E6235]",
    bgGradient: "from-[#F3F7EE] to-[#E5EDE0]",
    badge: "Thanh lọc tự nhiên",
    heroImage: "/images/banner/thao-moc.jpg",
  },
  "hoa-diu-nhe": {
    id: "hoa",
    slug: "hoa-diu-nhe",
    title: "Hoa – Dịu nhẹ",
    subtitle: "Dịu dàng vỗ về, ru giấc ngủ sâu",
    shortDesc: "Những cánh Hoa sen, Hoa nhài, Ngọc lan tây, Hoa ly, Hoa violet và Anh đào vỗ về cảm xúc, cân bằng tâm trí.",
    description: "Được chưng cất từ những nốt hương hoa thanh tao, dòng hương Hoa mang nét ngọt ngào, trang nhã. Thích hợp cho phòng ngủ, góc thư giãn đọc sách và ru êm giấc ngủ tự nhiên.",
    mood: "Dịu dàng, thư thái, cân bằng",
    colorTone: "bg-[#F7EFEF] text-[#7A4B56]",
    bgGradient: "from-[#FAF3F3] to-[#F2E5E7]",
    badge: "Dịu êm thư giãn",
    heroImage: "/images/banner/hoa.jpg",
  },
  "trai-cay-tuoi-mat": {
    id: "trai-cay",
    slug: "trai-cay-tuoi-mat",
    title: "Trái cây – Tươi mát",
    subtitle: "Bừng tỉnh năng lượng, khởi tạo hứng khởi",
    shortDesc: "Nốt hương Bưởi, Quýt, Cam, Chanh, Dứa và Bạc Hà kích hoạt năng lượng tích cực cho ngày mới tràn đầy nhiệt huyết.",
    description: "Dòng hương Trái cây căng mọng đánh thức mọi giác quan, khử mùi nhanh chóng và làm bừng sáng góc làm việc và gian phòng khách. Giúp bạn tập trung tốt hơn, xua đi uể oải.",
    mood: "Tươi mát, sảng khoái, tràn đầy năng lượng",
    colorTone: "bg-[#FDF3E5] text-[#8C5821]",
    bgGradient: "from-[#FFF7ED] to-[#FAEBCE]",
    badge: "Bừng tỉnh năng lượng",
    heroImage: "/images/banner/trai-cay.jpg",
  },
  "am-nong-ca-tinh": {
    id: "am-nong",
    slug: "am-nong-ca-tinh",
    title: "Ấm nồng – Cá tính",
    subtitle: "Sâu lắng, ấm áp và vương vấn dài lâu",
    shortDesc: "Quế ấm áp quyến rũ và Cà phê tỉnh táo cá tính tạo nên chiều sâu cuốn hút, khử mùi mạnh mẽ và phong cách riêng.",
    description: "Sự hòa quyện giữa vỏ quế nồng ấm và hạt cà phê rang mộc mang đến không gian ấm cúng, sang trọng. Thích hợp cho những buổi tối se lạnh, phòng làm việc chuyên nghiệp hoặc mùa đông.",
    mood: "Ấm áp, quyến rũ, cá tính",
    colorTone: "bg-[#F4ECE3] text-[#6B4B32]",
    bgGradient: "from-[#FBF6EE] to-[#EFE2D2]",
    badge: "Sang trọng ấm áp",
    heroImage: "/images/banner/am-nong.jpg",
  },
  "bo-suu-tap": {
    id: "bo-suu-tap",
    slug: "bo-suu-tap",
    title: "Bộ Sưu Tập Theo Dòng Hương",
    subtitle: "Trọn vẹn trải nghiệm mùi hương đa tầng",
    shortDesc: "Combo trọn bộ các dòng hương được phối sẵn theo từng cung bậc cảm xúc, tiết kiệm hơn 20%.",
    description: "Bộ sưu tập trọn bộ tuyển chọn từ Mộc Hương giúp bạn sở hữu trọn vẹn cả chuỗi trải nghiệm mùi hương từ buổi sáng tràn năng lượng đến giấc ngủ tối êm đềm.",
    mood: "Đa dạng, tiết kiệm, trải nghiệm đỉnh cao",
    colorTone: "bg-[#EFEAE2] text-[#4A4A4A]",
    bgGradient: "from-[#F7F4EE] to-[#EAE3D6]",
    badge: "COMBO TIẾT KIỆM",
    heroImage: "/images/banner/bo-suu-tap.jpg",
  },
  "set-qua-tang": {
    id: "set-qua-tang",
    slug: "set-qua-tang",
    title: "Set Quà Tặng Mộc Hương",
    subtitle: "Món quà hương thơm gói trọn ân tình",
    shortDesc: "Hộp quà thủ công tinh tế với 3–5 chai xịt thơm tuyển chọn, thiệp chúc và hoa thơm ép cánh.",
    description: "Từng hộp quà được đóng gói chỉn chu, thắt nơ ruy băng kèm thiệp viết tay mộc mạc. Món quà hoàn hảo để dành tặng người thân, bạn bè hoặc đối tác trong các dịp đặc biệt.",
    mood: "Tinh tế, ý nghĩa, trang trọng",
    colorTone: "bg-[#F2ECE6] text-[#63493A]",
    bgGradient: "from-[#FAF6F2] to-[#ECE1D7]",
    badge: "Quà tặng ý nghĩa",
    heroImage: "/images/banner/set-qua-tang.jpg",
  },
};

export const FRAGRANCE_LINE_TABS = [
  { id: "thao-moc", name: "Thảo mộc – Thanh lọc" },
  { id: "hoa", name: "Hoa – Dịu nhẹ" },
  { id: "trai-cay", name: "Trái cây – Tươi mát" },
  { id: "am-nong", name: "Ấm nồng – Cá tính" },
];

export const FRAGRANCE_LINE_LIST: FragranceLineInfo[] = [
  FRAGRANCE_LINES["thao-moc-thanh-loc"],
  FRAGRANCE_LINES["hoa-diu-nhe"],
  FRAGRANCE_LINES["trai-cay-tuoi-mat"],
  FRAGRANCE_LINES["am-nong-ca-tinh"],
];

