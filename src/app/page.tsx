import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flower2,
  Wind,
  Flame,
  CheckCircle2,
  ChevronRight,
  Quote,
  Clock,
} from "lucide-react";
import { MOCK_PRODUCTS } from "@/features/products/data/mock-products";
import { MOCK_REVIEWS } from "@/features/reviews/data/mock-reviews";
import { MOCK_BLOGS } from "@/features/blog/data/mock-blogs";
import { ProductCard } from "@/features/products/components/ProductCard";
import { HeroBannerSlider } from "@/features/home/components/HeroBannerSlider";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { RatingStars } from "@/shared/components/ui/RatingStars";
import { ScrollReveal } from "@/shared/components/ui/ScrollReveal";

export default function HomePage() {
  // Lọc sản phẩm theo từng dòng
  const thaoMocProducts = MOCK_PRODUCTS.filter((p) =>
    p.dongHuong.includes("thao-moc") && !p.laSetQuaTang
  ).slice(0, 4);

  const hoaProducts = MOCK_PRODUCTS.filter((p) =>
    p.dongHuong.includes("hoa") && !p.laSetQuaTang
  ).slice(0, 4);

  const traiCayProducts = MOCK_PRODUCTS.filter((p) =>
    p.dongHuong.includes("trai-cay") && !p.laSetQuaTang
  ).slice(0, 4);

  const amNongProducts = MOCK_PRODUCTS.filter((p) =>
    p.dongHuong.includes("am-nong") && !p.laSetQuaTang
  ).slice(0, 4);

  const giftSetProducts = MOCK_PRODUCTS.filter((p) => p.laSetQuaTang).slice(0, 3);

  return (
    <div>
      {/* ========================================================================= */}
      {/* KHỐI 2: BANNER HERO (Split Hero 2 cột, 5 chai sản phẩm thật, Trust Bar)   */}
      {/* ========================================================================= */}
      <HeroBannerSlider />

      {/* Các section nội dung tiếp theo */}
      <div className="space-y-12 sm:space-y-20">
        
        {/* ========================================================================= */}
        {/* KHỐI 3: 3 CAM KẾT THƯƠNG HIỆU (Icon tròn viền moss, stagger delay 80-100ms) */}
        {/* ========================================================================= */}
        <section className="bg-beige/70 py-12 sm:py-16 border-y border-beige">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold text-moss uppercase tracking-widest block mb-2">
                    Triết Lý Thương Hiệu
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-dark">
                    Cam Kết Từ Tâm Của Mộc Hương
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-ink-muted max-w-md leading-relaxed">
                  Mỗi giọt hương gửi trao là sự kết tinh từ thảo mộc bản địa, được chưng cất tỉ mỉ vì sức khỏe và sự an yên của gia đình bạn.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cam kết 1 */}
              <ScrollReveal delay={0} className="h-full">
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-beige/80 hover:border-moss/40 hover:shadow-xs transition-all duration-300 flex flex-col items-start h-full">
                  <div className="w-12 h-12 rounded-xl bg-moss/10 border border-moss/20 flex items-center justify-center text-moss mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ink-dark mb-2">
                    Tinh Dầu Thiên Nhiên 100%
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Chiết xuất từ hoa lá hữu cơ nguyên chất kết hợp cồn lên men từ mía đường. Tuyệt đối không hương liệu tổng hợp độc hại, an toàn cho trẻ nhỏ và mẹ bầu.
                  </p>
                </div>
              </ScrollReveal>

              {/* Cam kết 2 */}
              <ScrollReveal delay={90} className="h-full">
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-beige/80 hover:border-moss/40 hover:shadow-xs transition-all duration-300 flex flex-col items-start h-full">
                  <div className="w-12 h-12 rounded-xl bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ink-dark mb-2">
                    16+ Nốt Hương Tinh Tuyển
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Được nghiên cứu tỉ mỉ qua 4 dòng cảm xúc riêng biệt: Thảo mộc thanh lọc, Hoa dịu nhẹ, Trái cây tươi mát và Ấm nồng sang trọng cho từng góc sống.
                  </p>
                </div>
              </ScrollReveal>

              {/* Cam kết 3 */}
              <ScrollReveal delay={180} className="h-full">
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-beige/80 hover:border-moss/40 hover:shadow-xs transition-all duration-300 flex flex-col items-start h-full">
                  <div className="w-12 h-12 rounded-xl bg-moss/10 border border-moss/20 flex items-center justify-center text-moss-dark mb-4">
                    <Wind className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ink-dark mb-2">
                    Khử Mùi Tận Gốc — Lưu Hương Êm
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Cơ chế phân giải phân tử ẩm mốc, khói bụi trên sợi vải thay vì dùng hóa chất lấn át mùi, để lại hương thảo mộc dịu nhẹ thư thái bền lâu.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* KHỐI 4: 4 DÒNG HƯƠNG NỔI BẬT (Category tiles, heading fade-up, tiles scale) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-moss uppercase tracking-widest block mb-2">
                  Khám Phá Phong Cách
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ink-dark">
                  4 Dòng Hương Cảm Xúc
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted max-w-md">
                Mỗi dòng hương là một nốt lặng bình yên, giúp bạn tìm lại sự cân bằng sau những bộn bề cuộc sống.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Ô 1: Thảo mộc */}
            <ScrollReveal delay={0} scale={true} className="h-full">
              <Link
                href="/dong-huong/thao-moc-thanh-loc"
                className="group bg-[#F0F5EC] rounded-2xl p-6 border border-[#D6E3CD] hover:border-moss hover:shadow-xs transition-all duration-300 flex flex-col justify-between min-h-[210px] h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center text-[#4E6235] mb-4 shadow-2xs">
                    <Wind className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#354622] group-hover:text-moss transition-colors">
                    Thảo mộc – Thanh lọc
                  </h3>
                  <p className="text-xs text-[#43502E] mt-1.5 leading-relaxed">
                    Sả Chanh, Tràm gió, Tràm trắng, Hương thảo giúp thanh lọc không khí, xua muỗi và tỉnh táo tinh thần.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#354622] border-t border-[#D6E3CD]/60 mt-4">
                  <span>Khám phá 4 sản phẩm (45k)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>

            {/* Ô 2: Hoa */}
            <ScrollReveal delay={80} scale={true} className="h-full">
              <Link
                href="/dong-huong/hoa-diu-nhe"
                className="group bg-[#FAF0F3] rounded-2xl p-6 border border-[#EBD6DC] hover:border-[#C97C5D] hover:shadow-xs transition-all duration-300 flex flex-col justify-between min-h-[210px] h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center text-[#7A4B56] mb-4 shadow-2xs">
                    <Flower2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#5B333D] group-hover:text-terracotta transition-colors">
                    Hoa – Dịu nhẹ
                  </h3>
                  <p className="text-xs text-[#7A4B56]/85 mt-1.5 leading-relaxed">
                    Hoa sen, Hoa nhài, Ngọc lan tây, Hoa ly, Hoa violet, Hoa anh đào mang lại cảm xúc dịu dàng và thư thái sâu.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#5B333D] border-t border-[#EBD6DC]/60 mt-4">
                  <span>Khám phá 6 sản phẩm (55k)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>

            {/* Ô 3: Trái cây */}
            <ScrollReveal delay={160} scale={true} className="h-full">
              <Link
                href="/dong-huong/trai-cay-tuoi-mat"
                className="group bg-[#FAF3E8] rounded-2xl p-6 border border-[#EEDCBE] hover:border-amber-500 hover:shadow-xs transition-all duration-300 flex flex-col justify-between min-h-[210px] h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center text-[#8C5821] mb-4 shadow-2xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#6D4214] group-hover:text-amber-700 transition-colors">
                    Trái cây – Tươi mát
                  </h3>
                  <p className="text-xs text-[#754317] mt-1.5 leading-relaxed">
                    Bưởi, Quýt, Cam, Chanh, Dứa, Bạc Hà mang lại cảm giác sảng khoái tức thì và khử mùi hiệu quả.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#6D4214] border-t border-[#EEDCBE]/60 mt-4">
                  <span>Khám phá 6 sản phẩm (45k)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>

            {/* Ô 4: Ấm nồng */}
            <ScrollReveal delay={240} scale={true} className="h-full">
              <Link
                href="/dong-huong/am-nong-ca-tinh"
                className="group bg-[#F5EFE9] rounded-2xl p-6 border border-[#E2D4C6] hover:border-[#6B4B32] hover:shadow-xs transition-all duration-300 flex flex-col justify-between min-h-[210px] h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center text-[#6B4B32] mb-4 shadow-2xs">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#503723] group-hover:text-[#6B4B32] transition-colors">
                    Ấm nồng – Cá tính
                  </h3>
                  <p className="text-xs text-[#6B4B32]/85 mt-1.5 leading-relaxed">
                    Quế và Cà phê ấm áp, quyến rũ, khử mùi mạnh mẽ và tạo phong cách riêng biệt.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#503723] border-t border-[#E2D4C6]/60 mt-4">
                  <span>Khám phá 2 sản phẩm (50k)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* KHỐI 5: HÀNG SẢN PHẨM: THẢO MỘC – THANH LỌC (Heading + Stagger Cards)    */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-beige">
              <div>
                <span className="text-xs font-bold text-moss uppercase tracking-wider block">
                  Hương Thảo Dược Bản Địa
                </span>
                <h2 className="font-serif text-2xl font-bold text-moss-dark">
                  Dòng Thảo Mộc — Thanh Lọc Không Gian
                </h2>
              </div>
              <Link
                href="/dong-huong/thao-moc-thanh-loc"
                className="text-xs sm:text-sm font-bold text-moss hover:text-moss-dark flex items-center gap-1 group"
              >
                <span>Xem tất cả</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
            {thaoMocProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 70}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* KHỐI 6: HÀNG SẢN PHẨM: HOA – DỊU NHẸ (Bố cục Editorial Spotlight)          */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-beige">
              <div>
                <span className="text-xs font-bold text-terracotta uppercase tracking-wider block">
                  Hương Hoa Tinh Tuyển
                </span>
                <h2 className="font-serif text-2xl font-bold text-moss-dark">
                  Dòng Hoa — Dịu Nhẹ &amp; Ru Êm Giấc Ngủ
                </h2>
              </div>
              <Link
                href="/dong-huong/hoa-diu-nhe"
                className="text-xs sm:text-sm font-bold text-moss hover:text-moss-dark flex items-center gap-1 group"
              >
                <span>Xem tất cả</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Editorial Layout: Spotlight Banner trái (slide-in left) + 3 Sản phẩm phải */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {/* Spotlight Card */}
            <ScrollReveal direction="left" delay={0} className="h-full">
              <div className="bg-[#FAF0F3] rounded-2xl p-6 sm:p-7 border border-[#EBD6DC] flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center text-terracotta shadow-2xs">
                    <Flower2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta block mb-1">
                      Đặc quyền thư giãn
                    </span>
                    <h3 className="font-serif text-xl font-bold text-ink-dark leading-snug">
                      Liệu Pháp Thơm Dịu Cho Phòng Ngủ
                    </h3>
                  </div>
                  <p className="text-xs text-ink/80 leading-relaxed">
                    Chiết xuất từ hoa oải hương và hoa hồng tự nhiên giúp giảm căng thẳng sau ngày dài, xịt đệm ga gối tạo cảm giác thơm mát sạch lành.
                  </p>
                  <div className="space-y-1.5 pt-1 text-xs text-ink-dark font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-moss shrink-0" />
                      <span>Xịt thơm gối &amp; rèm cửa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-moss shrink-0" />
                      <span>Không ố vàng vải sáng màu</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    href="/dong-huong/hoa-diu-nhe"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta hover:text-terracotta-dark transition-colors"
                  >
                    <span>Xem bộ sưu tập dòng Hoa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* 3 Sản phẩm dòng Hoa (fade-up stagger) */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
              {hoaProducts.slice(0, 3).map((product, idx) => (
                <ScrollReveal key={product.id} delay={idx * 70 + 80}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* KHỐI 7: HÀNG SẢN PHẨM: TRÁI CÂY – TƯƠI MÁT                                */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-beige">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  Khơi Nguồn Năng Lượng
                </span>
                <h2 className="font-serif text-2xl font-bold text-moss-dark">
                  Dòng Trái Cây — Tươi Mát &amp; Sảng Khoái
                </h2>
              </div>
              <Link
                href="/dong-huong/trai-cay-tuoi-mat"
                className="text-xs sm:text-sm font-bold text-moss hover:text-moss-dark flex items-center gap-1 group"
              >
                <span>Xem tất cả</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
            {traiCayProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 70}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* KHỐI 8: HÀNG SẢN PHẨM: ẤM NỒNG – CÁ TÍNH (Khung panel riêng + scale nhẹ)   */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal scale={true} scaleFrom={0.98}>
            <div className="bg-[#F6F1EA] rounded-3xl p-6 sm:p-8 border border-[#E8DFC8]">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E2D4C6]">
                <div>
                  <span className="text-xs font-bold text-[#76533E] uppercase tracking-wider block">
                    Nốt Trầm Sang Trọng
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#422C1D]">
                    Dòng Ấm Nồng — Gỗ Đàn Hương &amp; Gia Vị
                  </h2>
                </div>
                <Link
                  href="/dong-huong/am-nong-ca-tinh"
                  className="text-xs sm:text-sm font-bold text-[#76533E] hover:text-[#422C1D] flex items-center gap-1 group"
                >
                  <span>Xem tất cả</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
                {amNongProducts.map((product, idx) => (
                  <ScrollReveal key={product.id} delay={idx * 70 + 80}>
                    <ProductCard product={product} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* KHỐI 9: BANNER BỘ SƯU TẬP THEO DÒNG HƯƠNG (Fade-in toàn banner)           */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative rounded-2xl bg-linear-to-r from-[#5B6D3A] to-[#7B8D4E] text-white p-8 sm:p-12 overflow-hidden shadow-xs border border-moss-dark">
              <div className="max-w-2xl space-y-4 z-1 relative">
                <span className="inline-block bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-md tracking-wider uppercase">
                  Combo Tiết Kiệm 20%
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                  Trọn Bộ Sưu Tập Theo Dòng Hương Mộc Hương
                </h2>

                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                  Mỗi bộ sưu tập kết hợp hoàn hảo 3 nốt hương tương hỗ, giúp không gian sống luôn ngập tràn sự thư thái từ sớm mai thức giấc đến khi an giấc ban đêm.
                </p>

                <div className="pt-2">
                  <Link href="/bo-suu-tap">
                    <Button variant="secondary" size="md">
                      <span>Khám phá 4 bộ sưu tập</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* KHỐI 10: HÀNG SẢN PHẨM: SET QUÀ TẶNG (Lưới 3 cột, stagger delay 90ms)     */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-3 border-b border-beige">
              <div>
                <span className="text-xs font-bold text-terracotta uppercase tracking-wider block">
                  Gửi Trao Yêu Thương
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-moss-dark">
                  Set Quà Tặng Mộc Hương
                </h2>
              </div>
              <Link
                href="/set-qua-tang"
                className="text-xs sm:text-sm font-bold text-moss hover:text-moss-dark flex items-center gap-1 group"
              >
                <span>Xem tất cả set quà</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {giftSetProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 90}>
                <ProductCard product={product} isComboView={true} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* KHỐI 11: VÌ SAO CHỌN MỘC HƯƠNG (Ảnh trái scale, text phải fade-up)       */}
        {/* ========================================================================= */}
        <section className="bg-beige/60 py-14 sm:py-18 border-y border-beige">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Cột hình ảnh minh họa 4 dòng hương và chai sản phẩm */}
              <ScrollReveal scale={true} scaleFrom={0.96}>
                <div className="space-y-4">
                  <div className="relative aspect-[16/9] sm:aspect-[1.85/1] rounded-2xl overflow-hidden border-2 border-white shadow-soft group">
                    <Image
                      src="/images/banner/banner.jpg"
                      alt="Chai xịt thơm Mộc Hương và nguyên liệu thảo mộc thiên nhiên"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transform group-hover:scale-103 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-beige shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-moss/10 text-moss flex items-center justify-center shrink-0 font-serif font-bold text-base border border-moss/20">
                      100%
                    </div>
                    <div>
                      <p className="font-serif font-bold text-base sm:text-lg text-moss-dark">100% Thuần Khiết Tự Nhiên</p>
                      <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                        Chưng cất từ thảo mộc dược liệu đạt chuẩn Việt Nam, an tâm sử dụng mỗi ngày.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Cột thông tin câu chuyện (fade-up) */}
              <ScrollReveal delay={80}>
                <div className="space-y-5">
                  <span className="text-xs font-bold text-moss uppercase tracking-widest block">
                    Triết Lý Thương Hiệu
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-moss-dark leading-tight">
                    Vì Sao Bạn Nên Chọn Mộc Hương?
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-serif italic border-l-2 border-moss pl-3">
                    &ldquo;Mộc Hương ra đời từ mong muốn mang đến những khoảnh khắc thư giãn giản đơn trong cuộc sống bận rộn hằng ngày...&rdquo;
                  </p>

                  <div className="space-y-3.5 pt-2">
                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-lg bg-moss/15 text-moss flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        ✓
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-moss-dark">Không hương liệu nhân tạo</h3>
                        <p className="text-xs text-ink-muted mt-0.5">Chỉ sử dụng tinh dầu nguyên chất, không chứa chất lưu hương độc hại hay phthalates.</p>
                      </div>
                    </div>

                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-lg bg-moss/15 text-moss flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        ✓
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-moss-dark">Khử mùi tận gốc, không át mùi</h3>
                        <p className="text-xs text-ink-muted mt-0.5">Cồn lên men tự nhiên phân hủy vi khuẩn gây mùi, giúp vải vóc thơm tho dễ chịu.</p>
                      </div>
                    </div>

                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-lg bg-moss/15 text-moss flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        ✓
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-moss-dark">Dung tích 30ml bỏ túi tiện lợi</h3>
                        <p className="text-xs text-ink-muted mt-0.5">Gọn gàng trong túi xách, ba lô hay hộc xe hơi — luôn sẵn sàng thơm mát bất cứ khi nào bạn cần.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link href="/ve-chung-toi">
                      <Button variant="outline" size="sm">
                        <span>Đọc câu chuyện Mộc Hương</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* KHỐI 12: ĐÁNH GIÁ KHÁCH HÀNG (Heading fade-up, 4 review cards stagger)   */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-moss uppercase tracking-widest block mb-2">
                Khách Hàng Nói Gì?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-moss-dark">
                Cảm Nhận Từ Những Người Yêu Hương
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted mt-2">
                Hơn 5.000+ khách hàng đã tin dùng sản phẩm xịt thơm Mộc Hương cho không gian gia đình.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOCK_REVIEWS.map((review, idx) => (
              <ScrollReveal key={review.id} delay={idx * 80} className="h-full">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-beige/80 hover:border-moss/40 flex flex-col justify-between transition-all h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <RatingStars rating={review.rating} size="sm" showNumber={false} />
                      <Quote className="w-4 h-4 text-beige" />
                    </div>
                    <p className="text-xs text-ink/80 leading-relaxed italic mb-4">
                      &ldquo;{review.content}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-beige/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xs text-moss-dark">{review.authorName}</h3>
                        {review.userRole && (
                          <p className="text-[10px] text-ink-muted mt-0.5">{review.userRole}</p>
                        )}
                      </div>
                      {review.verifiedPurchase && (
                        <span className="text-[10px] text-moss bg-moss/10 px-2 py-0.5 rounded-full font-bold">
                          Đã mua hàng
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* KHỐI 13: BLOG / KIẾN THỨC MÙI HƯƠNG (Heading fade-up, 3 cards stagger)    */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-beige">
              <div>
                <span className="text-xs font-bold text-moss uppercase tracking-wider block">
                  Góc Thảo Mộc
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-moss-dark">
                  Kiến Thức &amp; Nghệ Thuật Mùi Hương
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-xs sm:text-sm font-bold text-moss hover:text-moss-dark flex items-center gap-1 group"
              >
                <span>Xem tất cả bài viết</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_BLOGS.map((post, idx) => (
              <ScrollReveal key={post.id} delay={idx * 90} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-beige/80 overflow-hidden hover:border-moss/40 hover:shadow-xs transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-ink/50 mb-3">
                      <Badge variant="moss" size="sm">
                        {post.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-ink-muted text-[11px]">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-ink-dark group-hover:text-terracotta transition-colors leading-snug mb-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-ink-muted line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="px-6 py-3 bg-cream/70 border-t border-beige/60 flex items-center justify-between text-xs font-bold text-moss">
                    <span>Đọc bài viết</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
