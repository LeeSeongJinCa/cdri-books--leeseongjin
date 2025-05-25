import type { BookApiResponseDocument } from "@/entities/book/model/type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface WishlistStore {
  wishlist: BookApiResponseDocument[];
  addToWishlist: (book: BookApiResponseDocument) => void;
  removeFromWishlist: (book: BookApiResponseDocument) => void;
}

export const useWishlistStore = create(
  persist<WishlistStore>(
    (set) => ({
      wishlist: [],
      addToWishlist: (book) =>
        set((state) => ({ wishlist: [...state.wishlist, book] })),
      removeFromWishlist: (book) =>
        set((state) => ({
          wishlist: state.wishlist.filter((b) => b.isbn !== book.isbn),
        })),
    }),
    {
      name: "CDRI-wishlist",
      storage: createJSONStorage(() => localStorage),
      // localStorage에 저장할 때 찜한 책만 저장하기 위해 사용
      partialize: (state) => ({ wishlist: state.wishlist }) as WishlistStore,
    },
  ),
);
