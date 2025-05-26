"use client";

import type { BookApiResponseDocument } from "@/entities/book/model/type";
import { BookListItemDetail } from "@/entities/book/ui/book-list-item-detail/BookListItemDetail";
import { BookListItem } from "@/entities/book/ui/book-list-item/BookListItem";
import { memo, useCallback, useId, useState } from "react";

export interface BookSearchResultListItemProps {
  document: BookApiResponseDocument;
  isLiked?: boolean;
  onLike?: () => void;
}

export const BookSearchResultListItem = memo(
  ({ document, isLiked = false, onLike }: BookSearchResultListItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = useCallback(
      () => setIsExpanded((prev) => !prev),
      [],
    );

    const detailButtonId = useId();
    const detailButtonProps = {
      "aria-expanded": isExpanded,
      "aria-controls": detailButtonId,
    };
    const renderItem = isExpanded ? (
      <BookListItemDetail
        id={detailButtonId}
        url={document.url}
        cover={document.thumbnail}
        title={document.title}
        author={document.authors.join(", ")}
        description={document.contents}
        originalPrice={document.price}
        discountedPrice={document.sale_price}
        onCollapseDetail={toggleExpanded}
        isLiked={isLiked}
        onLike={onLike}
        //
        slotProps={{
          detailButton: detailButtonProps,
        }}
      />
    ) : (
      <BookListItem
        id={detailButtonId}
        url={document.url}
        cover={document.thumbnail}
        title={document.title}
        author={document.authors.join(", ")}
        price={document.price}
        onExpandDetail={toggleExpanded}
        //
        slotProps={{
          detailButton: detailButtonProps,
        }}
      />
    );

    return <div data-testid={`book-item-${document.isbn}`}>{renderItem}</div>;
  },
);

BookSearchResultListItem.displayName = "SearchResultListItem";
