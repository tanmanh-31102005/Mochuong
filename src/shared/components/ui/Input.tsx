"use client";

import React, { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold uppercase tracking-wider text-ink/80"
          >
            {label}
            {props.required && <span className="text-terracotta ml-1">*</span>}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full rounded-xl border border-beige bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 transition-all duration-200 outline-none",
            "focus:border-moss focus:ring-2 focus:ring-moss/20",
            error && "border-red-400 focus:border-red-500 focus:ring-red-200",
            "disabled:bg-beige/30 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-ink/60">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
