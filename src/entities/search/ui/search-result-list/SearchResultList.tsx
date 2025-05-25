import { cn } from "@/shared/lib/cn";
import type { ApiResponseDocument } from "@/shared/types/common";
import { Button } from "@/shared/ui/button/Button";
import { type Key, type ReactNode } from "react";

export interface SearchResultListProps<T extends ApiResponseDocument> {
  keySelector: (document: T) => Key;
  documents: T[];
  renderItem: (document: T) => ReactNode;
  //
  enableMore?: boolean;
  isFetchingMore?: boolean;
  hasMore?: boolean;
  onMore?: () => void;
}

export const SearchResultList = <T extends ApiResponseDocument>({
  keySelector,
  documents,
  renderItem,
  //
  enableMore = false,
  isFetchingMore = false,
  hasMore = false,
  onMore,
}: SearchResultListProps<T>) => {
  return (
    <>
      <ul
        className={cn("SearchResultList", "flex flex-col")}
        aria-live="polite"
        aria-relevant="additions text"
      >
        {documents.map((document) => (
          <li
            key={keySelector(document)}
            className={cn("SearchResultList-item", "w-full")}
          >
            {renderItem(document)}
          </li>
        ))}
      </ul>

      {enableMore && hasMore && (
        <Button
          className={cn(
            "SearchResultList-more",
            "w-full mt-12 bg-gray-800",
            "hover:bg-gray-800/90 focus:ring-gray-800",
          )}
          isLoading={isFetchingMore}
          onClick={onMore}
          aria-busy={isFetchingMore}
        >
          더보기
        </Button>
      )}
    </>
  );
};
