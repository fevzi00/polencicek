// src/lib/store/cart.ts
"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  qty: number;
  image?: string;
  note?: string;
};

type CartState = {
  items: CartItem[];
  count: number;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      count: 0,
      add: (item) =>
        set((s) => {
          const i = s.items.findIndex((x) => x.id === item.id && x.note === item.note);
          let items: CartItem[];
          if (i > -1) {
            const copy = [...s.items];
            copy[i] = { ...copy[i], qty: copy[i].qty + item.qty };
            items = copy;
          } else {
            items = [...s.items, item];
          }
          const count = items.reduce((a, b) => a + b.qty, 0);
          return { items, count };
        }),
      remove: (id) =>
        set((s) => {
          const items = s.items.filter((x) => x.id !== id);
          const count = items.reduce((a, b) => a + b.qty, 0);
          return { items, count };
        }),
      clear: () => set({ items: [], count: 0 }),
    }),
    {
      name: "cart", // localStorage anahtarı
      storage: createJSONStorage(() => localStorage),
      // (opsiyonel) versiyonlama/migrasyon burada yapılabilir
    },
  ),
);
