import type { SearchType } from "@/entities/search/constants/SearchType";
import { SEARCH_TYPES } from "@/entities/search/constants/SearchType";
import { useSearchParams } from "next/navigation";

export const useBookSearchParams = () => {
  const searchParams = useSearchParams();
  const searchValue = (searchParams.get("query") ?? "") as string;
  const searchType = (searchParams.get("target") ??
    SEARCH_TYPES.TITLE) as SearchType;

  return {
    searchValue,
    searchType,
  };
};
