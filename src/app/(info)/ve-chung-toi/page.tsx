import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ShieldCheck, Heart, Leaf, ArrowRight, Droplets, Smile, Timer } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { PRODUCT_SHARED_CONFIG } from "@/core/config/product-shared.config";
import { siteConfig } from "@/core/config/site.config";

export default function AboutPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner tiêu đề */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-moss uppercase tracking-widest block">
            Câu Chuyện Thương Hiệu
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-moss-dark">
            Về Mộc Hương — Hương Thơm Từ Thiên Nhiên
          </h1>
          <p className="font-serif italic text-terracotta text-base sm:text-lg">
            &ldquo;Thơm mát từng khoảnh khắc&rdquo;
          </p>
        </div>

        <div className="relative aspect-[2/1] rounded-2xl overflow-hidden border border-[#E3DACB] shadow-[0_10px_30px_rgba(74,74,74,0.06)]">
          <Image
            src="/images/banner/banner.jpg"
            alt="Bộ sản phẩm tinh dầu xịt thơm Mộc Hương"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>

        {/* Nội dung chính thức từ Mộc Hương */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E3DACB] shadow-[0_10px_30px_rgba(74,74,74,0.05)] space-y-6 text-xs sm:text-sm text-ink/80 leading-relaxed">
          <p className="text-base sm:text-lg font-serif italic text-moss-dark leading-relaxed border-l-4 border-moss pl-4 py-1">
            &ldquo;Mộc Hương ra đời từ mong muốn mang đến những khoảnh khắc thư giãn giản đơn trong cuộc sống bận rộn hằng ngày...&rdquo;
          </p>

          <p>
            Chúng tôi tin rằng, sau những giờ làm việc căng thẳng và hối hả, mỗi người đều xứng đáng được đắm mình trong một không gian an yên, nơi khứu giác được xoa dịu bởi những làn sương thảo mộc thuần khiết. Các sản phẩm xịt thơm phòng và thơm vải của Mộc Hương được tạo nên để mang lại cảm giác tươi mới tức thì, giải tỏa áp lực và chăm sóc cảm xúc cho bạn cùng gia đình.
          </p>

          {/* 4 Dòng hương chủ đạo */}
          <div className="my-8 pt-6 border-t border-beige space-y-4">
            <h3 className="font-serif font-bold text-lg text-moss-dark">
              Hệ Thống 4 Dòng Hương Thiên Nhiên (18 Mùi Hương Nguyên Chất — 30ml)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-cream border border-beige space-y-1.5">
                <span className="text-xs font-bold text-moss uppercase">1. Dòng Thảo Mộc – Thanh Lọc (45.000đ/chai)</span>
                <p className="text-xs text-ink/70">
                  Sả Chanh, Tràm gió, Tràm trắng, Hương thảo — Giúp thanh lọc không khí, kháng khuẩn nhẹ, xua muỗi và mang lại tinh thần tỉnh táo minh mẫn.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cream border border-beige space-y-1.5">
                <span className="text-xs font-bold text-terracotta uppercase">2. Dòng Hoa – Dịu Nhẹ (55.000đ/chai)</span>
                <p className="text-xs text-ink/70">
                  Hoa sen, Hoa nhài, Ngọc lan tây, Hoa ly, Hoa violet, Hoa anh đào — Dịu dàng, thư thái, cân bằng cảm xúc và hỗ trợ giấc ngủ an lành.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cream border border-beige space-y-1.5">
                <span className="text-xs font-bold text-amber-700 uppercase">3. Dòng Trái Cây – Tươi Mát (45.000đ/chai)</span>
                <p className="text-xs text-ink/70">
                  Bưởi, Quýt, Cam, Chanh, Dứa, Bạc Hà — Tươi mát, sảng khoái tức thì, tràn đầy năng lượng và khử mùi ẩm mốc hiệu quả.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cream border border-beige space-y-1.5">
                <span className="text-xs font-bold text-[#8A5A36] uppercase">4. Dòng Ấm Nồng – Cá Tính (50.000đ/chai)</span>
                <p className="text-xs text-ink/70">
                  Quế, Cà phê — Ấm áp, quyến rũ, khử mùi mạnh mẽ và tạo phong cách riêng biệt cho không gian sống mùa lạnh.
                </p>
              </div>
            </div>
          </div>

          {/* Thành phần chuẩn dùng chung */}
          <div className="my-8 pt-6 border-t border-beige space-y-3">
            <h3 className="font-serif font-bold text-lg text-moss-dark flex items-center gap-2">
              <Leaf className="w-5 h-5 text-moss" />
              <span>Tiêu Chuẩn Thành Phần &amp; An Toàn Tuyệt Đối</span>
            </h3>
            <p className="text-ink/80 font-medium">
              {PRODUCT_SHARED_CONFIG.ingredients.summary}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-ink/70">
              {PRODUCT_SHARED_CONFIG.ingredients.details.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 6 Cam kết chính thức */}
          <div className="my-8 pt-6 border-t border-beige space-y-4">
            <h3 className="font-serif font-bold text-lg text-moss-dark">
              6 Giá Trị Cam Kết Của Mộc Hương
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {PRODUCT_SHARED_CONFIG.commitments.map((c, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#FAF7F2] border border-beige space-y-1.5">
                  <h4 className="font-bold text-xs text-moss-dark">{c.title}</h4>
                  <p className="text-[11px] text-ink/70 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-beige flex justify-center">
            <Link href="/san-pham">
              <Button variant="primary" size="lg">
                <span>Khám phá 18 mùi hương Mộc Hương</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
