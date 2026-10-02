import { create } from "zustand";

import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_X,
  DEFAULT_Y,
  LOCAL_STORAGE_DATA_KEY,
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
  isSideBarOpen: false,
  isCheckoutOpen: false,
  hasAnyChanges: false,
  search: "",
  items: [],
  selectedItems: [],
  setSideBarOpen: (open: boolean) => set({isSideBarOpen: open}),
  setCheckoutOpen: (open: boolean) => set({isCheckoutOpen: open}),
  setSearch: (search: string) => set({ search }),
  setSelectedItem: (selectedItems: string[]) => set({ selectedItems }),
  loadSavedItems: () => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);

    if (!savedData) {
      return;
    }

    const parsedSavedData = JSON.parse(savedData) as CanvasElementItem[];
    
    set({ hasAnyChanges: false, items: parsedSavedData });
  },
  addItem: (paletteItem: PaletteItemProps) => {
    const newItem: CanvasElementItem = {
      id: crypto.randomUUID(),
      paletteItem,
      x: DEFAULT_X,
      y: DEFAULT_Y,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    };

    set((state) => ({ hasAnyChanges: true, isSideBarOpen: false, items: [...state.items, newItem] }));
  },
  dragItem: ({ x, y, id }) =>
    set((state) => ({
      hasAnyChanges: true,
      items: state.items.map((item) =>
        item.id === id ? { ...item, x, y } : item,
      ),
    })),
  resizeItem: ({ x, y, width, height, id }) =>
    set((state) => ({
      hasAnyChanges: true,
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

      return { hasAnyChanges: true, items: [...rest, ...selected] };
    }),
  sendToBack: () =>
    set((state) => {
      const { selected, rest } = partitionById(
        state.items,
        state.selectedItems,
      );

      return { hasAnyChanges: true, items: [...selected, ...rest] };
    }),
  removeItem: () =>
    set((state) => {
      const newItem = state.items.filter(
        (item) => !state.selectedItems.includes(item.id),
      );

      return { hasAnyChanges: true, items: newItem, selectedItems: [] };
    }),
  saveChanges: () =>
    set((state) => {
      const stringifyItems = JSON.stringify(state.items);
      localStorage.setItem(LOCAL_STORAGE_DATA_KEY, stringifyItems);

      return { hasAnyChanges: false };
    }),
}));

export default useStore;
