"use client";

import { useBooks } from "@/entities/book/hooks/useBooks";
import { SearchNoData } from "@/entities/search/ui/search-no-data/SearchNoData";
import { SearchResultList } from "@/entities/search/ui/search-result-list/SearchResultList";
import { BookSearchResultListItem } from "@/widgets/book/ui/book-search-result-list-item/BookSearchResultListItem";

import { useBookSearchParams } from "@/entities/book/hooks/useBookSearchParams";

export const BookSearchResults = () => {
  const { searchValue, searchType } = useBookSearchParams();

  const { books } = useBooks(searchValue, searchType);

  return (
    <>
      {books.length > 0 ? (
        <SearchResultList
          documents={books}
          renderItem={(document) => (
            <BookSearchResultListItem document={document} />
          )}
        />
      ) : (
        <SearchNoData className="w-full h-[400px]" />
      )}
    </>
  );
};
