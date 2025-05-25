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

export const BookSearch = () => {
  const router = useRouter();
  const { searchValue, searchType } = useBookSearchParams();

  const [inputValue, setInputValue] = useState<string>(searchValue);
  const [detailInputValue, setDetailInputValue] = useState<string>("");
  const [detailInputType, setDetailInputType] =
    useState<SearchType>(searchType);

  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = useCallback(
    (keyword: string) => {
      if (keyword.trim() === "") {
        return;
      }

      // 전체 검색과 상세 검색은 동시에 진행 불가
      setDetailInputValue("");
      setDetailInputType(SEARCH_TYPES.TITLE);

      setHistory((prev) => {
        const newHistory = [keyword, ...prev];
        return newHistory.slice(0, 5);
      });

      router.push(
        `${ROUTES.HOME}?query=${keyword}&target=${SEARCH_TYPES.TITLE}`,
      );
    },
    [router],
  );

  const handleDetailSearch = useCallback(
    (keyword: string, type: SearchType) => {
      if (keyword.trim() === "") {
        return;
      }

      // 전체 검색과 상세 검색은 동시에 진행 불가
      setInputValue("");

      setHistory((prev) => {
        const newHistory = [keyword, ...prev];
        return newHistory.slice(0, 5);
      });

      router.push(`${ROUTES.HOME}?query=${keyword}&target=${type}`);
    },
    [router],
  );

  const handleDelete = useCallback((index: number) => {
    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.splice(index, 1);
      return newHistory;
    });
  }, []);

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
