"use client";

import { BookSearchResultListItem } from "@/entities/book/ui/book-search-result-list-item/BookSearchResultListItem";
import { SearchNoData } from "@/entities/search/ui/search-no-data/SearchNoData";
import { SearchResultList } from "@/entities/search/ui/search-result-list/SearchResultList";

import type { BookApiResponseDocument } from "@/entities/book/model/type";
import { useWishlistStore } from "@/entities/wishlist/store/wishlistStore";
import { useCallback, useMemo, useState } from "react";

const SIZE = 10;

export const WishlistSearchResults = () => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  const handleLike = useCallback(
    (document: BookApiResponseDocument) => {
      const hasBook = wishlist.some((b) => b.isbn === document.isbn);

      if (hasBook) {
        removeFromWishlist(document);
      } else {
        addToWishlist(document);
      }
    },
    [wishlist, addToWishlist, removeFromWishlist],
  );

  const [page, setPage] = useState<number>(1);
  const books = useMemo(() => wishlist.slice(0, page * SIZE), [wishlist, page]);

  const hasMore = useMemo(
    () => wishlist.length > page * SIZE,
    [wishlist, page],
  );

  const handleMore = useCallback(() => {
    if (!hasMore) return;

    setPage((prev) => prev + 1);
  }, [hasMore]);

  const isEmpty = books.length === 0;

  if (isEmpty) {
    return <SearchNoData className="w-full h-[400px]" />;
  }

  return (
    <>
      <h2 className="text-title3 text-text-primary mb-4">찜한 도서 목록</h2>
      <SearchResultList
        keySelector={(document) => document.isbn}
        documents={books}
        renderItem={(document) => {
          const isLiked = books.some((b) => b.isbn === document.isbn);

          return (
            <BookSearchResultListItem
              document={document}
              isLiked={isLiked}
              onLike={() => handleLike(document)}
            />
          );
        }}
        enableMore
        isFetchingMore={false}
        hasMore={hasMore}
        onMore={handleMore}
      />
    </>
  );
};
