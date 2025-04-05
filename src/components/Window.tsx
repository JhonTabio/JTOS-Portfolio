import { ReactNode } from "react";
import { useDraggable } from "./Draggable";

interface WindowProps
{
  title: string;
  children: ReactNode;
  initialPos?: { x: number, y: number };
}

export function Window({ title, children, initialPos }: WindowProps)
{
  const { ref, pos, onMouseDown } = useDraggable(initialPos);

  return (
    <div ref={ref}
      style={{ left: pos.x, top: pos.y }}
      className="gui_window"
    >
      <div
        onMouseDown={onMouseDown}
        className="gui_window_bar"
      >
        {title}
      </div>
      <div className="gui_window_content">{children}</div>
    </div>
  );
}
