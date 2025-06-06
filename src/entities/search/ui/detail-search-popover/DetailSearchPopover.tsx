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
import type { ChangeEvent, ReactNode } from "react";
import { useCallback, useState, type KeyboardEvent } from "react";
import type { SearchType } from "../../constants/SearchType";
import { SEARCH_TYPES, SEARCH_TYPES_OPTIONS } from "../../constants/SearchType";

export interface DetailSearchPopoverProps {
  triggerButton?: ReactNode;

  value?: string;
  onChange?: (value: string) => void;

  type?: SearchType;
  onTypeChange?: (value: SearchType) => void;

  enableSearchOnEnter?: boolean;
  onEnter?: (value: string, searchType: SearchType) => void;
}

export const DetailSearchPopover = ({
  triggerButton,

  value,
  onChange,

  type,
  onTypeChange,

  enableSearchOnEnter = true,
  onEnter,
}: DetailSearchPopoverProps) => {
  const [searchValue, setSearchValue] = useState<string>(value ?? "");
  const [searchType, setSearchType] = useState<SearchType>(
    type ?? SEARCH_TYPES.TITLE,
  );

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSearch = useCallback(() => {
    onEnter?.(searchValue, searchType);
    setIsPopoverOpen(false);
  }, [searchValue, searchType, onEnter]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const currentValue = event.currentTarget.value;

      setSearchValue(currentValue);
      onChange?.(currentValue);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.nativeEvent.isComposing) return;

      if (event.key === "Enter" && enableSearchOnEnter) {
        /**
         * 한글 입력 시, KeyDown 이벤트 중복 발생 현상이 있음
         * isComposing 속성을 통해 한글 입력 시 중복 이벤트 방지
         *
         * @see https://velog.io/@dosomething/React-%ED%95%9C%EA%B8%80-%EC%9E%85%EB%A0%A5%EC%8B%9C-keydown-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%A4%91%EB%B3%B5-%EB%B0%9C%EC%83%9D-%ED%98%84%EC%83%81
         */
        handleSearch();
      }
    },
    [enableSearchOnEnter, handleSearch],
  );

  const handleSelectType = useCallback(
    (value: SearchType) => {
      setSearchType(value);
      onTypeChange?.(value);
    },
    [onTypeChange],
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
      <PopoverContent
        disablePortal
        className="w-90 px-6 py-9 border-0 bg-white shadow-md rounded-lg"
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <div className="flex-[0.5_1_0%]">
              <Select
                value={type ?? searchType}
                onValueChange={handleSelectType}
                aria-label="검색 유형 선택"
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
                        searchType === value && "hidden",
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
                aria-label="상세 검색어 입력"
                value={value ?? searchValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <Button
            type="submit"
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
