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
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: 300,
        background: "#fff",
        border: "2px solid #aa5",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.2)"
      }}
      className="gui_window"
    >
      <div
        onMouseDown={onMouseDown}
        style={{
          background: "#ddd",
          padding: 10,
          fontWeight: "bold"
        }}
      >
        {title}
      </div>
      <div className="gui_window_content">{children}</div>
    </div>
  );
}
