"use client";

import { useBookSearchParams } from "@/entities/book/hooks/useBookSearchParams";
import {
  SEARCH_TYPES,
  type SearchType,
} from "@/entities/search/constants/SearchType";
import { DetailSearchPopover } from "@/entities/search/ui/detail-search-popover/DetailSearchPopover";
import { SearchBar } from "@/entities/search/ui/search-bar/SearchBar";
import { ROUTES } from "@/shared/config/routes";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useSearchHistory } from "../../hooks/useSearchHistory";

export const BookSearch = () => {
  const router = useRouter();
  const { searchValue, searchType } = useBookSearchParams();

  const [inputValue, setInputValue] = useState<string>(searchValue);

  const [detailInputValue, setDetailInputValue] = useState<string>("");
  const [detailInputType, setDetailInputType] =
    useState<SearchType>(searchType);

  const { history, addHistory, deleteHistory } = useSearchHistory();

  const handleSearch = useCallback(
    (keyword: string) => {
      if (keyword.trim() === "") {
        return;
      }

      // 전체 검색과 상세 검색은 동시에 진행 불가
      setDetailInputValue("");
      setDetailInputType(SEARCH_TYPES.TITLE);

      addHistory(keyword);

      router.push(
        `${ROUTES.HOME}?query=${keyword}&target=${SEARCH_TYPES.TITLE}`,
      );
    },
    [router, addHistory],
  );

  const handleDetailSearch = useCallback(
    (keyword: string, type: SearchType) => {
      if (keyword.trim() === "") {
        return;
      }

      // 전체 검색과 상세 검색은 동시에 진행 불가
      setInputValue("");

      addHistory(keyword);

      router.push(`${ROUTES.HOME}?query=${keyword}&target=${type}`);
    },
    [router, addHistory],
  );

  const handleDelete = useCallback(
    (keyword: string) => {
      deleteHistory(keyword);
    },
    [deleteHistory],
  );

  return (
    <>
      <SearchBar
        history={history}
        value={inputValue}
        onChange={setInputValue}
        onSearch={handleSearch}
        onDelete={handleDelete}
      />

      <DetailSearchPopover
        value={detailInputValue}
        onChange={setDetailInputValue}
        type={detailInputType}
        onTypeChange={setDetailInputType}
        onSearch={handleDetailSearch}
      />
    </>
  );
};
