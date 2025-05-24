export interface Option<T> {
  value: T;
  label: string;
}

/**
 * ISO 8601 형식
 *
 * [YYYY]-[MM]-[DD]T[hh]:[mm]:[ss].000+[tz]
 */
export type Datetime = string;

export interface ApiResponseMeta {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
}

export interface ApiResponseDocument {
  title: string; // 찾아보니 1개 API 제외하고는 모두 존재하여 일단은 필수로 추가함
  datetime: Datetime;
}

export interface ApiResponse<
  M extends ApiResponseMeta,
  D extends ApiResponseDocument,
> {
  meta: M;
  documents: D;
}
