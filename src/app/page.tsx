"use client";

import type { BookApiResponseDocument } from "@/entities/book/model/type";
import { BookListItemDetail } from "@/entities/book/ui/book-list-item-detail/BookListItemDetail";
import { BookListItem } from "@/entities/book/ui/book-list-item/BookListItem";
import type { SearchType } from "@/entities/search/constants/SearchType";
import { DetailSearchPopover } from "@/entities/search/ui/detail-search-popover/DetailSearchPopover";
import { SearchBar } from "@/entities/search/ui/search-bar/SearchBar";
import { SearchCountText } from "@/entities/search/ui/search-count-text/SearchCountText";
import { SearchNoData } from "@/entities/search/ui/search-no-data/SearchNoData";
import { SearchResultList } from "@/entities/search/ui/search-result-list/SearchResultList";
import { cn } from "@/shared/lib/cn";
import { PublicHeader } from "@/widgets/ui/page-header/PublicHeader";
import { memo, useState } from "react";

const books: BookApiResponseDocument[] = [
  {
    authors: ["보도 섀퍼"],
    contents:
      "돈을 버는데 비상한 재능이 있는 이 책의 저자 보도 섀퍼는 열여섯에 독일에서 미국으로 건너가 고등학교를 졸업하고, 독일과 멕시코에서 법학을 전공했다. 대학을 마친 후에는 여러 기업에서 일하며 능력을 인정받고 다양한 경력을 쌓았다. 이 기간 동안 그는 부와 명성을 소유한 거부들을 만나게 되고, 그들로부터 부가 쌓이고 돈이 늘어나는 원리를 배운다. 스물여섯 살 때만 해도 빚에서 헤어날 수 없을 정도로 심각한 경제적 문제를 안고 있던 그였지만, 이들 스승",
    datetime: "2011-05-15T00:00:00.000+09:00",
    isbn: "8919205019 9788919205013",
    price: 16700,
    publisher: "에포케",
    sale_price: 15030,
    status: "정상판매",
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F397796%3Ftimestamp%3D20250205113828",
    title: "돈",
    translators: ["이병서"],
    url: "https://search.daum.net/search?w=bookpage&bookId=397796&q=%EB%8F%88",
  },
  {
    authors: ["홍춘욱"],
    contents:
      "역사는 반복되고, 돈의 역사는 더욱 그렇다. 역사를 모르면 과거의 실수를 반복할 수밖에 없다. 그러니 돈을 벌고 싶다면, 아니 최소한 잃고 싶지 않다면 돈의 역사를 공부해야 한다. 돈의 역사는 자본주의 시대에서 살아남기 위한 생존 지침이다.  국내 최고의 이코노미스트 홍춘욱 박사가 마침내 ‘대한민국 돈의 역사’를 다뤘다. 세계 경제사를 다룬 《50대 사건으로 보는 돈의 역사》와 《7대 이슈로 보는 돈의 역사》를 쓴 그가 이번에는 대한민국 경제사로",
    datetime: "2023-08-02T00:00:00.000+09:00",
    isbn: "1192389263 9791192389264",
    price: 33000,
    publisher: "상상스퀘어",
    sale_price: 29700,
    status: "정상판매",
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6406359%3Ftimestamp%3D20240731160336",
    title: "대한민국 돈의 역사",
    translators: [],
    url: "https://search.daum.net/search?w=bookpage&bookId=6406359&q=%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD+%EB%8F%88%EC%9D%98+%EC%97%AD%EC%82%AC",
  },
  {
    authors: ["김호연"],
    contents:
      "150만 독자가 애독하며 수만 개의 입소문 리뷰를 탄생시킨 국민 힐링소설 『불편한 편의점』의 작가 김호연이 신작 소설 『나의 돈키호테』로 돌아왔다. 2021년 출간되어 우리들 지친 삶에 큰 위로를 준 『불편한 편의점』은 독자의 열렬한 호응에 후속작 『불편한 편의점 2』를 선보이며 재미와 감동을 보장하는 시리즈로 자리 잡았다. 작품의 인기가 지속될수록 독자들은 작가의 다음 소설을 기다리게 되었고, 그가 또 어떤 흥미로운 이야기를 들려줄지 관심이 쏠렸다. 2024",
    datetime: "2024-04-25T00:00:00.000+09:00",
    isbn: "1161571760 9791161571768",
    price: 18000,
    publisher: "나무옆의자",
    sale_price: 16200,
    status: "정상판매",
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6609944%3Ftimestamp%3D20250418153339",
    title: "나의 돈키호테",
    translators: [],
    url: "https://search.daum.net/search?w=bookpage&bookId=6609944&q=%EB%82%98%EC%9D%98+%EB%8F%88%ED%82%A4%ED%98%B8%ED%85%8C",
  },
  {
    authors: ["신민철(처리형)"],
    contents:
      "돈은 시대별로 그 형태를 달리하며 꾸준히 발전해 왔다. 흔히 돈이라고 하면 10만 원이나 100만 원 같은 화폐 단위를 떠올리지만, 이런 생각은 ‘지구는 네모이고 그 끝엔 무한히 추락하는 폭포가 있을 것’이라 믿었던 옛 유럽인들과 크게 다르지 않은 생각이다. 숫자로 표기되는 개념에만 사로잡혀 그 너머에 존재하는 진정한 가치와 의미를 깨닫지 못하는 것이다. 소금이나 조개껍데기, 유리구슬 등 돈의 역할을 대신하는 것들이 나타나고 또 사라졌지만, 그 긴",
    datetime: "2023-02-15T00:00:00.000+09:00",
    isbn: "1192488253 9791192488257",
    price: 21000,
    publisher: "베가북스",
    sale_price: 18900,
    status: "정상판매",
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6274756%3Ftimestamp%3D20250521220931",
    title: "돈의 규칙",
    translators: [],
    url: "https://search.daum.net/search?w=bookpage&bookId=6274756&q=%EB%8F%88%EC%9D%98+%EA%B7%9C%EC%B9%99",
  },
  {
    authors: ["장지웅"],
    contents:
      "는 질문을 받아본다면 선뜻 을의 인생을 택하기는 어려울 것이다. 팍팍하고 막막한 인생을 살며 내가 주인이 되는 주도권을 쥔 인생을 한번쯤 꿈꾸어보았을 것이다. 이 책은 ‘말하기’로 부와 운을 끌어당기는 법을 제안한다. 언제까지 돈 없고 빽이 없어서, 부자 부모를 두지 않아서 이 모양 이 꼴이라고 한탄만 할까. 비록 타고난 부자는 아니지만 습득할 수 있는 기술로 부자처럼 살 수는 없을까? 세계적인 베스트셀러 작가도 친구의 부자아빠에게 부자가 되는 법을",
    datetime: "2022-10-20T00:00:00.000+09:00",
    isbn: "1191904210 9791191904215",
    price: 13000,
    publisher: "여의도책방",
    sale_price: 11700,
    status: "정상판매",
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6203845%3Ftimestamp%3D20240918143447",
    title: "돈 되는 말하기 기술",
    translators: [],
    url: "https://search.daum.net/search?w=bookpage&bookId=6203845&q=%EB%8F%88+%EB%90%98%EB%8A%94+%EB%A7%90%ED%95%98%EA%B8%B0+%EA%B8%B0%EC%88%A0",
  },
  {
    authors: ["김승호"],
    contents:
      "2020ㆍ2021ㆍ2022ㆍ2023ㆍ2024 5년 연속 최장기 베스트셀러120만 깨어있는 독자들이 선택한 경제경영 필독서 『돈의 속성』  ▶ 『돈의 속성』 400쇄 기념 개정증보판 발행! ▶ 중국, 일본, 대만, 태국, 베트남 5개국 출간!  이 책은 초판 발행 후, 경제경영 필도서로 자리매김한 『돈의 속성』 400쇄 기념 개정증보판이다.",
    datetime: "2020-06-15T00:00:00.000+09:00",
    isbn: "1188331795 9791188331796",
    price: 17800,
    publisher: "스노우폭스북스",
    sale_price: 16020,
    status: "정상판매",
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5385029%3Ftimestamp%3D20250301135709",
    title: "돈의 속성(400쇄 리커버에디션)",
    translators: [],
    url: "https://search.daum.net/search?w=bookpage&bookId=5385029&q=%EB%8F%88%EC%9D%98+%EC%86%8D%EC%84%B1%28400%EC%87%84+%EB%A6%AC%EC%BB%A4%EB%B2%84%EC%97%90%EB%94%94%EC%85%98%29",
  },
  {
    authors: ["앙드레 코스톨라니"],
    contents:
      "앙드레 코스톨라니 최후의 역작으로 증권 거래와 투자심리에 중요한 변수인 투자의 근본적인 비밀과 기술 등을 안내한 돈 관리 지침서다. 저자는 투자자들에게 21세기 증권시장에 있어서 기회와 위험, 그리고 변화와 상승, 하락에 대한 전망을 보여준다.  이 책에서 저자는 주식 및 다양한 투자에 대한 자신의 지식을 전달하고자 했다. 아울러 돈에 관한 세계사적인 사건들, 돈과 부를 추구하여 그것을 획득한 사람들 혹은 실패한 사람들, 그리고 무엇보다도 자신의",
    datetime: "2015-09-30T00:00:00.000+09:00",
    isbn: "8959893544 9788959893546",
    price: 12000,
    publisher: "미래의창",
    sale_price: 10800,
    status: "정상판매",
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F819036%3Ftimestamp%3D20250510113554",
    title: "돈, 뜨겁게 사랑하고 차갑게 다루어라",
    translators: ["한윤진"],
    url: "https://search.daum.net/search?w=bookpage&bookId=819036&q=%EB%8F%88%2C+%EB%9C%A8%EA%B2%81%EA%B2%8C+%EC%82%AC%EB%9E%91%ED%95%98%EA%B3%A0+%EC%B0%A8%EA%B0%91%EA%B2%8C+%EB%8B%A4%EB%A3%A8%EC%96%B4%EB%9D%BC",
  },
  {
    authors: ["할미언니"],
    contents:
      "반응을 불러일으키며 누적 조회수 1,000만 회를 돌파한 경제 유튜버 할미언니는 많은 사람들에게 나도 저렇게 똑 부러지게 살고 싶다는 자극을 주었다. 그동안 구독자들의 사랑을 받았던 재테크 노하우를 집대성하여 만든 첫 책이 바로 《돈 공부를 시작하고 인생의 불안이 사라졌다》이다. 이 책은 총 4부로 동기부여, 재테크, 마인드셋, 성장루틴으로 구성되어 있으며, 돈이 저절로 모이는 재테크 3단계부터 ETF, 미국 주식까지 그야말로 재테크 노하우를 꾹꾹 눌러 담았다",
    datetime: "2024-09-04T00:00:00.000+09:00",
    isbn: "1193262232 9791193262238",
    price: 18500,
    publisher: "필름(Feelm)",
    sale_price: 16650,
    status: "정상판매",
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6717156%3Ftimestamp%3D20241123152903",
    title: "돈 공부를 시작하고 인생의 불안이 사라졌다",
    translators: [],
    url: "https://search.daum.net/search?w=bookpage&bookId=6717156&q=%EB%8F%88+%EA%B3%B5%EB%B6%80%EB%A5%BC+%EC%8B%9C%EC%9E%91%ED%95%98%EA%B3%A0+%EC%9D%B8%EC%83%9D%EC%9D%98+%EB%B6%88%EC%95%88%EC%9D%B4+%EC%82%AC%EB%9D%BC%EC%A1%8C%EB%8B%A4",
  },
  {
    authors: ["모건 하우절"],
    contents:
      "칼럼니스트이자 콜라보레이티브 펀드 파트너로 활동중인 모건 하우절의 첫 책이다. 출간 즉시 아마존 투자 분야 1위를 차지했고 개인 투자자부터 전문 컨설턴트까지 극찬 세례를 받으며 명실상부 ‘2020 아마존 최고의 금융도서’로 평가받는다. 《돈의 심리학》은 총 20개 스토리로 구성되어 있다. ‘스토리텔링의 천재’ ‘소설가의 기술을 가진 금융 작가’라는 별명답게 모건 하우절이 들려주는 20개의 투자 스토리는 대단히 매력적이다. 하나하나 실화와 실증에 바탕을 두되 이야기의",
    datetime: "2023-11-06T00:00:00.000+09:00",
    isbn: "1191056376 9791191056372",
    price: 19800,
    publisher: "인플루엔셜",
    sale_price: 17820,
    status: "정상판매",
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5558360%3Ftimestamp%3D20250523151754",
    title: "돈의 심리학(30만 부 기념 스페셜 에디션)",
    translators: ["이지연"],
    url: "https://search.daum.net/search?w=bookpage&bookId=5558360&q=%EB%8F%88%EC%9D%98+%EC%8B%AC%EB%A6%AC%ED%95%99%2830%EB%A7%8C+%EB%B6%80+%EA%B8%B0%EB%85%90+%EC%8A%A4%ED%8E%98%EC%85%9C+%EC%97%90%EB%94%94%EC%85%98%29",
  },
  {
    authors: ["송희구"],
    contents:
      "30만 베스트셀러 《서울 자가에 대기업 다니는 김 부장 이야기》 시리즈의 송희구 저자가 2년 만에 세상에 내놓은 신작. 전작과 같이 소설 형태를 빌려와 독자들에게 돈과 인생, 부와 행복에 대한 메시지를 전한다. 소설이라고 해도 좋고, 자기계발서라 해도 좋다. 누군가는 투자 마인드서라 말할지 모른다. 그만큼 읽는 사람에 따라 원하는 재미, 원하는 교훈, 원하는 메시지가 다른, 다면적인 책이다. 주인공은 올해 나이 마흔 ‘영철’과 ‘광수’이다. 대기업에",
    datetime: "2023-04-28T00:00:00.000+09:00",
    isbn: "1165347164 9791165347161",
    price: 18000,
    publisher: "서삼독",
    sale_price: 16200,
    status: "정상판매",
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6332733%3Ftimestamp%3D20250110153033",
    title: "나의 돈 많은 고등학교 친구",
    translators: [],
    url: "https://search.daum.net/search?w=bookpage&bookId=6332733&q=%EB%82%98%EC%9D%98+%EB%8F%88+%EB%A7%8E%EC%9D%80+%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90+%EC%B9%9C%EA%B5%AC",
  },
];

export default function Page() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = (keyword: string, type: SearchType) => {
    console.log("onSearch:", [keyword, type]);

    if (keyword.trim() === "") {
      return;
    }

    setSearchValue(keyword);
    setHistory((prev) => {
      const newHistory = [keyword, ...prev];
      return newHistory.slice(0, 5);
    });
  };

  const handleDelete = (index: number) => {
    console.log("onDelete:", index);

    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.splice(index, 1);
      return newHistory;
    });
  };

  return (
    <div className="flex flex-col">
      <PublicHeader className="w-full max-w-[960px] mx-auto px-4" />

      <main className="flex-1 w-full max-w-[960px] mx-auto mt-25 px-4 pb-12">
        <section className={cn("flex flex-col gap-4 mb-12")}>
          <p className="text-title2 text-text-primary text-left">도서 검색</p>

          <div className="flex items-center gap-4 w-full max-w-[480px]">
            <SearchBar
              history={history}
              value={searchValue}
              onChange={setSearchValue}
              onSearch={handleSearch}
              onDelete={handleDelete}
            />

            <DetailSearchPopover onSearch={handleSearch} />
          </div>

          <SearchCountText count={0} />
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
      </main>
    </div>
  );
}

const BookSearchResultListItem = memo(
  ({ document }: { document: BookApiResponseDocument }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
      setIsExpanded((prev) => !prev);
    };

    const renderItem = isExpanded ? (
      <BookListItemDetail
        url={document.url}
        cover={document.thumbnail}
        title={document.title}
        author={document.authors.join(", ")}
        description={document.contents}
        originalPrice={document.price}
        discountedPrice={document.sale_price}
        isLiked={false}
        onCollapseDetail={toggleExpanded}
      />
    ) : (
      <BookListItem
        url={document.url}
        cover={document.thumbnail}
        title={document.title}
        author={document.authors.join(", ")}
        price={document.price}
        onExpandDetail={toggleExpanded}
      />
    );

    return <>{renderItem}</>;
  },
);

BookSearchResultListItem.displayName = "SearchResultListItem";
