import { useEffect, useRef, useState } from "react";

export function useDraggable(initialPos = { x: 0, y: 0 })
{
  const ref = useRef<HTMLDivElement>(null);

  // Position relative to top left corner
  const [pos, setPos] = useState(initialPos);
  // Whether we are currently dragging
  const [dragging, setDragging] = useState(false);
  // Offset of the mouse vs pos
  const [rel, setRel] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging || !rel) return;
      setPos({
        x: e.pageX - rel.x,
        y: e.pageY - rel.y,
      });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    if (dragging)
    {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, rel]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setDragging(true);
    setRel({ x: e.pageX - rect.left, y: e.pageY - rect.top });
    e.stopPropagation();
    e.preventDefault();
  };

  return {
    ref,
    pos,
    onMouseDown,
  };
}
