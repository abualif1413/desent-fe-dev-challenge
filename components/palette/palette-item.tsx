import { formatMoney } from "accounting";
import Image from "next/image";
import { FC } from "react";

import useStore from "@/hooks/use-store";
import type { PaletteItemProps } from "@/utils/types";

const PaletteItem: FC<PaletteItemProps> = ({
  materialIcon,
  brandName,
  description,
  category,
  canvasImageUrl,
  price,
}) => {
  const addElements = useStore((state) => state.addItem);
  return (
    <div
      className="catalog-item group p-2.5 rounded-lg bg-white border border-slate-200/90 hover:border-primary/50 hover:shadow-sm transition-all flex items-center justify-between gap-2"
    >
      <div className="flex items-start gap-2.5 min-w-0">
        <Image
          src={canvasImageUrl}
          alt={brandName}
          width={80}
          height={80}
          className="aspect-square"
        />
        <div className="flex flex-col min-w-0">
          <span className="font-headline-sm text-[13px] text-slate-800 font-medium truncate leading-tight group-hover:text-primary transition-colors">
            {brandName}
          </span>
          <span className="font-label-sm text-[11px] text-slate-400">
            {description}
          </span>
          <span className="font-headline-sm text-[13px] text-slate-800 font-medium truncate leading-tight group-hover:text-primary transition-colors mt-2">
            {formatMoney(price, "$")}
          </span>
        </div>
      </div>
      <button
        className="w-6 h-6 rounded bg-slate-50 text-slate-400 hover:bg-primary hover:text-white flex items-center justify-center transition-all border border-slate-200 flex-shrink-0 cursor-pointer"
        title="Add to Canvas"
        type="button"
        onClick={() =>
          addElements({
            brandName,
            materialIcon,
            description,
            category,
            canvasImageUrl,
            price,
          })
        }
        aria-label={`Add ${brandName} to canvas`}
      >
        <span className="material-symbols-outlined text-[15px]">add</span>
      </button>
    </div>
  );
};

export default PaletteItem;
