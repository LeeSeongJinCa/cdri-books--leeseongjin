import { WishlistSearchCount } from "@/features/wishlist/ui/wishlist-search-count/WishlistSearchCount";
import { WishlistSearchResults } from "@/features/wishlist/ui/wishlist-search-results/WishlistSearchResults";
import { cn } from "@/shared/lib/cn";

export default function Page() {
  return (
    <>
      <section className={cn("flex flex-col gap-4 mb-12")}>
        <p className="text-title2 text-text-primary text-left">내가 찜한 책</p>

        <WishlistSearchCount />
      </section>

      <section>
        <WishlistSearchResults />
      </section>
    </>
  );
}
