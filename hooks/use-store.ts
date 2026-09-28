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

const useStore = create<CanvasElementStates>((set) => ({
  search: "",
  items: [],
  selectedIndex: [],
  setSearch: (search: string) => set((state) => ({...state, search})),
  setSelectedIndex: (selectedIndex: number[]) =>
    set((state) => ({ ...state, selectedIndex })),
  addItem: (paletteItem: PaletteItemProps) => {
    const newItem: CanvasElementItem = {
      paletteItem,
      x: DEFAULT_X,
      y: DEFAULT_Y,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    };

    set((state) => ({ ...state, items: [...state.items, newItem] }));
  },
  dragItem: ({ x, y, index }) =>
    set((state) => {
      const updatedItems = [...state.items];
      updatedItems[index].x = x;
      updatedItems[index].y = y;

      return { ...state, items: updatedItems };
    }),
  resizeItem: ({ x, y, width, height, index }) =>
    set((state) => {
      const updatedItems = [...state.items];
      updatedItems[index].x = x;
      updatedItems[index].y = y;
      updatedItems[index].width = width;
      updatedItems[index].height = height;

      return { ...state, items: updatedItems };
    }),
  bringToFront: () =>
    set((state) => {
      const currentItems = state.items;
      const unselectedItems: CanvasElementItem[] = [];
      const selectedItems: CanvasElementItem[] = [];

      currentItems.forEach((item, index) => {
        if (state.selectedIndex.includes(index)) {
          selectedItems.push(item);
        } else {
          unselectedItems.push(item);
        }
      });
      state.setSelectedIndex([]);

      return { ...state, items: [...unselectedItems, ...selectedItems] };
    }),
  sendToBack: () =>
    set((state) => {
      const currentItems = state.items;
      const unselectedItems: CanvasElementItem[] = [];
      const selectedItems: CanvasElementItem[] = [];

      currentItems.forEach((item, index) => {
        if (state.selectedIndex.includes(index)) {
          selectedItems.push(item);
        } else {
          unselectedItems.push(item);
        }
      });
      state.setSelectedIndex([]);

      return { ...state, items: [...selectedItems, ...unselectedItems] };
    }),
  removeItem: () =>
    set((state) => {
      const newItem = state.items.filter(
        (_item, index) => !state.selectedIndex.includes(index),
      );
      state.setSelectedIndex([]);

      return { ...state, items: newItem };
    }),
}));

export default useStore;
