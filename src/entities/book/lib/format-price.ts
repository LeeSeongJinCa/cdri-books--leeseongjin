const formatter = new Intl.NumberFormat(undefined, { style: "decimal" });

/**
 * 가격에 천 단위 콤마를 추가하는 함수
 *
 * @example
 * formatPrice(10000) // "10,000"
 */
export const formatPrice = (price: number) => {
  return formatter.format(price);
};
