import { FC } from "react";

import type { PaletteGroupProps } from "@/utils/types";

import PaletteItem from "./palette-item";

const PaletteGroup: FC<PaletteGroupProps> = ({
  materialIcon,
  groupName,
  paletteItems = [],
}) => {
  return (
    <div className="space-y-space-sm mb-5">
      <div className="flex items-center justify-between px-1 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px] text-primary">
            {materialIcon}
          </span>
          <span className="font-label-sm text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            {groupName}
          </span>
        </div>
        <span className="font-label-sm text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
          {paletteItems.length}
        </span>
      </div>
      {paletteItems.map((paletteItemProps) => <PaletteItem key={paletteItemProps.brandName} {...paletteItemProps} />)}
    </div>
  );
};

export default PaletteGroup;
