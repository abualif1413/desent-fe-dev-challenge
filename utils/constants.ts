import type { PaletteItemProps } from "./types";

export const PALETTE_ITEMS: PaletteItemProps[] = [
  {
    brandName: "Nordic Lift White",
    category: "Desk",
    description: "Height-adjustable desk with a white top and steel legs",
    materialIcon: "desk",
    canvasImageUrl: "/palettes/desk-1.svg",
    price: 28,
  },
  {
    brandName: "Nightfall Lift Pro",
    category: "Desk",
    description: "Dark height-adjustable desk with ambient underglow",
    materialIcon: "table_bar",
    canvasImageUrl: "/palettes/desk-2.svg",
    price: 34,
  },
  {
    brandName: "ErgoCore Black",
    category: "Chair",
    description: "Mesh ergonomic chair with headrest and lumbar support",
    materialIcon: "chair",
    canvasImageUrl: "/palettes/chair-1.svg",
    price: 18,
  },
  {
    brandName: "ErgoCore Air White",
    category: "Chair",
    description: "Breathable white mesh chair with adjustable headrest",
    materialIcon: "chair_alt",
    canvasImageUrl: "/palettes/chair-2.svg",
    price: 18,
  },
  {
    brandName: "ClearView 4K 27",
    category: "Accessories",
    description: `27" UHD flat monitor with a sharp, wide-angle display`,
    materialIcon: "assistant_on_hub",
    canvasImageUrl: "/palettes/monitor-1.svg",
    price: 30,
  },
  {
    brandName: "CurveView 4K 34",
    category: "Accessories",
    description: `34" UHD curved ultrawide for multitasking`,
    materialIcon: "monitor",
    canvasImageUrl: "/palettes/monitor-2.svg",
    price: 42,
  },
  {
    brandName: "LumaBar Desk Light",
    category: "Accessories",
    description: "Slim LED bar lamp with adjustable brightness and warmth",
    materialIcon: "light",
    canvasImageUrl: "/palettes/desk-light-1.svg",
    price: 5,
  },
  {
    brandName: "PureAir Mini",
    category: "Accessories",
    description: "Compact air purifier with a display and fresh-air glow",
    materialIcon: "air_freshener",
    canvasImageUrl: "/palettes/air-freshner-1.svg",
    price: 8,
  },
];

export const DEFAULT_X = 50;
export const DEFAULT_Y = 50;
export const DEFAULT_WIDTH = 200;
export const DEFAULT_HEIGHT = 200;
export const LOCAL_STORAGE_DATA_KEY = "workspace-designer-data";
