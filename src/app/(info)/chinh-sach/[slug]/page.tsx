import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/core/config/site.config";

interface PolicyContent {
  title: string;
  subtitle: string;
  updatedAt: string;
  sections: { heading: string; content: string }[];
}

const POLICIES: Record<string, PolicyContent> = {
  "doi-tra": {
    title: "Chính Sách Đổi Trả Sản Phẩm",
    subtitle: "Cam kết bảo vệ quyền lợi tối đa cho người tiêu dùng",
    updatedAt: "01/01/2026",
    sections: [
      {
        heading: "1. Điều kiện áp dụng đổi trả",
        content:
          "Mộc Hương hỗ trợ đổi mới 100% miễn phí trong vòng 7 ngày kể từ ngày nhận hàng nếu: Sản phẩm bị lỗi kỹ thuật vòi xịt, nứt vỡ trong quá trình vận chuyển, hoặc khách hàng có dấu hiệu kích ứng dị ứng với tinh dầu tự nhiên.",
      },
      {
        heading: "2. Quy trình đổi trả nhanh chóng",
        content: `Quý khách chỉ cần chụp ảnh sản phẩm kèm video khui hộp gửi về Hotline/Zalo CSKH: ${siteConfig.hotline}. Đội ngũ Mộc Hương sẽ gửi đơn hàng mới tới tận nhà bạn và thu hồi sản phẩm lỗi hoàn toàn miễn cước phí.`,
      },
      {
        heading: "3. Hoàn tiền",
        content:
          "Trong trường hợp sản phẩm hết hàng để đổi mới, Mộc Hương cam kết hoàn 100% số tiền qua tài khoản ngân hàng trong vòng 24 giờ làm việc.",
      },
    ],
  },
  "van-chuyen": {
    title: "Chính Sách Vận Chuyển & Giao Nhận",
    subtitle: "Giao hàng an toàn, đóng gói chống sốc chuyên dụng",
    updatedAt: "01/01/2026",
    sections: [
      {
        heading: "1. Biểu phí giao hàng",
        content:
          "Miễn phí vận chuyển toàn quốc cho tất cả các đơn hàng có giá trị từ 300.000đ trở lên. Với đơn hàng dưới 300.000đ, phí vận chuyển tiêu chuẩn đồng giá 30.000đ toàn quốc.",
      },
      {
        heading: "2. Thời gian giao hàng",
        content:
          "Nội thành TP.HCM và Hà Nội: 1–2 ngày làm việc (có dịch vụ hỏa tốc 24h). Các tỉnh thành khác: 2–4 ngày làm việc tuỳ khu vực.",
      },
      {
        heading: "3. Kiểm tra hàng trước khi thanh toán",
        content:
          "Mộc Hương luôn khuyến khích quý khách đồng kiểm cùng nhân viên giao hàng để đảm bảo nguyên vẹn bao bì và số lượng chai xịt thơm.",
      },
    ],
  },
  "bao-mat": {
    title: "Chính Sách Bảo Mật Thông Tin",
    subtitle: "Bảo mật tuyệt đối thông tin cá nhân khách hàng",
    updatedAt: "01/01/2026",
    sections: [
      {
        heading: "1. Mục đích thu thập thông tin",
        content:
          "Mộc Hương chỉ thu thập tên, số điện thoại, địa chỉ và email nhằm mục đích duy nhất là xử lý đơn hàng, gửi mã giảm giá tri ân và hỗ trợ hậu mãi.",
      },
      {
        heading: "2. Cam kết không chia sẻ bên thứ ba",
        content:
          "Chúng tôi tuyệt đối không bán, cho thuê hay chia sẻ dữ liệu cá nhân của quý khách cho bất kỳ bên thứ ba nào vì mục đích thương mại.",
      },
    ],
  },
  "dieu-khoan": {
    title: "Điều Khoản Sử Dụng Dịch Vụ",
    subtitle: "Quy định chung khi mua sắm tại Mộc Hương",
    updatedAt: "01/01/2026",
    sections: [
      {
        heading: "1. Trách nhiệm người dùng",
        content:
          "Khi đặt hàng trên website mochuong.vn, quý khách vui lòng cung cấp thông tin liên hệ chính xác để thuận tiện cho việc vận chuyển và xác nhận đơn hàng.",
      },
      {
        heading: "2. Quyền sở hữu trí tuệ",
        content:
          "Toàn bộ hình ảnh, nội dung mô tả sản phẩm và thương hiệu Mộc Hương đều thuộc quyền sở hữu của Mộc Hương Nature. Mọi hành vi sao chép thương mại phải có sự đồng ý bằng văn bản.",
      },
    ],
  },
};

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = POLICIES[slug];

  if (!policy) {
    notFound();
  }

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-moss hover:text-moss-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-moss-dark">
            {policy.title}
          </h1>
          <p className="text-xs sm:text-sm text-ink/60 italic">
            {policy.subtitle} · Cập nhật ngày {policy.updatedAt}
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-beige shadow-soft space-y-8 text-xs sm:text-sm text-ink/80 leading-relaxed">
          {policy.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-serif font-bold text-base text-moss-dark">
                {sec.heading}
              </h3>
              <p>{sec.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
