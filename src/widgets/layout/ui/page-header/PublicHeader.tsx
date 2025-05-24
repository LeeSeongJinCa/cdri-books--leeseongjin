import { ROUTES } from "@/shared/config/routes";
import { cn } from "@/shared/lib/cn";
import { Link } from "@/shared/ui/link/Link";
import type { HTMLAttributes } from "react";
import { PUBLIC_HEADER_ROUTES } from "../../config/header-routes";

export type PublicHeaderProps = HTMLAttributes<HTMLElement>;

export const PublicHeader = ({ className, ...props }: PublicHeaderProps) => {
  return (
    <header className={cn("w-full h-[80px] bg-white", className)} {...props}>
      <div className="flex items-center justify-between h-full mx-auto">
        <Link
          href={ROUTES.HOME}
          className="text-title1 uppercase"
          activeClassName="border-none"
        >
          CERTICOS BOOKS
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium">
          {PUBLIC_HEADER_ROUTES.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="body-1 text-text-primary transition-colors active:border-b active:border-b-primary"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Navigation을 가운데로 위치시키기 위한 빈 블럭 */}
        <div className="hidden sm:block" />
      </div>
    </header>
  );
};
