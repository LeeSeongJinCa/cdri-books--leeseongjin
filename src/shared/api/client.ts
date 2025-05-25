import axios from "axios";
import { env } from "../config/env";

axios.defaults.headers.common["Authorization"] =
  `KakaoAK ${env.NEXT_PUBLIC_KAKAO_API_KEY}`;

export const client = axios.create({
  baseURL: env.NEXT_PUBLIC_KAKAO_API_URL,
});
