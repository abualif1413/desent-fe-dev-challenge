import groupBy from "lodash/groupBy";
import { FC } from "react";

import type { PaletteMainProps } from "@/utils/types";

import PaletteGroup from "./palette-group";

const PaletteMain: FC<PaletteMainProps> = ({ paletteItems = [] }) => {
  const paletteInGroup = groupBy(paletteItems, "category");
  return (
    <div className="flex-1 overflow-y-auto p-space-sm space-y-space-sm">
      {Object.entries(paletteInGroup).map(([groupName, groupItems]) => (
        <PaletteGroup
          key={groupName}
          groupName={groupName}
          paletteItems={groupItems}
          materialIcon={groupItems[0].materialIcon}
        />
      ))}
    </div>
  );
};

export default PaletteMain;
