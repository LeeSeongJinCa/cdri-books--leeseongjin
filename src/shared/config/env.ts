/**
 * 환경변수 설정 여부를 확인하고 반환합니다.
 *
 * 만약, 필수 환경변수가 설정되지 않았다면 에러를 발생시킵니다.
 */
const requiredEnv = [
  process.env.NEXT_PUBLIC_KAKAO_API_URL,
  process.env.NEXT_PUBLIC_KAKAO_API_KEY,
];

(() => {
  for (const env of requiredEnv) {
    if (!env) {
      throw new Error(`Missing required environment variable`);
    }
  }
})();

export const env = {
  NEXT_PUBLIC_KAKAO_API_URL: process.env.NEXT_PUBLIC_KAKAO_API_URL,
  NEXT_PUBLIC_KAKAO_API_KEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
};
