import { cn } from "@/shared/lib/cn";
import type { ClassValue } from "clsx";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

const variants: Record<string, ClassValue> = {
  primary: cn("bg-primary text-white hover:bg-primary/90 focus:ring-primary"),
  secondary: cn(
    "gap-1 border border-light-gray bg-light-gray text-text-secondary hover:bg-light-gray/90 ",
  ),
  outline: cn(
    "border border-input hover:bg-accent hover:text-accent-foreground",
  ),
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  isLoading?: boolean;
}

export const Button = ({
  variant = "primary",
  isLoading = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center h-[48px] px-6 py-2 rounded-lg text-caption whitespace-nowrap cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </button>
  );
};
