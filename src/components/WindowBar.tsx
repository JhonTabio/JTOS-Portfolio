import { useWindowManager } from "./WindowContext";

export function WindowBar()
{
  const { windows, toggleWindow } = useWindowManager();

  return (
    <div className="gui_windowbar">
      {windows.map((tab) => (
        <div className={`gui_windowbar_element ${tab.focus ? "focused" : ""}`}
          onClick={() => {toggleWindow(tab.id)}}>{tab.title}</div>
      ))}
    </div>
  );
}
