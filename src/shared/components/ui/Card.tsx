import React from "react";
import { cn } from "@/shared/utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  hoverEffect = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-[#E3DACB] overflow-hidden shadow-[0_8px_24px_rgba(74,74,74,0.05)]",
        hoverEffect &&
          "transition-all duration-300 hover:shadow-[0_16px_34px_rgba(74,74,74,0.09)] hover:-translate-y-1 hover:border-moss/45",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
