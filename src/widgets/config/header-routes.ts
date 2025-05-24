import { ROUTES } from "@/shared/config/routes";

export const PUBLIC_HEADER_ROUTES = [
  {
    title: "도서 검색",
    href: ROUTES.HOME,
  },
  {
    title: "내가 찜한 책",
    href: ROUTES.LIKES,
  },
] as const;
