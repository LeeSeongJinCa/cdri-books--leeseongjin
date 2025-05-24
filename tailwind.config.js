/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // pages router도 고려 (선택 사항)
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // 기존 경로도 유지 (만약 다른 곳에 HTML이 있다면)
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
