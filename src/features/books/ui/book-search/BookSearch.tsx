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
import type { FormEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { useSearchHistory } from "../../hooks/useSearchHistory";

export const BookSearch = () => {
  const router = useRouter();
  const { searchValue, searchType } = useBookSearchParams();

  const enterSourceInputRef = useRef<null | "main" | "detail">(null);
  const [inputValue, setInputValue] = useState<string>(searchValue);

  const [detailInputValue, setDetailInputValue] = useState<string>("");
  const [detailInputType, setDetailInputType] =
    useState<SearchType>(searchType);

  const { history, addHistory, deleteHistory } = useSearchHistory();

  const handleSearch = useCallback(
    (query: string, target: SearchType) => {
      if (query.trim() !== "") {
        addHistory(query);
      }

      router.push(`${ROUTES.HOME}?query=${query}&target=${target}`);
    },
    [router, addHistory],
  );

  const handleDelete = useCallback(
    (keyword: string) => {
      deleteHistory(keyword);
    },
    [deleteHistory],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (enterSourceInputRef.current === "detail") {
        // DetailSearchPopover에서 호출됨

        // 전체 검색과 상세 검색은 동시에 진행 불가
        setInputValue("");

        handleSearch(detailInputValue, detailInputType);
      } else if (enterSourceInputRef.current === "main") {
        // SearchBar에서 호출됨

        // 전체 검색과 상세 검색은 동시에 진행 불가
        setDetailInputValue("");
        setDetailInputType(SEARCH_TYPES.TITLE);

        handleSearch(inputValue, SEARCH_TYPES.TITLE);
      }
    },
    [inputValue, detailInputValue, detailInputType, handleSearch],
  );

  return (
    <form
      className="flex items-center gap-4 w-full max-w-[480px]"
      onSubmit={handleSubmit}
    >
      <SearchBar
        history={history}
        value={inputValue}
        onChange={setInputValue}
        onEnter={() => {
          enterSourceInputRef.current = "main";
        }}
        onHistoryClick={(keyword) => {
          // 전체 검색과 상세 검색은 동시에 진행 불가
          setInputValue(keyword);
          setDetailInputValue("");
          setDetailInputType(SEARCH_TYPES.TITLE);

          handleSearch(keyword, SEARCH_TYPES.TITLE);
        }}
        onDelete={handleDelete}
      />

      <DetailSearchPopover
        value={detailInputValue}
        onChange={setDetailInputValue}
        onEnter={() => {
          enterSourceInputRef.current = "detail";
        }}
        type={detailInputType}
        onTypeChange={setDetailInputType}
      />
    </form>
  );
};
