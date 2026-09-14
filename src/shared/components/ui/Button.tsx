"use client";

import React, { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-xl";

    const variantStyles = {
      primary:
        "bg-terracotta text-white hover:bg-terracotta-dark shadow-md hover:shadow-lg active:scale-[0.98] focus:ring-terracotta/40",
      secondary:
        "bg-moss text-white hover:bg-moss-dark shadow-sm hover:shadow active:scale-[0.98] focus:ring-moss/40",
      outline:
        "border-2 border-moss text-moss hover:bg-moss hover:text-white active:scale-[0.98] focus:ring-moss/30",
      ghost:
        "text-ink hover:bg-beige/60 hover:text-moss active:scale-[0.98] focus:ring-moss/20",
      danger:
        "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] focus:ring-red-400",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
      md: "text-sm px-4 py-2.5 gap-2 h-10",
      lg: "text-base px-6 py-3.5 gap-2.5 h-12",
      icon: "w-10 h-10 p-2",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
