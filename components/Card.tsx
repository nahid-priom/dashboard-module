"use client";

import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className = "", children, ...props }, ref) => {
    const hoverStyles = variant === "hover" ? "hover:shadow-md transition-shadow duration-200" : "hover:shadow-md transition-shadow duration-200";
    
    return (
      <div
        ref={ref}
        className={`
          bg-white dark:bg-gray-800
          border border-gray-200/50 dark:border-gray-700/50
          rounded-xl shadow-sm
          ${hoverStyles}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

