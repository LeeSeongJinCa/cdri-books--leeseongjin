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

  // 검색어 제목 생성, 없으면 기본 제목
  const headingText = searchValue ? `"${searchValue}" 검색 결과` : "검색 결과";

  return (
    <>
      <h2 className="text-title3 text-text-primary mb-4">{headingText}</h2>
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
    </>
  );
};
