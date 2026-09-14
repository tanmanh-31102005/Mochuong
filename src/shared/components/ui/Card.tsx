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
        "bg-white rounded-2xl border border-beige/80 overflow-hidden shadow-soft",
        hoverEffect &&
          "transition-all duration-300 hover:shadow-card hover:-translate-y-1 hover:border-moss/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
