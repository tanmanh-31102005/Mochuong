"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the draft post editor
    router.replace("/admin/bai-viet/blog-draft-1");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-xs text-ink/60 font-semibold animate-pulse">
        Đang chuyển tiếp tới trình soạn thảo bài viết...
      </div>
    </div>
  );
}
