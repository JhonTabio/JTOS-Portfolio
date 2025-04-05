import { ReactNode } from "react";
import { useDraggable } from "./Draggable";

interface WindowProps
{
  title: string;
  children: ReactNode;
  initialPos?: { x: number, y: number };
  onClose?: () => void;
}

export function Window({ title, children, initialPos, onClose }: WindowProps)
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
        {onClose && (
          <button 
            className="gui_window_close_btn" 
            onClick={(e) => {e.stopPropagation; onClose();}}
          >
            x
          </button>)
        }
      </div>
      <div className="gui_window_content">{children}</div>
    </div>
  );
}
