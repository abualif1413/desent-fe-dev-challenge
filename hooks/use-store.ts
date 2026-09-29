import { create } from "zustand";

import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_X,
  DEFAULT_Y,
} from "@/utils/constants";
import type {
  CanvasElementItem,
  CanvasElementStates,
  PaletteItemProps,
} from "@/utils/types";

function partitionById<T extends { id: string }>(
  items: T[],
  selectedIds: string[],
) {
  const selected: T[] = [];
  const rest: T[] = [];
  const selectedSet = new Set(selectedIds);
  for (const item of items) {
    (selectedSet.has(item.id) ? selected : rest).push(item);
  }
  return { selected, rest };
}

const useStore = create<CanvasElementStates>((set) => ({
  search: "",
  items: [],
  selectedItems: [],
  setSearch: (search: string) => set({ search }),
  setSelectedItem: (selectedItems: string[]) => set({ selectedItems }),
  addItem: (paletteItem: PaletteItemProps) => {
    const newItem: CanvasElementItem = {
      id: crypto.randomUUID(),
      paletteItem,
      x: DEFAULT_X,
      y: DEFAULT_Y,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    };

    set((state) => ({ items: [...state.items, newItem] }));
  },
  dragItem: ({ x, y, id }) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, x, y } : item,
      ),
    })),
  resizeItem: ({ x, y, width, height, id }) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, x, y, width, height } : item,
      ),
    })),
  bringToFront: () =>
    set((state) => {
      const { selected, rest } = partitionById(
        state.items,
        state.selectedItems,
      );

      return { items: [...rest, ...selected] };
    }),
  sendToBack: () =>
    set((state) => {
      const { selected, rest } = partitionById(
        state.items,
        state.selectedItems,
      );

      return { items: [...selected, ...rest] };
    }),
  removeItem: () =>
    set((state) => {
      const newItem = state.items.filter(
        (item) => !state.selectedItems.includes(item.id),
      );

      return { items: newItem, selectedItems: [] };
    }),
}));

export default useStore;
