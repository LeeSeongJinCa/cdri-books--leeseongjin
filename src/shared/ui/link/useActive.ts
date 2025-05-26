import { usePathname } from "next/navigation";
import type { UrlObject } from "url";

export const useActive = (href: string | UrlObject) => {
  const pathname = usePathname();

  try {
    if (typeof window === "undefined") return href === pathname;
    if (typeof href === "string")
      return new URL(href, window.location.origin).pathname === pathname;

    return href.pathname === pathname;
  } catch {
    return href === pathname;
  }
};
