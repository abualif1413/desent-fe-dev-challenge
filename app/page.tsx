"use client";

import useMeasure from "react-use-measure";

import CanvasFloatingBar from "@/components/canvas/canvas-floating-bar";
import CanvasMain from "@/components/canvas/canvas-main";
import PaletteMain from "@/components/palette/palette-main";
import { PALETTE_ITEMS } from "@/utils/constants";
import CanvasCheckout from "@/components/canvas/canvas-checkout";

export default function Home() {
  const [canvasContainerRef, canvasBounds] = useMeasure();

  return (
    <main className="relative w-full bg-[#f8fafc] min-h-screen">
      <div className="flex flex-col w-full h-screen overflow-hidden select-none">
        <div className="flex flex-1 w-full h-full relative overflow-hidden">
          <aside className="w-72 xl:w-80 bg-white border-r border-slate-200/80 flex flex-col z-20 flex-shrink-0 shadow-sm relative">
            <PaletteMain paletteItems={PALETTE_ITEMS} />
          </aside>
          <div className="flex-1 relative overflow-hidden bg-[#f1f5f9]" ref={canvasContainerRef}>
            <CanvasMain width={canvasBounds.width} height={canvasBounds.height} />
            <CanvasFloatingBar />
            <CanvasCheckout />
          </div>
        </div>
      </div>
    </main>
  );
}
