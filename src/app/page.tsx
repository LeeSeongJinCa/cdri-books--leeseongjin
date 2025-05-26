import { BookSearchCount } from "@/features/books/ui/book-search-count/BookSearchCount";
import { BookSearchResults } from "@/features/books/ui/book-search-results/BookSearchResults";
import { BookSearch } from "@/features/books/ui/book-search/BookSearch";
import { cn } from "@/shared/lib/cn";
import { Suspense } from "react";

export default function Page() {
  return (
    // useSearchParams() 를 사용하기 위해서는 반드시 Suspense 로 감싸야 함
    <Suspense>
      <section className={cn("flex flex-col gap-4 mb-12")}>
        <h1 className="text-title2 text-text-primary text-left">도서 검색</h1>

        <BookSearch />

        <BookSearchCount />
      </section>

      <section>
        <BookSearchResults />
      </section>
    </Suspense>
  );
}
