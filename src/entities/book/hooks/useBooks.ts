import type { SearchType } from "@/entities/search/constants/SearchType";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { bookClient } from "../api/bookClient";

// 10개로 고정, 추후 가져오는 개수도 변경할 수 있게 제공하면 좋음
const SIZE = 10;

export const useBooks = (searchValue: string, searchType: SearchType) => {
  const query = useInfiniteQuery({
    queryKey: ["books2", searchValue, searchType],
    queryFn: ({ pageParam = 1 }) =>
      bookClient.search.books({
        queryParams: {
          query: searchValue,
          target: searchType,
          page: pageParam,
          size: SIZE,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.meta.is_end) return undefined;
      return pages.length + 1;
    },
  });

  const books = useMemo(
    () => query.data?.pages.flatMap((page) => page.data.documents) ?? [],
    [query.data?.pages],
  );

  return {
    query,
    books,
  };
};
