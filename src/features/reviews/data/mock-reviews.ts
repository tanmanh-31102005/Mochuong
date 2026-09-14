export interface Review {
  id: string;
  authorName: string;
  avatar?: string;
  rating: number;
  productName: string;
  productSlug: string;
  content: string;
  date: string;
  verifiedPurchase: boolean;
  userRole?: string;
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    authorName: "Chị Thảo My",
    userRole: "Nhân viên văn phòng, Q.3, TP.HCM",
    rating: 5,
    productName: "Oải Hương Vỗ Về 30ml",
    productSlug: "oai-huong-thu-thai-30ml",
    content:
      "Mình bị chứng khó ngủ suốt mấy tháng nay. Từ hôm dùng xịt gối Oải Hương của Mộc Hương, phòng thơm dịu nhẹ thoang thoảng như spa tự nhiên, không bị hắc hóa chất. Giờ tối nào cũng phải xịt 2 nhát lên gối mới ngủ ngon được!",
    date: "12/02/2026",
    verifiedPurchase: true,
  },
  {
    id: "rev-2",
    authorName: "Anh Hoàng Nam",
    userRole: "Kiến trúc sư, Ba Đình, Hà Nội",
    rating: 5,
    productName: "Gỗ Đàn Hương Trầm Ấm 30ml",
    productSlug: "go-dan-huong-tram-am-30ml",
    content:
      "Mùi Đàn Hương rất đĩnh đạc, sang trọng, mang phong vị thiền định. Mình hay xịt lên áo blazer trước khi gặp đối tác khách hàng, ai cũng khen mùi tinh tế độc đáo. Chai 30ml nhỏ gọn vừa túi xách mang theo rất tiện.",
    date: "28/01/2026",
    verifiedPurchase: true,
  },
  {
    id: "rev-3",
    authorName: "Chị Mai Phương",
    userRole: "Nội trợ & Mẹ bỉm, Đà Nẵng",
    rating: 5,
    productName: "Sả Chanh Thảo Mộc 30ml",
    productSlug: "sa-chanh-thao-moc-30ml",
    content:
      "Mùa mưa nồm ẩm nhà mình hay bị mùi ẩm mốc khó chịu và muỗi. Chai Sả Chanh này cứu cánh thực sự! Xịt một lúc là phòng khách thơm nức sảng khoái, muỗi bay đi hết. Quan trọng là tinh dầu hữu cơ nên mình rất yên tâm khi nhà có bé nhỏ.",
    date: "05/02/2026",
    verifiedPurchase: true,
  },
  {
    id: "rev-4",
    authorName: "Bạn Lê Tuấn",
    userRole: "Content Creator, Cầu Giấy, Hà Nội",
    rating: 5,
    productName: "Set Quà Tặng Bình Yên (3 chai 30ml)",
    productSlug: "set-qua-tang-binh-yen-3-chai",
    content:
      "Mình đặt set quà tặng gửi cho mẹ sinh nhật. Đóng hộp cực kỳ chỉn chu, thắt nơ mộc mạc và có thiệp viết tay rất trân trọng. Mẹ mình thích lắm, khen mùi Cam Ngọt và Oải Hương dễ chịu vô cùng.",
    date: "18/02/2026",
    verifiedPurchase: true,
  },
];
