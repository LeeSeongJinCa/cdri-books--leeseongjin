"use client";

import { useBooks } from "@/entities/book/hooks/useBooks";
import { BookSearchResultListItem } from "@/entities/book/ui/book-search-result-list-item/BookSearchResultListItem";
import { SearchNoData } from "@/entities/search/ui/search-no-data/SearchNoData";
import { SearchResultList } from "@/entities/search/ui/search-result-list/SearchResultList";

import { useBookSearchParams } from "@/entities/book/hooks/useBookSearchParams";
import type { BookApiResponseDocument } from "@/entities/book/model/type";
import { SearchError } from "@/entities/search/ui/search-error/SearchError";
import { useWishlistStore } from "@/entities/wishlist/store/wishlistStore";
import { useCallback } from "react";

export const BookSearchResults = () => {
  const { searchValue, searchType } = useBookSearchParams();

  const { query, books } = useBooks(searchValue, searchType);

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

  const isError = query.isError;
  const isEmpty = books.length === 0;

  if (isError) {
    return <SearchError className="w-full h-[400px]" />;
  }

  if (isEmpty) {
    return <SearchNoData className="w-full h-[400px]" />;
  }

  return (
    <SearchResultList
      keySelector={(document) => document.isbn}
      documents={books}
      renderItem={(document) => {
        const isLiked = wishlist.some((b) => b.isbn === document.isbn);

        return (
          <BookSearchResultListItem
            document={document}
            isLiked={isLiked}
            onLike={() => handleLike(document)}
          />
        );
      }}
      enableMore
      isFetchingMore={query.isFetchingNextPage}
      hasMore={query.hasNextPage}
      onMore={query.fetchNextPage}
    />
  );
};
