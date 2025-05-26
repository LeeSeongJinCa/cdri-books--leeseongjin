import { cn } from "@/shared/lib/cn";
import type { HTMLAttributes } from "react";
import { PublicHeader } from "../page-header/PublicHeader";

export type PublicLayoutProps = HTMLAttributes<HTMLElement>;

export const PublicLayout = ({
  className,
  children,
  ...props
}: PublicLayoutProps) => {
  return (
    <div
      className={cn("PublicLayout-root", "flex flex-col", className)}
      {...props}
    >
      <PublicHeader className="w-full max-w-[960px] mx-auto px-4" />

      <main
        className={cn(
          "PublicLayout-main",
          "flex-1 w-full max-w-[960px] mx-auto mt-16 px-4 pb-12",
        )}
      >
        {children}
      </main>
    </div>
  );
};
