import { BookSearchCount } from "@/features/books/ui/book-search-count/BookSearchCount";
import { BookSearchResults } from "@/features/books/ui/book-search-results/BookSearchResults";
import { BookSearch } from "@/features/books/ui/book-search/BookSearch";
import { cn } from "@/shared/lib/cn";

export default function Page() {
  return (
    <>
      <section className={cn("flex flex-col gap-4 mb-12")}>
        <h1 className="text-title2 text-text-primary text-left">도서 검색</h1>

        <div className="flex items-center gap-4 w-full max-w-[480px]">
          <BookSearch />
        </div>

        <BookSearchCount />
      </section>

      <section>
        <BookSearchResults />
      </section>
    </>
  );
}
