import Image from "next/image";
import emptySearchResult from "../../assets/icon_book.png";

export const SearchNoData = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
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
