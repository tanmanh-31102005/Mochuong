/**
 * CẤU HÌNH VÀ NỘI DUNG DÙNG CHUNG CHO SẢN PHẨM & DỊCH VỤ MỘC HƯƠNG
 * Lưu trữ tập trung theo yêu cầu của khách hàng, tránh lặp code trên 18 sản phẩm.
 */

export const PRODUCT_SHARED_CONFIG = {
  // Dung tích cố định của tất cả sản phẩm lẻ
  defaultCapacity: "30ml",

  // Thành phần chuẩn thiên nhiên dùng chung
  ingredients: {
    summary:
      "Nước cất tinh khiết, cồn thực phẩm lên men từ mía đường tự nhiên, tinh dầu thiên nhiên nguyên chất — không chất bảo quản, không hương liệu tổng hợp.",
    details: [
      "Nước cất tinh khiết (Aqua Destillata)",
      "Cồn thực phẩm lên men tự nhiên từ mía đường (Food-grade Cane Ethanol)",
      "100% Tinh dầu thảo mộc và hoa cỏ thiên nhiên nguyên chất",
      "Tuyệt đối KHÔNG chất bảo quản (Paraben-free)",
      "Tuyệt đối KHÔNG hương liệu tổng hợp độc hại (Phthalate-free)",
    ],
  },

  // 5 bước hướng dẫn sử dụng và bảo quản chuẩn
  usageInstructions: [
    "Lắc đều chai trước khi sử dụng để tinh dầu và cồn thực vật hòa quyện hoàn hảo.",
    "Xịt cách bề mặt vải hoặc không gian khoảng 20–30cm để hạt sương lan tỏa đều.",
    "Để khô tự nhiên trong 5–10 phút trước khi mặc hoặc cất vào tủ đồ.",
    "Không xịt trực tiếp lên vải lụa tơ tằm, da thuộc hoặc các chất liệu nhạy cảm dễ ố màu.",
    "Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp và nguồn nhiệt cao.",
  ],

  // 6 lý do vì sao chọn Mộc Hương (dùng cho icon-block trang chủ và chân trang)
  commitments: [
    {
      icon: "Leaf",
      title: "Khử mùi ẩm mốc tự nhiên",
      desc: "Phân giải mùi hôi tủ đồ, ẩm mốc mùa mưa một cách tự nhiên và an toàn.",
    },
    {
      icon: "Droplets",
      title: "An toàn cho da & vải",
      desc: "Lành tính với mọi loại sợi vải, an toàn cho cả gia đình và trẻ nhỏ.",
    },
    {
      icon: "Timer",
      title: "Làm mới trang phục tức thì",
      desc: "Ướp hương quần áo nhanh chóng chỉ sau 2-3 lần xịt, tiết kiệm công giặt ủi.",
    },
    {
      icon: "Sparkles",
      title: "Đa năng cho mọi không gian",
      desc: "Dùng linh hoạt cho quần áo, rèm cửa, ga gối, sofa và giày vải.",
    },
    {
      icon: "Smile",
      title: "Chăm sóc cảm xúc",
      desc: "Liệu pháp hương thơm tự nhiên giúp thư giãn tâm trí và xoa dịu áp lực.",
    },
    {
      icon: "ShieldBan",
      title: "Không hóa chất độc hại",
      desc: "Không chất bảo quản, không hương liệu tổng hợp, an toàn tuyệt đối.",
    },
  ],

  // Biểu phí dịch vụ Add-on thanh toán
  addons: {
    handwrittenCard: {
      title: "Dịch vụ viết thiệp tay theo yêu cầu",
      description:
        "Khách hàng nhập lời nhắn, Mộc Hương nắn nót viết tay lên thiệp chúc mộc mạc.",
      standardFee: 10000, // Phụ thu 10.000đ cho đơn lẻ/combo
      giftSetFee: 0, // Miễn phí khi mua kèm Set quà tặng
    },
    deliverySchedule: {
      title: "Dịch vụ giao hàng hẹn giờ",
      description: "Chọn ngày và khung giờ mong muốn để người nhận nhận đúng lúc.",
      fees: {
        standard: 0, // 08:00 - 12:00, 13:00 - 17:00 ngày thường: 0đ
        earlyMorning: 15000, // Trước 08:00: 15.000đ
        evening: 15000, // Sau 17:00: 15.000đ
        weekend: 20000, // Cuối tuần (Thứ 7, CN): 20.000đ
      },
      timeSlots: [
        {
          id: "slot-morning",
          label: "08:00 – 12:00 (Giờ hành chính sáng)",
          feeKey: "standard",
          fee: 0,
        },
        {
          id: "slot-afternoon",
          label: "13:00 – 17:00 (Giờ hành chính chiều)",
          feeKey: "standard",
          fee: 0,
        },
        {
          id: "slot-early",
          label: "Trước 08:00 (Sáng sớm — Phụ thu 15.000đ)",
          feeKey: "earlyMorning",
          fee: 15000,
        },
        {
          id: "slot-evening",
          label: "Sau 17:00 (Buổi tối — Phụ thu 15.000đ)",
          feeKey: "evening",
          fee: 15000,
        },
        {
          id: "slot-weekend",
          label: "Cuối tuần (Thứ Bảy / Chủ Nhật — Phụ thu 20.000đ)",
          feeKey: "weekend",
          fee: 20000,
        },
      ],
    },
  },
};
