export interface SearchCountTextProps {
  title: string;
  count: number;
}

export const SearchCountText = ({ title, count }: SearchCountTextProps) => {
  return (
    <p
      className="flex gap-4 text-subtitle1 text-text-primary"
      aria-live="polite"
      aria-atomic="true"
    >
      <span>{title}</span>
      <span>
        총 <span className="text-primary">{count}</span>건
      </span>
    </p>
  );
};
