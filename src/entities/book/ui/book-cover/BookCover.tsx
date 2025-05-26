import type { ImageProps } from "@/shared/ui/image/Image";
import { Image } from "@/shared/ui/image/Image";
import { BookX } from "lucide-react";

const CoverFallbackElement = (
  <div className="relative flex items-center justify-center w-full h-full">
    <div className="w-full h-full bg-light-gray-100 rounded-md shadow-md" />
    <BookX className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 max-w-full max-h-full text-gray-700" />
  </div>
);

export const BookCover = ({ ...props }: ImageProps) => {
  // 이미지가 저화질인 이유는 Kakao API가 응답하는 thumbnail 이미지가 저화질이기 때문
  return (
    <Image {...props} enableFallback fallbackElement={CoverFallbackElement} />
  );
};
