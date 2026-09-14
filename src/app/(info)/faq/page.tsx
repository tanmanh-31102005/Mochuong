import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export default function FAQPage() {
  const faqs = [
    {
      q: "Xịt thơm Mộc Hương có làm ố vàng quần áo trắng không?",
      a: "Hoàn toàn không. Tinh dầu Mộc Hương đã qua quy trình lọc tinh khiết và sử dụng dung môi cồn mật mía tự nhiên bay hơi nhanh, không để lại vết ố hay bám cặn màu trên mọi chất liệu vải như lụa, linen, cotton trắng.",
    },
    {
      q: "Hương thơm tự nhiên lưu được bao lâu?",
      a: "Tùy thuộc vào chất liệu bề mặt và không gian. Trên quần áo bằng sợi tự nhiên (len, nỉ, cotton, rèm cửa), hương thơm lưu thoang thoảng từ 6–12 tiếng. Trong không khí phòng kín, hương thơm duy trì độ tươi mát trong khoảng 3–5 tiếng.",
    },
    {
      q: "Sản phẩm có an toàn cho phụ nữ mang thai và trẻ sơ sinh không?",
      a: "Mộc Hương sử dụng 100% tinh dầu thực vật hữu cơ nguyên chất, không chứa phthalate hay hương liệu tổng hợp. Đối với trẻ sơ sinh và mẹ bầu, bạn có thể hoàn toàn yên tâm khi xịt vào rèm cửa, góc phòng hoặc nệm cách thời điểm bé vào phòng 15 phút.",
    },
    {
      q: "Dung tích 30ml xịt được bao nhiêu lần?",
      a: "Một chai 30ml trang bị vòi xịt phun sương siêu mịn nano, trung bình xịt được từ 350 – 400 lần nhấn. Nếu sử dụng hàng ngày 5–6 lần xịt, một chai có thể dùng đều đặn trong 2 tháng.",
    },
    {
      q: "Tôi có thể mua quà tặng kèm thiệp viết tay được không?",
      a: "Có! Tất cả các Set quà tặng của Mộc Hương đều được tặng kèm thiệp chúc viết tay và hoa thơm ép cánh. Khi đặt hàng, bạn chỉ cần ghi nội dung lời chúc vào ô 'Ghi chú đơn hàng'.",
    },
  ];

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-moss uppercase tracking-widest block">
            Hỗ Trợ Khách Hàng
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-moss-dark">
            Câu Hỏi Thường Gặp (FAQ)
          </h1>
          <p className="text-xs sm:text-sm text-ink/70">
            Giải đáp mọi thắc mắc về cách sử dụng, thành phần và bảo quản xịt thơm Mộc Hương.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-beige shadow-soft divide-y divide-beige space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="pt-6 first:pt-0 space-y-2">
              <h3 className="font-serif font-bold text-base text-moss-dark flex items-start gap-2">
                <span className="text-terracotta font-sans text-sm font-extrabold">Q:</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-ink/80 pl-5 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-cream p-8 rounded-3xl border border-beige text-center space-y-3">
          <h3 className="font-serif font-bold text-lg text-moss-dark">
            Bạn vẫn còn câu hỏi chưa được giải đáp?
          </h3>
          <p className="text-xs text-ink/70">
            Đội ngũ tư vấn viên Mộc Hương luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7.
          </p>
          <div className="pt-2">
            <Link href="/lien-he">
              <Button variant="primary" size="md">
                <span>Liên hệ tư vấn trực tiếp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
