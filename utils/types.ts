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
  paletteItem: PaletteItemProps;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CanvasElementStates {
  items: CanvasElementItem[];
  selectedIndex: number[];
  setSelectedIndex: (selectedIndex: number[]) => void;
  addItem: (paletteItem: PaletteItemProps) => void;
  dragItem: ({ x, y, index }: { x: number; y: number; index: number }) => void;
  resizeItem: ({
    x,
    y,
    width,
    height,
    index,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
    index: number;
  }) => void;
  bringToFront: () => void;
  sendToBack: () => void;
  removeItem: () => void;
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
