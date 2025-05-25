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

export type Params = Record<string, string | number | boolean | undefined>;

// --------------------------------------------------
// API 타입

/** API 요청 시 사용되는 옵션 타입 (body, pathParams, queryParams) */
export type ApiRequestOptions<
  _Body = undefined,
  _PathParams extends Params | undefined = undefined,
  _QueryParams extends Params | undefined = undefined,
> = (_Body extends undefined
  ? { body?: Record<string, unknown> }
  : { body: _Body }) &
  (_PathParams extends undefined
    ? { pathParams?: Params }
    : { pathParams: _PathParams }) &
  (_QueryParams extends undefined
    ? { queryParams?: Params }
    : { queryParams: _QueryParams });

/** API 응답의 meta 정보를 담는 인터페이스 */
export interface ApiResponseMeta {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
}

/** API 응답의 documents 정보를 담는 기본 인터페이스 */
export interface ApiResponseDocument {
  title: string; // 찾아보니 1개 API 제외하고는 모두 존재하여 일단은 필수로 추가함
  datetime: Datetime;
}

/** API 응답의 전체 구조를 정의하는 제네릭 인터페이스 */
export interface ApiResponse<
  M extends ApiResponseMeta,
  D extends ApiResponseDocument,
> {
  meta: M;
  documents: D[];
}
