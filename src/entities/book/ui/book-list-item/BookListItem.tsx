"use client";

import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button/Button";
import { Link } from "@/shared/ui/link/Link";
import { ChevronDown } from "lucide-react";
import type { ButtonHTMLAttributes, MouseEventHandler } from "react";
import { formatPrice } from "../../lib/format-price";
import { BookCover } from "../book-cover/BookCover";

interface BookListItemProps {
  id: string;
  url: string;
  cover: string;
  title: string;
  author: string;
  price: number;
  //
  onPurchase?: MouseEventHandler<HTMLButtonElement>;
  onExpandDetail?: MouseEventHandler<HTMLButtonElement>;
  //
  slotProps?: {
    detailButton?: ButtonHTMLAttributes<HTMLButtonElement>;
  };
}

export const BookListItem = ({
  id,
  url,
  cover,
  title,
  author,
  price,
  //
  onPurchase,
  onExpandDetail,
  //
  slotProps,
}: BookListItemProps) => {
  return (
    <div
      id={id}
      className={cn(
        "flex flex-col items-center gap-4 w-full p-4 border-b border-light-gray-100",
        "md:flex-row md:gap-12 md:pl-12",
      )}
    >
      <div className={cn("flex-1 flex flex-col gap-7 w-full", "xs:flex-row")}>
        {/* 책 표지 영역 */}
        <div
          className={cn(
            "relative flex-shrink-0 aspect-[3/4] w-full max-w-full mx-auto",
            "xs:w-[48px] xs:h-[68px]",
          )}
        >
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <BookCover
              src={cover}
              alt={`${title} 책 표지`}
              fill
              sizes="(max-width: 640px) 100vw, 100px"
              className="rounded-md shadow-md object-cover"
            />
          </Link>
        </div>

        {/* 책 정보 영역 */}
        <div
          className={cn(
            "flex flex-1 items-center justify-between flex-wrap gap-1 self-stretch",
            "xs:flex-nowrap",
          )}
        >
          <div className="flex items-center flex-wrap gap-4">
            <h3 className="text-title3 text-text-primary">{title}</h3>
            <p className="text-body2 text-text-secondary">{author}</p>
          </div>

          <p className="flex-shrink-0 text-title3 text-text-primary">
            {formatPrice(price)}원
          </p>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div
        className={cn(
          "flex flex-shrink-0 flex-row items-center flex-wrap gap-2 ml-auto",
        )}
      >
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            variant="primary"
            className="flex-1 flex-shrink-0"
            onClick={onPurchase}
          >
            구매하기
          </Button>
        </Link>
        <Button
          variant="secondary"
          className="flex-1 flex-shrink-0"
          onClick={onExpandDetail}
          {...slotProps?.detailButton}
        >
          상세보기
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};
