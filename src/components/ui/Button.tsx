import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary:
        "bg-accent-400 text-white hover:bg-accent-500 focus:ring-primary-1 shadow-lg hover:shadow-xl",
      secondary:
        "bg-secondary-800 text-white hover:bg-accent-400 focus:ring-secondary-500",
      accent:
        "bg-accent-500 text-white hover:bg-accent-400 focus:ring-accent-500 shadow-lg hover:shadow-xl",
      outline:
        "border-2 border-primary-600 text-primary-600 hover:border-accent-200 focus:ring-primary-500",
      ghost:
        "hover:bg-secondary-100 text-secondary-700 hover:text-secondary-900",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
