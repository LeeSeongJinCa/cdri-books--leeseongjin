"use client";

import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button/Button";
import { Input } from "@/shared/ui/input/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/Select";
import type { ChangeEvent } from "react";
import {
  useCallback,
  useState,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import type { SearchType } from "../../constants/SearchType";
import { SEARCH_TYPES, SEARCH_TYPES_OPTIONS } from "../../constants/SearchType";

export interface DetailSearchPopoverProps {
  initialSearchType?: SearchType;
  initialSearchValue?: string;
  onSearch?: (value: string, searchType: SearchType) => void;
  triggerButton?: ReactElement;
}

export const DetailSearchPopover = ({
  onSearch,
  initialSearchType = SEARCH_TYPES.TITLE,
  initialSearchValue = "",
  triggerButton,
}: DetailSearchPopoverProps) => {
  const [searchType, setSearchType] = useState<SearchType>(initialSearchType);
  const [searchValue, setSearchValue] = useState<string>(initialSearchValue);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSearch = useCallback(() => {
    onSearch?.(searchValue, searchType);
    setSearchValue("");
    setIsPopoverOpen(false);
  }, [searchValue, searchType, onSearch, setIsPopoverOpen]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const currentValue = event.currentTarget.value;

      setSearchValue(currentValue);
    },
    [setSearchValue],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch],
  );

  const defaultTrigger = (
    <Button
      variant="outline"
      className={cn(
        "w-[72px] h-[36px] p-1 border border-text-subtitle bg-white text-body2 text-text-subtitle",
        "hover:bg-gray-100 focus:ring-gray-400",
      )}
    >
      상세검색
    </Button>
  );

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>{triggerButton ?? defaultTrigger}</PopoverTrigger>
      <PopoverContent className="w-90 px-6 py-9 border-0 bg-white shadow-md rounded-lg">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <div className="flex-[0.5_1_0%]">
              <Select
                value={searchType}
                onValueChange={(value) => setSearchType(value as SearchType)}
              >
                <SelectTrigger className="w-full h-10 border border-gray-300 rounded-md shadow-none cursor-pointer bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="유형 선택" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300 shadow-lg rounded-md">
                  {SEARCH_TYPES_OPTIONS.map(({ value, label }) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className={cn(
                        "cursor-pointer p-2 hover:bg-light-gray text-text-primary",
                        searchType === value && "bg-light-gray font-semibold",
                      )}
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Input
                className={cn(
                  "h-10 w-full border border-gray-300 rounded-md shadow-none px-3",
                  "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-text-primary placeholder-text-subtitle",
                )}
                placeholder="검색어 입력"
                value={searchValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <Button
            className="w-full bg-primary hover:bg-primary-dark text-white h-10 rounded-md text-base font-medium"
            onClick={handleSearch}
          >
            검색하기
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
