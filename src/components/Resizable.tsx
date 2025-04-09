import { useRef, useState, useEffect } from "react";

type ResizeSides = {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
};

export function useResizable(sides: ResizeSides = {}) {
  const ref = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ width: 300, height: 200 });
  const [resizing, setResizing] = useState<null | keyof ResizeSides>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });
  const startOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!resizing || !ref.current) return;

      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;

      let newWidth = startSize.current.width;
      let newHeight = startSize.current.height;
      let newLeft = startOffset.current.x;
      let newTop = startOffset.current.y;

      if (resizing === "left")
      {
        newWidth -= dx;
        newLeft += dx;
      }
      else if (resizing === "right")
        newWidth += dx;
      else if (resizing === "top")
      {
        newHeight -= dy;
        newTop += dy;
      }
      else if (resizing === "bottom")
        newHeight += dy;

      setSize({
        width: Math.max(150, newWidth),
        height: Math.max(100, newHeight)
      });

      setOffset({
        x: newLeft,
        y: newTop
      });
    };

    const onMouseUp = () => {
      setResizing(null);
    };

    if (resizing) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [resizing]);

  const startResize = (side: keyof ResizeSides) => (e: React.MouseEvent) => {
    if (!ref.current) return;

    setResizing(side);
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = {
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    };
    startOffset.current = { ...offset};
    e.preventDefault();
    e.stopPropagation();
  };

  return {
    ref,
    size,
    offset,
    startResize,
    sides
  };
}
