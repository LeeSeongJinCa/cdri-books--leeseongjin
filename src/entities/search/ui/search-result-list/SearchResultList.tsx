import { cn } from "@/shared/lib/cn";
import type { ApiResponseDocument } from "@/shared/types/common";
import type { ReactNode } from "react";

export interface SearchResultListProps<T extends ApiResponseDocument> {
  documents: T[];
  renderItem: (document: T) => ReactNode;
}

export const SearchResultList = <T extends ApiResponseDocument>({
  documents,
  renderItem,
}: SearchResultListProps<T>) => {
  return (
    <ul className={cn("SearchResultList", "flex flex-col")}>
      {documents.map((document) => (
        <li key={document.title} className="SearchResultList-item w-full">
          {renderItem(document)}
        </li>
      ))}
    </ul>
  );
};
