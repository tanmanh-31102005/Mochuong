"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

export interface ScrollRevealProps {
  children: ReactNode;
  delay?: number; // milliseconds delay, e.g. 0, 80, 160
  duration?: number; // milliseconds duration, default 550ms
  direction?: "up" | "left" | "right" | "none"; // animation vector
  scale?: boolean; // slight scale-up from 0.96/0.98 to 1
  scaleFrom?: number; // custom scale start value, e.g. 0.96 or 0.98
  className?: string;
  threshold?: number; // viewport visibility threshold (0.15 - 0.2)
}

/**
 * ScrollReveal Component
 * Tự động kích hoạt hiệu ứng xuất hiện (reveal) mượt mà 1 LẦN DUY NHẤT khi phần tử
 * đi vào viewport qua IntersectionObserver thuần.
 * Tôn trọng thuộc tính prefers-reduced-motion: reduce.
 */
export function ScrollReveal({
  children,
  delay = 0,
  duration = 550,
  direction = "up",
  scale = false,
  scaleFrom = 0.96,
  className,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Tôn trọng prefers-reduced-motion của người dùng
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // Chạy 1 lần duy nhất, không lặp lại khi cuộn lên/xuống
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  // Thiết lập vector dịch chuyển ban đầu
  let initialTransform = "";
  if (direction === "up") {
    initialTransform = "translateY(20px)";
  } else if (direction === "left") {
    initialTransform = "translateX(-20px)";
  } else if (direction === "right") {
    initialTransform = "translateX(20px)";
  }

  if (scale) {
    initialTransform = initialTransform
      ? `${initialTransform} scale(${scaleFrom})`
      : `scale(${scaleFrom})`;
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : initialTransform || "none",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionProperty: "opacity, transform",
      }}
      className={cn("will-change-[opacity,transform]", className)}
    >
      {children}
    </div>
  );
}
