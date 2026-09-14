export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  content?: string;
  author: string;
}

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "cach-chon-mui-huong-theo-tung-khong-gian-song",
    title: "Nghệ thuật chọn mùi hương theo từng không gian sống: Từ phòng ngủ đến góc làm việc",
    excerpt:
      "Mỗi gian phòng mang một nguồn năng lượng riêng. Khám phá bí quyết phối hợp nốt hương thảo mộc, hoa hay gỗ để tối ưu cảm xúc và nâng niu từng giác quan.",
    category: "Kiến thức mùi hương",
    publishedAt: "15/02/2026",
    readTime: "4 phút đọc",
    coverImage: "/images/banner/blog-1.jpg",
    author: "Mộc Hương Team",
  },
  {
    id: "blog-2",
    slug: "5-meo-dung-xit-thom-quan-ao-luu-huong-ca-ngay",
    title: "5 mẹo sử dụng xịt thơm quần áo tự nhiên giúp lưu hương tinh tế suốt cả ngày dài",
    excerpt:
      "Không đơn thuần là xịt lên áo, các vị trí như cổ áo, gấu tay, lớp lót trong hay thời điểm xịt sau khi ủi đồ sẽ quyết định độ bám tỏa thơm ngát.",
    category: "Mẹo hay cuộc sống",
    publishedAt: "10/02/2026",
    readTime: "3 phút đọc",
    coverImage: "/images/banner/blog-2.jpg",
    author: "Chuyên gia Mộc Hương",
  },
  {
    id: "blog-3",
    slug: "tinh-dau-thien-nhien-va-suc-khoe-giac-ngu",
    title: "Vì sao tinh dầu Oải Hương và Cúc La Mã có thể giúp bạn chữa lành chứng mất ngủ?",
    excerpt:
      "Khoa học đằng sau cơ chế của phân tử Linalool tác động lên hệ thần kinh phó giao cảm, giải thích vì sao hương thơm tự nhiên là liệu pháp ru ngủ an lành nhất.",
    category: "Liệu pháp hương thơm",
    publishedAt: "02/02/2026",
    readTime: "5 phút đọc",
    coverImage: "/images/banner/blog-3.jpg",
    author: "Mộc Hương R&D",
  },
];
