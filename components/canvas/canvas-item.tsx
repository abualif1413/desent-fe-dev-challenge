import { FC, useEffect, useRef } from "react";
import Konva from "konva";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

import type { CanvasItemProps } from "@/utils/types";

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

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  if (status !== "loaded") {
    return null;
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
        draggable={isSelected}
        onClick={onSelect}
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

          // Reset scale and bake it into width/height instead
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
