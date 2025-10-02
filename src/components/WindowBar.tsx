import { useWindowManager } from "./WindowContext";

export function WindowBar()
{
  const { windows, toggleWindow, focusWindow } = useWindowManager();

  return (
    <div className="gui_windowbar">
      {windows.map((tab) => (
        <div className={`gui_windowbar_element ${tab.focus ? "focused" : ""}`}
          onClick={() => {tab.focus ? toggleWindow(tab.id) : focusWindow(tab.id)}}>{tab.title}</div>
      ))}
    </div>
  );
}
