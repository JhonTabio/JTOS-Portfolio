import { ReactNode } from "react";
import { useDraggable } from "./Draggable";
import { useResizable } from "./Resizable";

interface WindowProps
{
  title: string;
  children: ReactNode;
  initialPos?: { x: number, y: number };
  resizableSides?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  };
  zIndex: number;
  onClose?: (id: number) => void;
  onFocus?: (id: number) => void;
}

export function Window({
  title,
  children,
  initialPos,
  resizableSides = { left: true, right: true, top: true, bottom: true },
  zIndex,
  onClose,
  onFocus
}: WindowProps)
{

  const { ref: dragRef, pos, onMouseDown, setPosition } = useDraggable(initialPos);

  const { ref: resizeRef, size, startResize, sides } = useResizable(resizableSides, setPosition);

  function mergeRefs<T = any>(...refs: React.Ref<T>[]) {
    return (node: T) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") ref(node);
        else if (ref && typeof ref === "object" && "current" in ref)
          (ref as React.MutableRefObject<T | null>).current = node;
      });
    };
  }

  return (
    <div
      ref={mergeRefs(dragRef, resizeRef)}
      onMouseDown={onFocus}
      style={{ left: pos.x, top: pos.y, width: size.width, height: size.height, zIndex: zIndex }}
      className="gui_window"
    >
      <div
        onMouseDown={(e) => {onMouseDown(e); onFocus()}}
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
        {sides.left && (
          <div
            onMouseDown={startResize("left")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 10,
              height: "100%",
              cursor: "ew-resize",
            }}
          />
        )}
        {sides.right && (
          <div
            onMouseDown={startResize("right")}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 10,
              height: "100%",
              cursor: "ew-resize",
            }}
          />
        )}
        {sides.top && (
          <div
            onMouseDown={startResize("top")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 10,
              cursor: "ns-resize",
            }}
          />
        )}
        {sides.bottom && (
          <div
            onMouseDown={startResize("bottom")}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "100%",
              height: 10,
              cursor: "ns-resize",
            }}
          />
        )}
      </div>
      <div className="gui_window_content">{children}</div>
    </div>
  );
}
