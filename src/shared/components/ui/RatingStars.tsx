import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export interface RatingStarsProps {
  rating: number; // 0 to 5
  totalReviews?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  totalReviews,
  size = "md",
  showNumber = true,
  className,
}) => {
  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.floor(rating);
          const isHalf = !isFilled && star === Math.ceil(rating) && rating % 1 >= 0.5;

          return (
            <Star
              key={star}
              className={cn(
                iconSizes[size],
                isFilled || isHalf ? "fill-amber-400 text-amber-400" : "text-beige fill-beige"
              )}
            />
          );
        })}
      </div>

      {showNumber && (
        <span className="text-xs font-bold text-ink/80">
          {rating.toFixed(1)}
        </span>
      )}

      {totalReviews !== undefined && (
        <span className="text-xs text-ink/50 font-normal">
          ({totalReviews})
        </span>
      )}
    </div>
  );
};
