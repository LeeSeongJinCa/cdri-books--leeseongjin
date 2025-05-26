"use client";

import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button/Button";
import { Input } from "@/shared/ui/input/Input";
import { Search as SearchIcon, X } from "lucide-react";
import {
  useCallback,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

export interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;

  enableSearchOnEnter?: boolean;
  onEnter?: (value: string) => void;

  history?: string[];
  onHistoryClick?: (value: string) => void;
  onDelete?: (value: string) => void;
}

export const SearchBar = ({
  value,
  placeholder = "검색어를 입력하세요",
  onChange,

  enableSearchOnEnter = true,
  onEnter,

  history,
  onHistoryClick,
  onDelete,
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>(value ?? "");
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState<number>(-1);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const currentValue = event.currentTarget.value;

      setSearchValue(currentValue);
      onChange?.(currentValue, event);
    },
    [onChange],
  );

  const handleHistoryItemClick = useCallback(
    (keyword: string) => {
      setSearchValue(keyword);
      setSelectedHistoryIndex(-1); // 선택 해제
      onHistoryClick?.(keyword);
    },
    [onHistoryClick],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      /**
       * 한글 입력 시, KeyDown 이벤트 중복 발생 현상이 있음
       * isComposing 속성을 통해 한글 입력 시 중복 이벤트 방지
       *
       * @see https://velog.io/@dosomething/React-%ED%95%9C%EA%B8%80-%EC%9E%85%EB%A0%A5%EC%8B%9C-keydown-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%A4%91%EB%B3%B5-%EB%B0%9C%EC%83%9D-%ED%98%84%EC%83%81
       */
      if (event.nativeEvent.isComposing) return;

      const historyLength = history?.length ?? 0;

      switch (event.key) {
        case "ArrowDown":
          if (historyLength > 0) {
            event.preventDefault();
            setSelectedHistoryIndex((prev) =>
              prev < historyLength - 1 ? prev + 1 : prev,
            );
          }
          break;
        case "ArrowUp":
          if (historyLength > 0) {
            event.preventDefault();
            setSelectedHistoryIndex((prev) => (prev > -1 ? prev - 1 : -1));
          }
          break;
        case "Enter": {
          const isHistoryClick =
            selectedHistoryIndex >= 0 &&
            history &&
            history[selectedHistoryIndex];

          if (isHistoryClick) {
            // 히스토리 아이템이 선택된 상태에서 Enter
            event.preventDefault();
            const selectedKeyword = history[selectedHistoryIndex];
            handleHistoryItemClick(selectedKeyword);
          } else if (enableSearchOnEnter) {
            // 일반 검색
            const currentValue = event.currentTarget.value;
            onEnter?.(currentValue);
          }
          break;
        }
        case "Escape":
          // 히스토리 선택 해제
          setSelectedHistoryIndex(-1);
          break;
        default:
          // 다른 키 입력 시 히스토리 선택 해제
          if (selectedHistoryIndex >= 0) {
            setSelectedHistoryIndex(-1);
          }
          break;
      }
    },
    [
      enableSearchOnEnter,
      onEnter,
      history,
      selectedHistoryIndex,
      handleHistoryItemClick,
    ],
  );

  const handleDelete = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const currentValue = event.currentTarget.value;
      onDelete?.(currentValue);
      event.stopPropagation();
    },
    [onDelete],
  );

  const hasHistory = history && history.length > 0;

  return (
    <div
      className={cn(
        "SearchBar-root",
        "flex flex-col w-full items-start justify-center gap-4",
      )}
    >
      <div
        className={cn(
          "SearchBar-inputContainer",
          "group relative",
          "flex flex-col flex-grow w-full",
          hasHistory && "rounded-3xl rounded-bl-none rounded-br-none",
        )}
      >
        <label
          htmlFor="main-search-input"
          className={cn(
            "SearchBar-label",
            "relative flex flex-grow gap-2.5 p-2.5 bg-light-gray",
            "border border-gray-300 rounded-3xl",
            "group-focus-within:ring-0 group-focus-within:border-blue-500 group-focus-within:outline-none",
            hasHistory &&
              "group-focus-within:rounded-t-3xl group-focus-within:rounded-b-none group-focus-within:border-b-0 group-focus-within:border-b-transparent",
          )}
        >
          <SearchIcon
            className="h-[30px] w-[30px] text-text-secondary"
            aria-hidden="true"
          />
          <Input
            id="main-search-input"
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            role="combobox"
            aria-expanded={hasHistory}
            aria-controls="search-history-list"
            aria-activedescendant={
              hasHistory &&
              selectedHistoryIndex >= 0 &&
              history[selectedHistoryIndex]
                ? `history-item-${selectedHistoryIndex}`
                : undefined
            }
            className={cn(
              "SearchBar-input",
              "w-full p-0 text-caption text-text-primary placeholder-text-subtitle bg-transparent border-0 outline-none shadow-none focus-within:ring-0",
            )}
            value={value ?? searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              // 포커스를 잃을 때 히스토리 선택 해제 (약간의 지연을 두어 클릭 이벤트가 먼저 처리되도록)
              setTimeout(() => setSelectedHistoryIndex(-1), 150);
            }}
          />
        </label>
        {hasHistory && (
          <ul
            id="search-history-list"
            role="listbox"
            aria-label="검색 기록"
            className={cn(
              "SearchBar-history-list",
              "absolute top-full left-0 right-0 z-20",
              "hidden p-2.5 border border-gray-300 border-t-0 rounded-b-3xl bg-light-gray shadow-lg",
              "group-focus-within:flex group-focus-within:flex-col group-focus-within:gap-2 group-focus-within:border-l-blue-500 group-focus-within:border-r-blue-500 group-focus-within:border-b-blue-500 group-focus-within:border-t-transparent",
            )}
          >
            {history.map((keyword, index) => (
              <li
                key={keyword}
                id={`history-item-${index}`}
                role="option"
                aria-selected={selectedHistoryIndex === index}
                className={cn(
                  "SearchBar-history-item",
                  "flex items-center justify-between text-text-subtitle",
                )}
              >
                <button
                  type="button"
                  className={cn(
                    "flex-grow flex items-center justify-between py-1.5 px-2.5 rounded text-left cursor-pointer",
                    "hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500",
                    selectedHistoryIndex === index &&
                      "bg-blue-100 text-blue-900",
                  )}
                  onClick={() => handleHistoryItemClick(keyword)}
                  aria-label={`최근 검색어 ${keyword}를 다시 검색`}
                >
                  <span className="text-text-primary">{keyword}</span>
                </button>
                <Button
                  variant="ghost"
                  value={keyword}
                  className="h-6 w-6 p-0 text-black hover:bg-gray-200 flex-shrink-0 ml-2"
                  onClick={handleDelete}
                  aria-label={`최근 검색어 ${keyword} 삭제`}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
