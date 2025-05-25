import { cn } from "@/shared/lib/cn";
import Image from "next/image";
import type { HTMLAttributes } from "react";
import emptySearchResult from "../../assets/icon_book.png";

export type SearchNoDataProps = HTMLAttributes<HTMLDivElement>;

export const SearchNoData = ({ className, ...props }: SearchNoDataProps) => {
  return (
    <div
      className={cn(
        "SearchNoData-root",
        "flex flex-col items-center justify-center gap-6",
        className,
      )}
      {...props}
    >
      <div className="w-[80px] h-[80px]">
        <Image
          src={emptySearchResult}
          alt="책 아이콘"
          width={80}
          height={80}
          className="w-full h-full"
        />
      </div>

      <div className="text-center text-caption text-text-secondary">
        검색된 결과가 없습니다.
      </div>
    </div>
  );
};
