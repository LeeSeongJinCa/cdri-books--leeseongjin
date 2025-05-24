import { SearchCountText } from "@/entities/search/ui/search-count-text/SearchCountText";
import { SearchNoData } from "@/entities/search/ui/search-no-data/SearchNoData";
import { SearchResultList } from "@/entities/search/ui/search-result-list/SearchResultList";
import { cn } from "@/shared/lib/cn";
import { BookSearchResultListItem } from "@/widgets/book/ui/book-search-result-list-item/BookSearchResultListItem";
import { books } from "../__mock__/books";

export default function Page() {
  return (
    <>
      <section className={cn("flex flex-col gap-4 mb-12")}>
        <p className="text-title2 text-text-primary text-left">내가 찜한 책</p>

        <SearchCountText title="찜한 책" count={0} />
      </section>

      <section>
        {books.length > 0 ? (
          <SearchResultList
            documents={books}
            renderItem={(document) => (
              <BookSearchResultListItem document={document} />
            )}
          />
        ) : (
          <SearchNoData className="w-full h-[400px]" />
        )}
      </section>
    </>
  );
}
