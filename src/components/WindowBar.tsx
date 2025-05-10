import { useWindowManager } from "./WindowContext";

export function WindowBar()
{
  const { windows } = useWindowManager();

  return (
    <div className="gui_windowbar">
      {windows.map((tab) => (
        <div className={`gui_windowbar_element ${tab.zIndex ? "active" : ""}`}>{tab.title}</div>
      ))}
    </div>
  );
}
