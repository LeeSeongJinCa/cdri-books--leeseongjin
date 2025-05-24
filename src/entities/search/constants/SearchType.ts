import type { Option } from "@/shared/types/common";

export const SEARCH_TYPES = {
  TITLE: "title",
  AUTHOR: "author",
  PUBLISHER: "publisher",
} as const;

export const SEARCH_TYPES_OPTIONS: Option<SearchType>[] = [
  {
    value: SEARCH_TYPES.TITLE,
    label: "제목",
  },
  {
    value: SEARCH_TYPES.AUTHOR,
    label: "저자명",
  },
  {
    value: SEARCH_TYPES.PUBLISHER,
    label: "출판사",
  },
];

export type SearchType = (typeof SEARCH_TYPES)[keyof typeof SEARCH_TYPES];
