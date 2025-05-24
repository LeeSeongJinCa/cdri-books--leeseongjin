export interface SearchCountTextProps {
  count: number;
}

export const SearchCountText = ({ count }: SearchCountTextProps) => {
  return (
    <p className="flex gap-4 text-subtitle1 text-text-primary">
      <span>도서 검색 결과</span>
      <span>
        총 <span className="text-primary">{count}</span>건
      </span>
    </p>
  );
};
