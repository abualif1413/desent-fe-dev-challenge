import { FC, useMemo } from "react";
import { Layer, Stage } from "react-konva";

import useStore from "@/hooks/use-store";
import type { CanvasMainProps } from "@/utils/types";

import CanvasItem from "./canvas-item";

const CanvasMain: FC<CanvasMainProps> = ({ width, height }) => {
  const canvasElements = useStore((state) => state.items);
  const dragElement = useStore((state) => state.dragItem);
  const resizeElement = useStore((state) => state.resizeItem);
  const selectedItems = useStore((state) => state.selectedItems);
  const setSelectedItem = useStore((state) => state.setSelectedItem);

  return (
    <Stage
      draggable
      width={width}
      height={height}
      onMouseDown={(e) => {
        if (e.target === e.target.getStage()) setSelectedItem([]);
      }}
      onTouchStart={(e) => {
        if (e.target === e.target.getStage()) setSelectedItem([]);
      }}
    >
      <Layer>
        {canvasElements.map((element) => {
          return (
            <CanvasItem
              key={element.id}
              imageElement={element}
              isSelected={selectedItems.includes(element.id)}
              onDragElement={({ x, y }) => {
                dragElement({ x, y, id: element.id });
              }}
              onResizeElement={({ x, y, width, height }) => {
                resizeElement({ x, y, width, height, id: element.id });
              }}
              onSelect={() => {
                const selectedSet = new Set(selectedItems);
                selectedSet.add(element.id);

                setSelectedItem([...selectedSet]);
              }}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default CanvasMain;
