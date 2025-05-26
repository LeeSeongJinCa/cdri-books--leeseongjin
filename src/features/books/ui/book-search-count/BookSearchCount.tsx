"use client";

import { useBooks } from "@/entities/book/hooks/useBooks";
import { SearchCountText } from "@/entities/search/ui/search-count-text/SearchCountText";

import { useBookSearchParams } from "@/entities/book/hooks/useBookSearchParams";

export const BookSearchCount = () => {
  const { searchValue, searchType } = useBookSearchParams();

  const { query } = useBooks(searchValue, searchType);

  const totalCount = query.data?.pages[0]?.data.meta.total_count ?? 0;

  return <SearchCountText title="도서 검색 결과" count={totalCount} />;
};
