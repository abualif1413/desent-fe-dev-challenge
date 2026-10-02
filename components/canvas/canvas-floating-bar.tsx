import classNames from "classnames";
import { FC } from "react";

import useStore from "@/hooks/use-store";

interface PillsProps {
  caption: string;
  materialIcon: string;
  onClick: () => void;
  isDisabled?: boolean;
}

const Pills: FC<PillsProps> = ({
  caption,
  materialIcon,
  onClick,
  isDisabled,
}) => {
  return (
    <button
      className={classNames(
        "px-2.5 py-1 rounded-full text-slate-600 font-label-sm text-label-sm flex items-center gap-1 transition-all",
        {
          "hover:text-slate-900 hover:bg-slate-100": !isDisabled,
          "opacity-30": isDisabled
        },
      )}
      type="button"
      onClick={onClick}
    >
      <span className="material-symbols-outlined text-[15px]">
        {materialIcon}
      </span>
      <span className="hidden md:inline">{caption}</span>
    </button>
  );
};

const CanvasFloatingBar: FC = () => {
  const sendToBack = useStore((state) => state.sendToBack);
  const bringToFront = useStore((state) => state.bringToFront);
  const removeItem = useStore((state) => state.removeItem);
  const selectedItems = useStore((state) => state.selectedItems);
  const hasAnyChanges = useStore((state) => state.hasAnyChanges);
  const saveChanges = useStore((state) => state.saveChanges);

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-floating-element bg-white/95 backdrop-blur-xl px-2 py-1.5 rounded-full shadow-lg border border-slate-200/90 flex items-center gap-1">
      <Pills
        caption="Bring to Front"
        materialIcon="flip_to_front"
        onClick={bringToFront}
        isDisabled={!selectedItems.length}
      />
      <Pills
        caption="Send to Back"
        materialIcon="flip_to_back"
        onClick={sendToBack}
        isDisabled={!selectedItems.length}
      />
      <div className="w-[1px] h-5 bg-slate-200 mx-1"></div>
      <Pills
        caption="Remove Item"
        materialIcon="backspace"
        onClick={removeItem}
        isDisabled={!selectedItems.length}
      />
      <div className="w-[1px] h-5 bg-slate-200 mx-1"></div>
      <Pills
        caption="Save Changes"
        materialIcon="save"
        onClick={saveChanges}
        isDisabled={!hasAnyChanges}
      />
    </div>
  );
};

export default CanvasFloatingBar;
