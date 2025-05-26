import { cn } from "@/shared/lib/cn";
import { CloudAlert } from "lucide-react";
import type { HTMLAttributes } from "react";

export type SearchErrorProps = HTMLAttributes<HTMLDivElement>;

export const SearchError = ({ className, ...props }: SearchErrorProps) => {
  return (
    <div
      className={cn(
        "SearchError-root",
        "flex flex-col items-center justify-center gap-6",
        className,
      )}
      {...props}
    >
      <div className="w-[80px] h-[80px]">
        <CloudAlert className="w-full h-full text-red" aria-hidden="true" />
      </div>

      <div className="text-center text-caption text-text-secondary">
        에러가 발생했습니다. 잠시후 다시 시도해주세요.
      </div>
    </div>
  );
};
