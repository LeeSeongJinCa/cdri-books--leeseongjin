import axios from "axios";
import { env } from "../config/env";

/**
 * axios.interceptors.request.use(...) 메서드로도 요청을 가로채 Header에 Authorization을 삽입할 수 있음
 * 그러나, 지금은 Authorization이 고정이기 때문에 불필요한 코드가 되기 때문에 default.common 에 직접 삽입함
 *
 * 만약, 특정 요청에 대해서만 인터셉터를 적용하고 싶다면,
 *
 * client.interceptors.request.use((config) => {
 *  config.headers.Authorization = `KakaoAK ${env.NEXT_PUBLIC_KAKAO_API_KEY}`;
 *  return config;
 * });
 */

axios.defaults.headers.common["Authorization"] =
  `KakaoAK ${env.NEXT_PUBLIC_KAKAO_API_KEY}`;

export const client = axios.create({
  baseURL: env.NEXT_PUBLIC_KAKAO_API_URL,
});
