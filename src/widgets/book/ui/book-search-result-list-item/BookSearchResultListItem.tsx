"use client";

import type { BookApiResponseDocument } from "@/entities/book/model/type";
import { BookListItemDetail } from "@/entities/book/ui/book-list-item-detail/BookListItemDetail";
import { BookListItem } from "@/entities/book/ui/book-list-item/BookListItem";
import { memo, useState } from "react";

export const BookSearchResultListItem = memo(
  ({ document }: { document: BookApiResponseDocument }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
      setIsExpanded((prev) => !prev);
    };

    const renderItem = isExpanded ? (
      <BookListItemDetail
        url={document.url}
        cover={document.thumbnail}
        title={document.title}
        author={document.authors.join(", ")}
        description={document.contents}
        originalPrice={document.price}
        discountedPrice={document.sale_price}
        isLiked={false}
        onCollapseDetail={toggleExpanded}
      />
    ) : (
      <BookListItem
        url={document.url}
        cover={document.thumbnail}
        title={document.title}
        author={document.authors.join(", ")}
        price={document.price}
        onExpandDetail={toggleExpanded}
      />
    );

    return <>{renderItem}</>;
  },
);

BookSearchResultListItem.displayName = "SearchResultListItem";
