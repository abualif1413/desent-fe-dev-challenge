import { FC, useEffect, useRef } from "react";
import Konva from "konva";
import { Image, Rect, Transformer } from "react-konva";
import useImage from "use-image";

import type { CanvasItemProps } from "@/utils/types";
import useStore from "@/hooks/use-store";

const CanvasItem: FC<CanvasItemProps> = ({
  imageElement,
  isSelected,
  onDragElement,
  onResizeElement,
  onSelect,
}) => {
  const [imageUrl, status] = useImage(imageElement.paletteItem.canvasImageUrl);
  const shapeRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const selectedItems = useStore((state) => state.selectedItems);
  const setSelectedItem = useStore((state) => state.setSelectedItem);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  if (status === "failed") {
    return <Rect x={imageElement.x} y={imageElement.y} width={imageElement.width} height={imageElement.height} stroke="red" />;
  }

  return (
    <>
      <Image
        ref={shapeRef}
        x={imageElement.x}
        y={imageElement.y}
        image={imageUrl}
        width={imageElement.width}
        height={imageElement.height}
        onClick={onSelect}
        onTap={onSelect}
        draggable
        onDragStart={() => {
          if (!isSelected) {
            onSelect();
          }
        }}
        onDragEnd={(e) => {
          onDragElement({ x: e.target.x(), y: e.target.y() });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;

          if (!node) {
            return;
          }

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onResizeElement({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
        onMouseEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onMouseLeave={() => {
          document.body.style.cursor = "default";
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          borderStroke="#2563eb"
          borderStrokeWidth={1.5}
          borderDash={[4, 4]}
          anchorFill="#ffffff"
          anchorStroke="#2563eb"
          anchorStrokeWidth={1.5}
          anchorSize={10}
          anchorCornerRadius={2}
          rotateEnabled={false}
        />
      )}
    </>
  );
};

export default CanvasItem;
