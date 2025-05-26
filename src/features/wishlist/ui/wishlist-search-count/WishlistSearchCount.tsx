"use client";

import { SearchCountText } from "@/entities/search/ui/search-count-text/SearchCountText";
import { useWishlistStore } from "@/entities/wishlist/store/wishlistStore";

export const WishlistSearchCount = () => {
  const wishlist = useWishlistStore((state) => state.wishlist);

  const totalCount = wishlist.length;

  return <SearchCountText title="찜한 책" count={totalCount} />;
};
