"use client";

import { useEffect } from "react";
import useMeasure from "react-use-measure";

import CanvasFloatingBar from "@/components/canvas/canvas-floating-bar";
import CanvasMain from "@/components/canvas/canvas-main";
import PaletteMain from "@/components/palette/palette-main";
import { PALETTE_ITEMS } from "@/utils/constants";
import CanvasCheckout from "@/components/canvas/canvas-checkout";
import PaletteSearch from "@/components/palette/palette-search";
import useStore from "@/hooks/use-store";
import PaletteEmptyResult from "@/components/palette/palette-empty-result";

export default function Home() {
  const [canvasContainerRef, canvasBounds] = useMeasure();
  const search = useStore((state) => state.search);
  const loadSavedItems = useStore((state) => state.loadSavedItems);
  const hasAnyChanges = useStore((state) => state.hasAnyChanges);

  useEffect(() => {
    loadSavedItems();
  }, [])

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasAnyChanges) {
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasAnyChanges])

  const paletteItems = search
    ? PALETTE_ITEMS.filter(
        (item) =>
          item.brandName.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()),
      )
    : PALETTE_ITEMS;

  return (
    <main className="relative w-full bg-[#f8fafc] min-h-screen">
      <div className="flex flex-col w-full h-screen overflow-hidden select-none">
        <div className="flex flex-1 w-full h-full relative overflow-hidden">
          <aside className="w-72 xl:w-80 bg-white border-r border-slate-200/80 flex flex-col z-20 flex-shrink-0 shadow-sm relative">
            <PaletteSearch />
            {paletteItems.length ? (
              <PaletteMain paletteItems={paletteItems} />
            ) : (
              <PaletteEmptyResult />
            )}
          </aside>
          <div
            className="flex-1 relative overflow-hidden bg-[#f1f5f9]"
            ref={canvasContainerRef}
          >
            <CanvasMain
              width={canvasBounds.width}
              height={canvasBounds.height}
            />
            <CanvasFloatingBar />
            <CanvasCheckout />
          </div>
        </div>
      </div>
    </main>
  );
}
