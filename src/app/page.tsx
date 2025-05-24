"use client";

import type { SearchType } from "@/entities/search/constants/SearchType";
import { DetailSearchPopover } from "@/entities/search/ui/detail-search-popover/DetailSearchPopover";
import { SearchBar } from "@/entities/search/ui/search-bar/SearchBar";
import { SearchCountText } from "@/entities/search/ui/search-count-text/SearchCountText";
import { SearchNoData } from "@/entities/search/ui/search-no-data/SearchNoData";
import { cn } from "@/shared/lib/cn";
import { PublicHeader } from "@/widgets/ui/page-header/PublicHeader";
import { useState } from "react";

export default function Page() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = (keyword: string, type: SearchType) => {
    console.log("onSearch:", [keyword, type]);

    if (keyword.trim() === "") {
      return;
    }

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
    <div className="flex flex-col">
      <PublicHeader className="w-full max-w-[960px] mx-auto px-4" />

      <main className="flex-1 w-full max-w-[960px] mx-auto px-4 mt-25">
        <section className={cn("flex flex-col gap-4 mb-12")}>
          <p className="text-title2 text-text-primary text-left">도서 검색</p>

          <div className="flex items-center gap-4 w-full max-w-[480px]">
            <SearchBar
              history={history}
              value={searchValue}
              onChange={setSearchValue}
              onSearch={handleSearch}
              onDelete={handleDelete}
            />

            <DetailSearchPopover onSearch={handleSearch} />
          </div>

          <SearchCountText count={0} />
        </section>

        <section>
          <SearchNoData className="w-full h-[400px]" />
        </section>
      </main>
    </div>
  );
}
