import type { SearchType } from "@/entities/search/constants/SearchType";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { bookClient } from "../api/bookClient";

export const useBooks = (searchValue: string, searchType: SearchType) => {
  const query = useQuery({
    queryKey: ["books", searchValue, searchType],
    queryFn: () =>
      bookClient.search.books({
        queryParams: {
          query: searchValue,
          target: searchType,
          // TODO: Pagination 추가하기
          // 현재는 첫 페이지의 10개 아이템만 가져옴
          page: 1,
          size: 10,
        },
      }),
  });

  const books = useMemo(
    () => query.data?.data.documents ?? [],
    [query.data?.data.documents],
  );

  return {
    query,
    books,
  };
};
