import { WishlistSearchCount } from "@/features/wishlist/ui/wishlist-search-count/WishlistSearchCount";
import { WishlistSearchResults } from "@/features/wishlist/ui/wishlist-search-results/WishlistSearchResults";
import { cn } from "@/shared/lib/cn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "찜한 책 | CDRI - 도서 검색 서비스",
  description:
    "CDRI 도서 검색 서비스에서 찜한 도서 목록을 확인할 수 있습니다. 관심있는 도서를 저장하고 관리해보세요.",
};

export default function Page() {
  return (
    <>
      <section className={cn("flex flex-col gap-4 mb-12")}>
        <h1 className="text-title2 text-text-primary text-left">
          내가 찜한 책
        </h1>

        <WishlistSearchCount />
      </section>

      <section>
        <WishlistSearchResults />
      </section>
    </>
  );
}
