import { FC } from "react";

import useStore from "@/hooks/use-store";

const CanvasFloatingBar: FC = () => {
  const sendToBack = useStore((state) => state.sendToBack);
  const bringToFront = useStore((state) => state.bringToFront);
  const removeItem = useStore((state) => state.removeItem);
  const selectedItems = useStore((state) => state.selectedItems);

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-xl px-2 py-1.5 rounded-full shadow-lg border border-slate-200/90 flex items-center gap-1">
      <button
        className="px-2.5 py-1 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-label-sm text-label-sm flex items-center gap-1 transition-all"
        id="dimToggle"
        title="Show Metric Dimensions"
        type="button"
        onClick={bringToFront}
      >
        <span className="material-symbols-outlined text-[15px]">
          flip_to_front
        </span>
        <span className="">Bring to Front</span>
      </button>
      <button
        className="px-2.5 py-1 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-label-sm text-label-sm flex items-center gap-1 transition-all"
        id="dimToggle"
        title="Show Metric Dimensions"
        type="button"
        onClick={sendToBack}
      >
        <span className="material-symbols-outlined text-[15px]">
          flip_to_back
        </span>
        <span className="">Send to Back</span>
      </button>
      <div className="w-[1px] h-5 bg-slate-200 mx-1"></div>
      <div className="flex items-center gap-0.5">
        <button
          className="px-2.5 py-1 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-label-sm text-label-sm flex items-center gap-1 transition-all"
          id="dimToggle"
          title="Show Metric Dimensions"
          type="button"
          onClick={removeItem}
        >
          <span className="material-symbols-outlined text-[15px]">
            backspace
          </span>
          <span className="">Remove Item</span>
        </button>
      </div>
    </div>
  );
};

export default CanvasFloatingBar;
