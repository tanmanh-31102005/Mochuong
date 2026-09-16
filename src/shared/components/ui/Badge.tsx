import React from "react";
import { cn } from "@/shared/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "moss" | "terracotta" | "cream" | "beige" | "outline" | "danger";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "moss",
  size = "md",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-bold tracking-wide rounded-full select-none";

  const variantStyles = {
    moss: "bg-[#25391C] text-white shadow-xs border border-white/20",
    "moss-subtle": "bg-[#EBF2E8] text-[#24371C] border border-[#C8DEC2]",
    terracotta: "bg-terracotta text-white shadow-xs border border-white/20",
    cream: "bg-cream text-ink border border-beige",
    beige: "bg-beige text-ink-dark",
    outline: "border border-ink/25 text-ink-dark",
    danger: "bg-red-100 text-red-700 border border-red-200",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </span>
  );
};
