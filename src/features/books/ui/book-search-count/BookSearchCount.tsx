"use client";

import { useBooks } from "@/entities/book/hooks/useBooks";
import { SearchCountText } from "@/entities/search/ui/search-count-text/SearchCountText";

import { useBookSearchParams } from "@/entities/book/hooks/useBookSearchParams";

export const BookSearchCount = () => {
  const { searchValue, searchType } = useBookSearchParams();

  const { books } = useBooks(searchValue, searchType);

  return <SearchCountText title="도서 검색 결과" count={books.length} />;
};
