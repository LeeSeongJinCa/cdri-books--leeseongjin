import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { bookClient } from "../api/bookClient";

export const useBooks = (queryString: string) => {
  const query = useQuery({
    queryKey: ["books", queryString],
    queryFn: () =>
      bookClient.search.books({
        queryParams: {
          query: queryString,
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
