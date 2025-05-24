"use client";

import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button/Button";
import { Search as SearchIcon } from "lucide-react";
import {
  useCallback,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

export interface SearchBarProps {
  title: string;

  value?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;

  enableSearchOnEnter?: boolean;
  onSearch?: (value: string) => void;
}

export const SearchBar = ({
  title,

  value,
  onChange,

  enableSearchOnEnter,
  onSearch,
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>(value ?? "");

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.currentTarget.value);
      onChange?.(event.currentTarget.value, event);
    },
    [onChange],
  );

  const handleSearch = useCallback(() => {
    onSearch?.(searchValue);
  }, [onSearch, searchValue]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && enableSearchOnEnter) {
        handleSearch();
      }
    },
    [enableSearchOnEnter, handleSearch],
  );

  return (
    <div className="flex flex-col w-full items-start justify-center gap-4">
      <p className="text-title2 text-text-title text-left">{title}</p>

      <div className="flex items-center gap-4 w-full">
        <label
          className={cn(
            "relative flex flex-grow gap-2.5 p-2.5 border border-gray-300 rounded-full bg-gray-100",
            "focus-within:border-blue-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue",
          )}
        >
          <SearchIcon className="h-[30px] w-[30px]" aria-hidden="true" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full text-caption text-text-subtitle placeholder-text-subtitle focus:outline-none"
            value={value ?? searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </label>

        <Button
          variant="outline"
          className={cn(
            "w-[72px] h-[36px] p-0 border border-text-subtitle bg-white text-body2 text-text-subtitle",
            "hover:bg-gray-100 focus:ring-gray-400",
          )}
          onClick={handleSearch}
        >
          상세검색
        </Button>
      </div>
    </div>
  );
};
