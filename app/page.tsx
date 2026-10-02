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
import classNames from "classnames";
import Backdrop from "@/components/utils/backdrop";

export default function Home() {
  const [canvasContainerRef, canvasBounds] = useMeasure();
  const search = useStore((state) => state.search);
  const isSideBarOpen = useStore((state) => state.isSideBarOpen);
  const loadSavedItems = useStore((state) => state.loadSavedItems);
  const hasAnyChanges = useStore((state) => state.hasAnyChanges);
  const setSideBarOpen = useStore((state) => state.setSideBarOpen);

  useEffect(() => {
    loadSavedItems();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasAnyChanges) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasAnyChanges]);

  const paletteItems = search
    ? PALETTE_ITEMS.filter(
        (item) =>
          item.brandName.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()),
      )
    : PALETTE_ITEMS;

  return (
    <main className="relative w-full bg-[#f8fafc] h-dvh">
      <Backdrop />
      <div className="flex flex-col w-full h-full overflow-hidden select-none">
        <div className="flex flex-1 w-full h-full relative overflow-hidden">
          <aside
            className={classNames(
              "w-72 xl:w-80 h-full bg-white border-r border-slate-200/80 flex flex-col z-translated-element flex-shrink-0 shadow-sm absolute md:relative transition-[translate] duration-300 ease-in-out",
              {
                "translate-x-0": isSideBarOpen,
                "translate-x-[-300px] md:translate-x-0": !isSideBarOpen,
              },
            )}
          >
            <PaletteSearch />
            {paletteItems.length ? (
              <PaletteMain paletteItems={paletteItems} />
            ) : (
              <PaletteEmptyResult />
            )}
          </aside>
          <div
            className="flex-1 relative overflow-hidden bg-[#f1f5f9] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"
            ref={canvasContainerRef}
          >
            <button
              type="button"
              className="md:hidden absolute top-4 left-4 z-floating-element bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md text-slate-800 hover:text-primary rounded-xl px-3 py-2 flex items-center gap-1.5 font-label-sm text-label-sm font-semibold transition-all active:scale-95"
              onClick={() => void setSideBarOpen(true)}
            >
              <span className="material-symbols-outlined text-primary text-[18px]">
                view_sidebar
              </span>
            </button>
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
