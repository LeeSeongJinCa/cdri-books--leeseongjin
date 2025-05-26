"use client";

import type { ImageProps as NextImageProps } from "next/image";
import NextImage from "next/image";
import type { ReactEventHandler, ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";

export interface ImageProps extends NextImageProps {
  enableFallback?: boolean;
  fallbackImage?: string;
  fallbackElement?: ReactNode;
}

export const Image = ({
  src,
  onError,
  enableFallback = true,
  fallbackImage,
  fallbackElement,
  ...props
}: ImageProps) => {
  const [isError, setIsError] = useState(false);

  const fallbackSrc = useMemo(() => {
    if (isError && enableFallback) {
      if (fallbackImage) return fallbackImage;
    }

    return src;
  }, [src, enableFallback, fallbackImage, isError]);

  const handleError = useCallback<ReactEventHandler<HTMLImageElement>>(
    (event) => {
      onError?.(event);
      setIsError(true);
    },
    [onError],
  );

  return (
    <>
      {isError ? (
        fallbackElement
      ) : (
        <NextImage {...props} src={fallbackSrc} onError={handleError} />
      )}
    </>
  );
};
