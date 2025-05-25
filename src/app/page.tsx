"use client";

import { useBooks } from "@/entities/book/hooks/useBooks";
import type { SearchType } from "@/entities/search/constants/SearchType";
import { DetailSearchPopover } from "@/entities/search/ui/detail-search-popover/DetailSearchPopover";
import { SearchBar } from "@/entities/search/ui/search-bar/SearchBar";
import { SearchCountText } from "@/entities/search/ui/search-count-text/SearchCountText";
import { SearchNoData } from "@/entities/search/ui/search-no-data/SearchNoData";
import { SearchResultList } from "@/entities/search/ui/search-result-list/SearchResultList";
import { cn } from "@/shared/lib/cn";
import { BookSearchResultListItem } from "@/widgets/book/ui/book-search-result-list-item/BookSearchResultListItem";
import { useState } from "react";

export default function Page() {
  const [value, setValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  const { books } = useBooks(searchValue);

  const handleSearch = (keyword: string, type: SearchType) => {
    console.log("onSearch:", [keyword, type]);

    if (keyword.trim() === "") {
      return;
    }

    setValue(keyword);
    setSearchValue(keyword);
    setHistory((prev) => {
      const newHistory = [keyword, ...prev];
      return newHistory.slice(0, 5);
    });
  };

  const handleDelete = (index: number) => {
    console.log("onDelete:", index);

    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.splice(index, 1);
      return newHistory;
    });
  };

  return (
    <>
      <section className={cn("flex flex-col gap-4 mb-12")}>
        <p className="text-title2 text-text-primary text-left">도서 검색</p>

        <div className="flex items-center gap-4 w-full max-w-[480px]">
          <SearchBar
            history={history}
            value={value}
            onChange={setValue}
            onSearch={handleSearch}
            onDelete={handleDelete}
          />

          <DetailSearchPopover onSearch={handleSearch} />
        </div>

        <SearchCountText title="도서 검색 결과" count={books.length} />
      </section>

      <section>
        {books.length > 0 ? (
          <SearchResultList
            documents={books}
            renderItem={(document) => (
              <BookSearchResultListItem document={document} />
            )}
          />
        ) : (
          <SearchNoData className="w-full h-[400px]" />
        )}
      </section>
    </>
  );
}
