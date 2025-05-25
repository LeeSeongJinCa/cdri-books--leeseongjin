import { QueryProvider } from "@/core/react-query/QueryProvider";
import "@/core/styles/globals.css";
import { PublicLayout } from "@/widgets/layout/ui/page-layout/PublicLayout";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "도서 검색 | CDRI - 도서 검색 서비스",
  description:
    "CDRI에서 제공하는 도서 검색 서비스입니다. 원하는 도서를 검색하고 찜하기 기능을 통해 관심있는 도서를 저장할 수 있습니다.",
};

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="ko" className={notoSansKR.className}>
      <body>
        <QueryProvider>
          <PublicLayout>{children}</PublicLayout>
        </QueryProvider>
      </body>
    </html>
  );
}

// TODO: SEO 개선하기
// TODO: 페이지 성능 개선하기
