import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { MOCK_BLOGS } from "@/features/blog/data/mock-blogs";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = MOCK_BLOGS.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  const postIndex = MOCK_BLOGS.findIndex((b) => b.slug === slug);
  const coverImages = [
    "/images/banner/banner.jpg",
    "/images/collections/bo-suu-tap-trai-cay.jpg",
    "/images/collections/bo-suu-tap-hoa.jpg",
  ];
  const coverImage = coverImages[postIndex % coverImages.length];

  return (
    <div className="py-10 sm:py-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-moss hover:text-moss-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách bài viết</span>
        </Link>

        {/* Header bài viết */}
        <div className="space-y-4">
          <Badge variant="moss" size="md">
            {post.category}
          </Badge>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-moss-dark leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-ink/60 pb-4 border-b border-beige">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedAt}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-[#E3DACB] shadow-[0_10px_30px_rgba(74,74,74,0.06)]">
          <Image
            src={coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Nội dung chi tiết */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E3DACB] shadow-[0_10px_30px_rgba(74,74,74,0.05)] space-y-6 text-sm text-ink/80 leading-relaxed">
          <p className="text-base font-serif italic text-moss-dark leading-relaxed">
            {post.excerpt}
          </p>

          <p>
            Mùi hương tác động trực tiếp vào hệ viền (Limbic system) của não bộ — nơi lưu giữ cảm xúc và ký ức của con người. Khi ta ngửi thấy một nốt hương tự nhiên dễ chịu, não bộ lập tức kích hoạt phản ứng thư giãn, hạ huyết áp và làm chậm nhịp tim.
          </p>

          <h3 className="font-serif font-bold text-lg text-moss-dark pt-2">
            1. Quy Tắc Chọn Mùi Theo Không Gian Sống
          </h3>
          <p>
            - <strong>Phòng làm việc:</strong> Cần sự tỉnh táo và tập trung cao độ. Hãy chọn các nốt hương Thảo mộc (Bạc hà, Sả chanh) hoặc Trái cây (Cam ngọt, Bưởi) để kích hoạt năng lượng tư duy.
          </p>
          <p>
            - <strong>Phòng ngủ:</strong> Cần sự dịu êm và giải tỏa áp lực. Hoa Oải Hương (Lavender) và Cúc La Mã là cặp đôi hoàn hảo giúp bạn thư giãn sau ngày dài bận rộn.
          </p>
          <p>
            - <strong>Tủ quần áo &amp; Áo khoác:</strong> Gỗ Đàn Hương và Quế Hồi sẽ tạo nên phong thái đĩnh đạc, sang trọng và lưu hương bền bỉ trên các chất liệu sợi tự nhiên.
          </p>

          <h3 className="font-serif font-bold text-lg text-moss-dark pt-2">
            2. Cách Sử Dụng Xịt Thơm Tự Nhiên Hiệu Quả Nhất
          </h3>
          <p>
            Vì tinh dầu thiên nhiên có tính bay hơi tự nhiên, bạn nên xịt ở khoảng cách 15-20cm lên các bề mặt có độ xốp giữ mùi tốt như rèm vải, vỏ gối, áo len hoặc góc trong của tủ quần áo.
          </p>

          <div className="pt-6 border-t border-beige flex justify-between items-center">
            <span className="text-xs font-bold text-ink/60">Chia sẻ bài viết:</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-3.5 h-3.5 mr-1" />
                <span>Chia sẻ</span>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
