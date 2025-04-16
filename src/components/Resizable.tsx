import { useRef, useState, useEffect } from "react";

type ResizeSides = {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
};

export function useResizable(
  sides: ResizeSides = {},
  setPosition: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>
)
{
  const ref = useRef<HTMLDivElement>(null);

  // Component size
  const [size, setSize] = useState({ width: window.innerWidth * 0.3, height: window.innerHeight * 0.4 });
  // Whether we are currently resizing
  const [resizing, setResizing] = useState<null | keyof ResizeSides>(null);

  // Initial states
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!resizing || !ref.current) return;

      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;

      let newWidth = startSize.current.width;
      let newHeight = startSize.current.height;

      if (resizing === "left")
      {
        newWidth -= dx;
        setPosition((prev) => ({ x: startPos.current.x + (startSize.current.width - Math.max(window.innerWidth * 0.25, newWidth)), y: prev.y }));
      }
      else if (resizing === "right")
        newWidth += dx;
      else if (resizing === "top")
      {
        newHeight -= dy;
        setPosition((prev) => ({ x: prev.x, y: startPos.current.y + (startSize.current.height - Math.max(100, newHeight)) }));
      }
      else if (resizing === "bottom")
        newHeight += dy;

      setSize({
        width: Math.max(window.innerWidth * 0.25, newWidth),
        height: Math.max(100, newHeight)
      });
    };

    const onMouseUp = () => {
      setResizing(null);
    };

    if (resizing)
    {
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
    startSize.current = {
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    };
    e.preventDefault();
    e.stopPropagation();
  };

  return {
    ref,
    size,
    startResize,
    sides
  };
}
