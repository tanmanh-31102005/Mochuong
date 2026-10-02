"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  CheckCircle2,
  PackageCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";

export interface HeroSlide {
  id: string;
  image: string;
  badge: string;
  badgeIconColor: "terracotta" | "moss";
  headingLine1: string;
  headingLine2: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/images/banner/banner.jpg",
    badge: "Chuyên gia xịt thơm quần áo 30ml",
    badgeIconColor: "terracotta",
    headingLine1: "Xịt Thơm Quần Áo Thiên Nhiên",
    headingLine2: "Khử Mùi Ẩm Mốc — Lưu Hương Suốt Ngày",
    description:
      "Giải pháp ướp hương trang phục tự nhiên từ Mộc Hương 30ml. Khử sạch mùi ẩm mốc mùa mưa, mùi thức ăn lẩu nướng và mồ hôi trên từng sợi vải chỉ sau 30 giây, cam kết 100% không ố vàng áo trắng.",
    primaryCta: {
      text: "Khám phá 18 mùi xịt quần áo",
      href: "/san-pham",
    },
    secondaryCta: {
      text: "Xem 4 bộ sưu tập",
      href: "/bo-suu-tap",
    },
  },
  {
    id: "slide-2",
    image: "/images/banner/banner-2.jpg",
    badge: "Ưu đãi tiết kiệm đến 15%",
    badgeIconColor: "terracotta",
    headingLine1: "Combo 3 Chai Xịt Quần Áo Tự Chọn",
    headingLine2: "Đổi Mùi Mỗi Ngày — Giá Chỉ 129K",
    description:
      "Tự do chọn 3 mùi xịt thơm quần áo yêu thích từ 18 nốt hương thảo mộc & hoa cỏ tự nhiên. Chai 30ml bỏ túi tiện lợi mang theo đi làm, đi tiệc hay du lịch.",
    primaryCta: {
      text: "Chọn combo 3 chai (129K)",
      href: "/bo-suu-tap/combo-3-chai-tu-chon",
    },
    secondaryCta: {
      text: "Xem tất cả sản phẩm",
      href: "/san-pham",
    },
  },
  {
    id: "slide-3",
    image: "/images/banner/banner-3.jpg",
    badge: "Món quà tinh tế & chỉn chu",
    badgeIconColor: "moss",
    headingLine1: "Set Quà Tặng Xịt Thơm Quần Áo",
    headingLine2: "Nâng Niu Từng Nếp Áo Người Thương",
    description:
      "Hộp quà xịt thơm trang phục cao cấp thiết kế nắp gỗ mộc mạc, kèm thiệp viết tay theo yêu cầu — món quà tinh tế và thiết thực cho người thân yêu.",
    primaryCta: {
      text: "Xem các set quà tặng",
      href: "/set-qua-tang",
    },
  },
];

export const HeroBannerSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Kiểm tra prefers-reduced-motion của trình duyệt
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Tự động chuyển slide sau mỗi 5 giây khi không hover và không bật reduced motion
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused, prefersReducedMotion, currentSlide]);

  const handleNextSlide = () => {
    nextSlide();
  };

  const handlePrevSlide = () => {
    prevSlide();
  };

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Hỗ trợ vuốt chạm trên thiết bị cảm ứng
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full bg-[#FAF7F2] border-b border-beige/80 overflow-hidden flex flex-col justify-between min-h-[480px] lg:min-h-[560px]"
      aria-label="Giới thiệu Mộc Hương"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ========================================================================= */}
      {/* 1. SPLIT HERO CONTAINER (CĂN GIỮA HOÀN HẢO THEO CHIỀU DỌC TRÊN DESKTOP)    */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* CỘT TRÁI: NỘI DUNG THƯƠNG HIỆU (ĐỒNG BỘ THEO SLIDE HIỆN TẠI) - 5 CỘT DESKTOP */}
          <div
            key={`slide-text-${currentSlide}`}
            className="lg:col-span-5 flex flex-col items-start text-left z-10"
          >
            {/* Badge Tag nhỏ gọn với icon đồng bộ và animation nhẹ */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-moss/10 border border-moss/20 text-moss-dark text-xs sm:text-sm font-semibold tracking-wide mb-3 sm:mb-4 shadow-2xs transition-all duration-300 animate-[fadeIn_0.35s_ease-out]">
              <Sparkles
                className={cn(
                  "w-3.5 h-3.5 shrink-0 transition-colors duration-300",
                  slide.badgeIconColor === "terracotta" ? "text-terracotta" : "text-moss"
                )}
              />
              <span>{slide.badge}</span>
            </div>

            {/* Semantic H1 Duy Nhất với 2 Dòng Phân Cấp Rõ Ràng */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-bold tracking-[-0.01em] leading-[1.2] mb-3 sm:mb-4 max-w-xl transition-all duration-350 delay-75 animate-[fadeIn_0.4s_ease-out]">
              <span className="block text-moss-dark text-2xl sm:text-3xl lg:text-[32px] font-semibold mb-1 leading-tight">
                {slide.headingLine1}
              </span>
              <span className="block text-[#A94F35] font-serif leading-tight">
                {slide.headingLine2}
              </span>
            </h1>

            {/* Đoạn Mô Tả Chuẩn Nội Dung Theo Từng Slide */}
            <p className="text-sm sm:text-base text-ink/85 leading-relaxed mb-6 sm:mb-7 max-w-lg font-normal transition-all duration-400 delay-150 animate-[fadeIn_0.45s_ease-out]">
              {slide.description}
            </p>

            {/* Bộ Đôi CTA Có Micro-interaction Tinh Tế */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto transition-all duration-450 delay-200 animate-[fadeIn_0.5s_ease-out]">
              <Link href={slide.primaryCta.href} className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto min-h-[44px] px-6 sm:px-7 py-3 text-sm sm:text-base font-bold bg-[#A94F35] text-white hover:bg-[#8E3F2A] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 rounded-xl flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#A94F35] focus-visible:ring-offset-2"
                  aria-label={slide.primaryCta.text}
                >
                  <span>{slide.primaryCta.text}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              {slide.secondaryCta && (
                <Link href={slide.secondaryCta.href} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto min-h-[44px] px-6 py-3 text-sm sm:text-base font-bold border border-moss-dark/50 text-moss-dark hover:bg-moss/10 hover:border-moss-dark transition-all duration-200 rounded-xl flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2"
                    aria-label={slide.secondaryCta.text}
                  >
                    <span>{slide.secondaryCta.text}</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* CỘT PHẢI: VÙNG ẢNH SLIDER CAROUSEL - 7 CỘT DESKTOP */}
          <div className="lg:col-span-7 flex items-center justify-center w-full">
            {/* Khung ảnh có gradient nhẹ, border mỏng và shadow tinh tế */}
            <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#F5F0E8] to-[#FAF7F2] border border-[#E8DFD1] p-2 sm:p-3 shadow-[0_8px_30px_rgba(74,74,74,0.06)] overflow-hidden group/banner">
              
              {/* Render 3 Slide ảnh với kích thước gốc 1774x887, giữ tỷ lệ 2:1 tự nhiên, không crop */}
              <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden bg-white/40">
                {HERO_SLIDES.map((s, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <div
                      key={s.id}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-600 ease-in-out",
                        isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      )}
                    >
                      <Image
                        src={s.image}
                        alt={`${s.headingLine1} - ${s.headingLine2}`}
                        width={1774}
                        height={887}
                        priority={idx === 0}
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="w-full h-full object-contain object-center"
                      />
                    </div>
                  );
                })}

                {/* Nút lướt sang trái (Previous Slide) */}
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-ink border border-beige/80 shadow-md backdrop-blur-xs flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-90 lg:opacity-0 lg:group-hover/banner:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-moss"
                  aria-label="Slide trước đó"
                >
                  <ChevronLeft className="w-5 h-5 text-ink-dark" />
                </button>

                {/* Nút lướt sang phải (Next Slide) */}
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-ink border border-beige/80 shadow-md backdrop-blur-xs flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-90 lg:opacity-0 lg:group-hover/banner:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-moss"
                  aria-label="Slide tiếp theo"
                >
                  <ChevronRight className="w-5 h-5 text-ink-dark" />
                </button>

                {/* Dot indicators ở đáy vùng ảnh (không che sản phẩm) */}
                <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                  {HERO_SLIDES.map((_, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectSlide(idx)}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                          isActive ? "w-5 bg-terracotta" : "w-1.5 bg-white/60 hover:bg-white"
                        )}
                        aria-label={`Chuyển tới slide ${idx + 1}`}
                      />
                    );
                  })}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DẢI TRUST BAR MÀU XANH TINH GIẢN — TẬP TRUNG VÀO XỊT THƠM QUẦN ÁO      */}
      {/* ========================================================================= */}
      <div className="bg-[#344026] text-white border-t border-[#2a341f] w-full mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 items-center text-left">
            
            {/* Mục 1: Đánh giá */}
            <div className="flex items-center gap-2.5 lg:border-r lg:border-white/10 lg:pr-4">
              <div className="flex text-amber-400 gap-0.5 shrink-0">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-extrabold text-white">4.9/5 Sao</div>
                <div className="text-[11px] text-white/70">5.000+ Khách tin dùng</div>
              </div>
            </div>

            {/* Mục 2: Không ố vàng vải */}
            <div className="lg:border-r lg:border-white/10 lg:pr-4 leading-tight">
              <div className="text-xs sm:text-sm font-bold text-white">Không ố vàng vải</div>
              <div className="text-[11px] text-white/70">An toàn áo trắng &amp; lụa</div>
            </div>

            {/* Mục 3: Khử ẩm mốc tận gốc */}
            <div className="lg:border-r lg:border-white/10 lg:pr-4 leading-tight">
              <div className="text-xs sm:text-sm font-bold text-white">Khử ẩm mốc tận gốc</div>
              <div className="text-[11px] text-white/70">Cồn mía lên men tự nhiên</div>
            </div>

            {/* Mục 4: Bỏ túi 30ml */}
            <div className="lg:border-r lg:border-white/10 lg:pr-4 leading-tight">
              <div className="text-xs sm:text-sm font-bold text-white">Bỏ túi 30ml tiện lợi</div>
              <div className="text-[11px] text-white/70">Xịt thơm áo mọi lúc</div>
            </div>

            {/* Mục 5: Giao hàng toàn quốc */}
            <div className="col-span-2 md:col-span-1 leading-tight">
              <div className="text-xs sm:text-sm font-bold text-white">Giao hàng toàn quốc</div>
              <div className="text-[11px] text-white/70">Freeship từ 300k</div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
