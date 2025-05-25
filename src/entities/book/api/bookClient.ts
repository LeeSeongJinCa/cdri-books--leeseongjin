import { client } from "@/shared/api/client";
import { API_ROUTES } from "@/shared/config/apiRoutes";
import type { ApiRequestOptions } from "@/shared/types/common";
import type { BookApiRequestQueryParams, BookApiResponse } from "../model/type";

export const bookClient = {
  search: {
    books: ({
      queryParams,
    }: ApiRequestOptions<undefined, undefined, BookApiRequestQueryParams>) =>
      client.get<BookApiResponse>(API_ROUTES.BOOK.SEARCH, {
        params: queryParams,
      }),
  },
};
