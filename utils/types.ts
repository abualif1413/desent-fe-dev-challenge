export type Categories = "Desk" | "Chair" | "Accessories";

export interface PaletteItemProps {
  materialIcon: string;
  brandName: string;
  description: string;
  category: Categories;
  canvasImageUrl: string;
  price: number;
}

export interface PaletteGroupProps {
  materialIcon: string;
  groupName: string;
  paletteItems?: PaletteItemProps[];
}

export interface PaletteMainProps {
  paletteItems?: PaletteItemProps[];
}

export interface CanvasMainProps {
  width: number;
  height: number;
}

export interface CanvasElementItem {
  id: string;
  paletteItem: PaletteItemProps;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CanvasElementStates {
  isSideBarOpen: boolean;
  isCheckoutOpen: boolean;
  hasAnyChanges: boolean;
  search: string;
  items: CanvasElementItem[];
  selectedItems: string[];
  setSideBarOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  setSearch: (search: string) => void;
  setSelectedItem: (selectedItems: string[]) => void;
  loadSavedItems: () => void;
  addItem: (paletteItem: PaletteItemProps) => void;
  dragItem: ({ x, y, id }: { x: number; y: number; id: string }) => void;
  resizeItem: ({
    x,
    y,
    width,
    height,
    id,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
    id: string;
  }) => void;
  bringToFront: () => void;
  sendToBack: () => void;
  removeItem: () => void;
  saveChanges: () => void;
}

export interface CanvasItemProps {
  imageElement: CanvasElementItem;
  isSelected?: boolean;
  onDragElement: ({ x, y }: { x: number; y: number }) => void;
  onResizeElement: ({
    x,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
  onSelect: () => void;
}
