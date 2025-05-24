"use client";

import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button/Button";
import { LikeIcon } from "@/shared/ui/icons/LikeIcon.svg";
import { LikeFillIcon } from "@/shared/ui/icons/LikeIconFill.svg";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "../../lib/format-price";

interface BookListItemDetailProps {
  cover: string;
  title: string;
  author: string;
  description: string;
  originalPrice: number; // 원가
  discountedPrice?: number; // 할인가
  isLiked?: boolean; // 찜 여부
  //
  onPurchase?: () => void;
  onCollapseDetail?: () => void;
  onLike?: () => void;
}

export const BookListItemDetail = ({
  cover: cover,
  title,
  author,
  description,
  originalPrice,
  discountedPrice,
  isLiked = false,
  //
  onPurchase,
  onCollapseDetail,
  onLike,
}: BookListItemDetailProps) => {
  return (
    <div
      className={cn(
        "w-full p-4 border-b border-b-[#D2D6DA]",
        "md:pt-6 md:pr-4 md:pb-10 md:pl-14",
      )}
    >
      <div className={cn("flex flex-col gap-6", "lg:flex-row lg:gap-12")}>
        <div className={cn("flex-1 flex flex-col gap-3", "sm:flex-row")}>
          {/* 표지 영역 */}
          <div
            className={cn(
              "relative flex-shrink-0 aspect-[3/4] w-full max-w-full mx-auto",
              "xs:w-[210px] xs:h-[280px]",
            )}
          >
            <div className="relative w-full h-full">
              <Image
                src={cover}
                alt={`${title} 책 표지`}
                fill
                className="rounded-md shadow-md object-cover"
              />
              <Button
                className={cn(
                  "absolute right-3 top-3 z-10 h-auto rounded-full bg-white/80 p-1.5 text-red-500 shadow-sm backdrop-blur-sm hover:bg-white",
                  "w-auto",
                )}
                // aria-label={isLiked ? "좋아요 취소" : "좋아요"}
                onClick={onLike}
              >
                {isLiked ? (
                  <LikeFillIcon className={`h-6 w-6`} />
                ) : (
                  <LikeIcon className={`h-6 w-6`} />
                )}
              </Button>
            </div>
          </div>

          {/* 책 정보 영역 */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-title3 text-text-primary">{title}</h1>
                <p className="text-body2 text-text-secondary">{author}</p>
              </div>

              <div className="flex flex-col justify-center gap-3">
                <h2 className="text-body2-bold text-text-primary">책 소개</h2>
                <p className="text-small text-text-primary whitespace-pre-line leading-[160%]">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div
          className={cn(
            "flex-1 flex-shrink-0 flex flex-col items-end justify-between gap-4",
            "lg:max-w-[240px]",
          )}
        >
          <div className="flex flex-col gap-2">
            <Button variant="secondary" onClick={onCollapseDetail}>
              상세보기
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-shrink-0 flex flex-col items-end gap-7 w-full">
            <div className="flex flex-col items-end text-right">
              <p className="flex items-center gap-2">
                <span className="text-small text-text-subtitle">원가</span>{" "}
                <span
                  className={cn(
                    "text-title3 font-[300] text-text-primary",
                    discountedPrice && "line-through",
                  )}
                >
                  {formatPrice(originalPrice)}원
                </span>
              </p>
              {discountedPrice && (
                <p className="flex items-center gap-2">
                  <span className="text-small text-text-subtitle">할인가</span>{" "}
                  <span className={cn("text-title3 text-text-primary")}>
                    {formatPrice(discountedPrice)}원
                  </span>
                </p>
              )}
            </div>

            <Button className={cn("w-full")} onClick={onPurchase}>
              구매하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
