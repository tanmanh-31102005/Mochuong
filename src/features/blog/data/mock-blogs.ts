import { BlogPost } from "../types";

export type { BlogPost };

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: "blog-draft-1",
    slug: "cach-su-dung-xit-thom-quan-ao",
    title: "Cách Sử Dụng Xịt Thơm Quần Áo Đúng Cách Để Lưu Hương Bền Lâu",
    excerpt:
      "Hướng dẫn chi tiết cách sử dụng xịt thơm quần áo đúng cách giúp khử sạch mùi ẩm mốc mùa mưa, lưu lại nốt hương thảo mộc tự nhiên thơm ngát và giữ nếp vải tinh tươm.",
    content: `Xịt thơm quần áo đang trở thành vật bất ly thân của những người yêu thích sự chỉn chu và phong cách sống tinh tế. Không chỉ giúp trang phục luôn ngát hương, xịt thơm gốc tinh dầu thiên nhiên Mộc Hương còn có khả năng kháng khuẩn, khử sạch mùi ẩm mốc sau khi giặt hoặc khi thời tiết nồm ẩm.

1. Vì sao nên dùng xịt thơm quần áo thay vì nước hoa thông thường?
Nước hoa truyền thống chứa cồn nồng độ cao và tinh dầu đậm đặc, khi xịt trực tiếp lên sợi vải sáng màu (như lụa, linen, cotton trắng) rất dễ gây ố vàng hoặc làm biến đổi chất vải. Ngược lại, xịt thơm quần áo Mộc Hương được chiết xuất từ hydrosol và tinh dầu tự nhiên, dịu nhẹ và an toàn tuyệt đối cho mọi chất liệu vải.

2. Quy trình 4 bước sử dụng xịt thơm quần áo chuẩn chuyên gia:
- Bước 1: Giữ khoảng cách xịt từ 15cm đến 20cm để hạt sương tỏa đều mịn màng, không làm ướt sũng một điểm.
- Bước 2: Tập trung xịt vào các vị trí lưu hương lý tưởng như cổ áo, vạt áo trong, gấu tay và lớp lót áo khoác.
- Bước 3: Thời điểm vàng để xịt là ngay sau khi ủi đồ hoặc 10 phút trước khi bước ra ngoài.
- Bước 4: Để quần áo khô tự nhiên trong không khí thoáng mát trước khi mặc hoặc cất vào tủ đồ.`,
    category: "Mẹo hay cuộc sống",
    publishedAt: "02/10/2026",
    readTime: "4 phút đọc",
    coverImage: "/images/banner/banner-2.jpg",
    author: "Mộc Hương Team",
    status: "draft",
    seo: {
      slug: "cach-su-dung-xit-thom-quan-ao",
      seoTitle: "Cách sử dụng xịt thơm quần áo đúng cách",
      seoDescription:
        "Khám phá cách sử dụng xịt thơm quần áo đúng cách từ Mộc Hương giúp lưu hương thơm ngát tự nhiên, khử mùi ẩm mốc và bảo vệ sợi vải suốt cả ngày dài.",
      focusKeyword: "cách sử dụng xịt thơm quần áo",
      canonicalUrl: "https://mochuong.vn/blog/cach-su-dung-xit-thom-quan-ao",
      noIndex: false,
    },
  },
  {
    id: "blog-1",
    slug: "cach-chon-mui-huong-theo-tung-khong-gian-song",
    title: "Nghệ thuật chọn mùi hương theo từng không gian sống: Từ phòng ngủ đến góc làm việc",
    excerpt:
      "Mỗi gian phòng mang một nguồn năng lượng riêng. Khám phá bí quyết phối hợp nốt hương thảo mộc, hoa hay gỗ để tối ưu cảm xúc và nâng niu từng giác quan.",
    content: `Mỗi gian phòng mang một nguồn năng lượng riêng. Khám phá bí quyết phối hợp nốt hương thảo mộc, hoa hay gỗ để tối ưu cảm xúc và nâng niu từng giác quan. Mùi hương tác động trực tiếp vào hệ viền của não bộ giúp giảm căng thẳng và hồi phục tinh thần nhanh chóng.`,
    category: "Kiến thức mùi hương",
    publishedAt: "15/02/2026",
    readTime: "4 phút đọc",
    coverImage: "/images/banner/banner.jpg",
    author: "Mộc Hương Team",
    status: "published",
    seo: {
      slug: "cach-chon-mui-huong-theo-tung-khong-gian-song",
      seoTitle: "Nghệ Thuật Chọn Mùi Hương Theo Từng Không Gian Sống | Mộc Hương",
      seoDescription:
        "Hướng dẫn chọn mùi hương xịt thơm phòng theo từng không gian sống như phòng ngủ, phòng khách và góc làm việc giúp cân bằng cảm xúc và năng lượng.",
      focusKeyword: "chọn mùi hương không gian sống",
      canonicalUrl: "https://mochuong.vn/blog/cach-chon-mui-huong-theo-tung-khong-gian-song",
      noIndex: false,
    },
  },
  {
    id: "blog-2",
    slug: "5-meo-dung-xit-thom-quan-ao-luu-huong-ca-ngay",
    title: "5 mẹo sử dụng xịt thơm quần áo tự nhiên giúp lưu hương tinh tế suốt cả ngày dài",
    excerpt:
      "Không đơn thuần là xịt lên áo, các vị trí như cổ áo, gấu tay, lớp lót trong hay thời điểm xịt sau khi ủi đồ sẽ quyết định độ bám tỏa thơm ngát.",
    content: `Không đơn thuần là xịt lên áo, các vị trí như cổ áo, gấu tay, lớp lót trong hay thời điểm xịt sau khi ủi đồ sẽ quyết định độ bám tỏa thơm ngát suốt 24 giờ.`,
    category: "Mẹo hay cuộc sống",
    publishedAt: "10/02/2026",
    readTime: "3 phút đọc",
    coverImage: "/images/collections/bo-suu-tap-thao-moc.jpg",
    author: "Chuyên gia Mộc Hương",
    status: "published",
    seo: {
      slug: "5-meo-dung-xit-thom-quan-ao-luu-huong-ca-ngay",
      seoTitle: "5 Mẹo Dùng Xịt Thơm Quần Áo Tự Nhiên Lưu Hương Cả Ngày | Mộc Hương",
      seoDescription:
        "Mách bạn 5 mẹo dùng xịt thơm quần áo tự nhiên lưu hương tinh tế suốt ngày dài, an toàn cho sợi vải và làn da nhạy cảm.",
      focusKeyword: "mẹo dùng xịt thơm quần áo",
      canonicalUrl: "https://mochuong.vn/blog/5-meo-dung-xit-thom-quan-ao-luu-huong-ca-ngay",
      noIndex: false,
    },
  },
  {
    id: "blog-3",
    slug: "tinh-dau-thien-nhien-va-suc-khoe-giac-ngu",
    title: "Vì sao tinh dầu Oải Hương và Cúc La Mã có thể giúp bạn chữa lành chứng mất ngủ?",
    excerpt:
      "Khoa học đằng sau cơ chế của phân tử Linalool tác động lên hệ thần kinh phó giao cảm, giải thích vì sao hương thơm tự nhiên là liệu pháp ru ngủ an lành nhất.",
    content: `Khoa học đằng sau cơ chế của phân tử Linalool tác động lên hệ thần kinh phó giao cảm, giải thích vì sao hương thơm tự nhiên là liệu pháp ru ngủ an lành nhất.`,
    category: "Liệu pháp hương thơm",
    publishedAt: "02/02/2026",
    readTime: "5 phút đọc",
    coverImage: "/images/collections/bo-suu-tap-hoa.jpg",
    author: "Mộc Hương R&D",
    status: "published",
    seo: {
      slug: "tinh-dau-thien-nhien-va-suc-khoe-giac-ngu",
      seoTitle: "Tinh Dầu Oải Hương Giúp Ngủ Ngon & Sâu Giấc Tự Nhiên | Mộc Hương",
      seoDescription:
        "Tìm hiểu cơ chế khoa học của tinh dầu Oải Hương và Cúc La Mã giúp xua tan âu lo, giảm căng thẳng thần kinh và đem lại giấc ngủ an lành trọn vẹn.",
      focusKeyword: "tinh dầu oải hương ngủ ngon",
      canonicalUrl: "https://mochuong.vn/blog/tinh-dau-thien-nhien-va-suc-khoe-giac-ngu",
      noIndex: false,
    },
  },
];
