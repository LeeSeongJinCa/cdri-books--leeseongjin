import { ROUTES } from "@/shared/config/routes";
import { cn } from "@/shared/lib/cn";
import { Link } from "@/shared/ui/link/Link";
import type { HTMLAttributes } from "react";
import { PUBLIC_HEADER_ROUTES } from "../../config/header-routes";

export type PublicHeaderProps = HTMLAttributes<HTMLElement>;

export const PublicHeader = ({ className, ...props }: PublicHeaderProps) => {
  return (
    <header
      className={cn("PublicHeader-root", "w-full h-[80px] bg-white", className)}
      {...props}
    >
      <div className="flex items-center justify-between h-full mx-auto">
        <Link
          href={ROUTES.HOME}
          className="text-title1 uppercase"
          aria-label="홈으로 이동"
        >
          CERTICOS BOOKS
        </Link>

        <nav
          aria-label="주요 네비게이션 메뉴"
          className="flex items-center space-x-6 text-sm font-medium"
        >
          {PUBLIC_HEADER_ROUTES.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={cn(
                "body-1 text-text-primary transition-colors",
                "border-b border-b-transparent",
                "active:border-b active:border-b-primary",
              )}
              activeClassName="border-b-primary"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Navigation을 가운데로 위치시키기 위한 빈 블럭 */}
        <div className="hidden sm:block" aria-hidden="true" />
      </div>
    </header>
  );
};
