"use client";

import { cn } from "@/shared/lib/cn";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { useActive } from "./useActive";

export interface LinkProps
  extends NextLinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  children: ReactNode;
  activeClassName?: string;
}

export const Link = ({
  className,
  activeClassName,
  children,
  ...props
}: LinkProps) => {
  const isActive = useActive(props.href);

  return (
    <NextLink
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative body-1 text-text-primary",
        className,
        isActive && activeClassName,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
};
