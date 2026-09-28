import { FC, useMemo } from "react";
import { Layer, Stage } from "react-konva";

import useStore from "@/hooks/use-store";
import type { CanvasMainProps } from "@/utils/types";

import CanvasItem from "./canvas-item";

const CanvasMain: FC<CanvasMainProps> = ({ width, height }) => {
  const canvasElements = useStore((state) => state.items);
  const dragElement = useStore((state) => state.dragItem);
  const resizeElement = useStore((state) => state.resizeItem);
  const selectedIndex = useStore((state) => state.selectedIndex);
  const setSelectedIndex = useStore((state) => state.setSelectedIndex);

  const renderedCanvas = useMemo(() => {
    return (
      <>
        {canvasElements.map((element, index) => {
          return (
            <CanvasItem
              key={`${element.paletteItem.brandName}_${index}`}
              imageElement={element}
              isSelected={selectedIndex.includes(index)}
              onDragElement={({ x, y }) => {
                dragElement({ x, y, index });
              }}
              onResizeElement={({ x, y, width, height }) => {
                resizeElement({ x, y, width, height, index });
              }}
              onSelect={() => {
                const newSelected = [...selectedIndex];
                if (!newSelected.includes(index)) {
                  newSelected.push(index);
                }
                setSelectedIndex(newSelected);
              }}
            />
          );
        })}
      </>
    );
  }, [canvasElements, selectedIndex, dragElement, resizeElement]);

  return (
    <Stage
      draggable
      width={width}
      height={height}
      onMouseDown={(e) => {
        if (e.target === e.target.getStage()) setSelectedIndex([]);
      }}
      onTouchStart={(e) => {
        if (e.target === e.target.getStage()) setSelectedIndex([]);
      }}
    >
      <Layer>
        {renderedCanvas}
      </Layer>
    </Stage>
  );
};

export default CanvasMain;
