import { formatMoney } from "accounting";
import groupBy from "lodash/groupBy";
import Image from "next/image";

import useStore from "@/hooks/use-store";

const CanvasCheckout = () => {
  const canvasItems = useStore((state) => state.items);
  const total = canvasItems.reduce((sum, item) => {
    return sum + item.paletteItem.price;
  }, 0);
  const groupedItems = groupBy(canvasItems, "paletteItem.brandName");

  return (
    <>
      <div className="hidden md:inline absolute top-5 right-5 z-20 w-72 bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200/90 shadow-lg p-3 transition-all select-none">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              receipt_long
            </span>
            <span className="font-headline-sm text-[13px] text-slate-800 font-semibold tracking-tight">
              Rental Summary
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 py-2 border-t border-b border-slate-100 mb-2.5 bg-slate-50/70 -mx-3 px-3">
          {Object.entries(groupedItems).map(([brandName, items]) => (
            <div
              key={brandName}
              className="flex items-start  gap-1.5 text-slate-600"
            >
              <Image
                src={items[0].paletteItem.canvasImageUrl}
                alt={items[0].paletteItem.brandName}
                width={30}
                height={30}
                className="aspect-square"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-[12px]">
                  {items.length} {brandName}
                </span>
                <span className="font-label-sm text-[12px] font-bold text-slate-800">
                  @{formatMoney(items[0].paletteItem.price, "$")}
                </span>
                <span className="font-label-sm text-[12px] font-bold text-slate-800">
                  Subtotal{" "}
                  {formatMoney(items[0].paletteItem.price * items.length, "$")}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-slate-400 font-medium">
              Total
            </span>
            <span className="font-headline-md text-[18px] text-slate-900 font-semibold tracking-tight leading-tight">
              {formatMoney(total)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex-1 bg-primary text-white hover:bg-primary/90 font-label-sm text-[11px] py-1.5 px-2.5 rounded-lg font-medium transition-all shadow-xs flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">
              assignment
            </span>
            <span className="">Checkout</span>
          </button>
        </div>
      </div>
      <div className="md:hidden absolute top-4 right-4 z-20">
        <button
          type="button"
          className="bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md text-slate-800 hover:text-primary rounded-xl px-3 py-2 flex items-center gap-2 font-label-sm text-label-sm font-semibold transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-primary text-[18px]">
            receipt_long
          </span>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[12px] font-semibold text-slate-900">
              {formatMoney(total)}
            </span>
          </div>
        </button>
      </div>
    </>
  );
};

export default CanvasCheckout;
