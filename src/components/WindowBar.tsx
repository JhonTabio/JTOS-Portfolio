import { useWindowManager } from "./WindowContext";
import { useLocation } from "wouter";

export function WindowBar()
{
  const [_, setLocation] = useLocation();
  const { windows, toggleWindow, focusWindow } = useWindowManager();

  return (
    <div className="gui_windowbar">
      <button onClick={() => setLocation("/")}>Shut down</button>
      {windows.map((tab) => (
        <div className={`gui_windowbar_element ${tab.focus ? "focused" : ""}`}
          onClick={() => {tab.focus ? toggleWindow(tab.id) : focusWindow(tab.id)}}>{tab.title}</div>
      ))}
    </div>
  );
}
