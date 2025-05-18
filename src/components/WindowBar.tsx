import { useState } from "react";
import { useWindowManager } from "./WindowContext";

export function WindowBar()
{
  const { windows, toggleWindow } = useWindowManager();
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const grouped = windows.reduce((acc, win) => {
    if (!acc[win.app]) acc[win.app] = [];
    acc[win.app].push(win);
    return acc;
  }, {} as Record<string, typeof windows>);

 return (
    <div className="gui_windowbar">
      {Object.entries(grouped).map(([app, appWindows]) => (
        <div
          key={app}
          className="gui_windowbar_icon"
          onMouseEnter={() => setHoveredApp(app)}
          onMouseLeave={() => setHoveredApp(null)}
          onClick={() => { if (appWindows.length === 1) toggleWindow(appWindows[0].id) }}
        >
          {hoveredApp === app && (
            <div className="gui_windowbar_dropdown">
              {appWindows.map(win => (
                <div
                  key={win.id}
                  className={`gui_dropdown_item ${win.minimized ? "" : "opened"} ${win.focus ? "focused" : ""}`}
                  onClick={() => {toggleWindow(win.id)}}
                >
                  {win.title}
                </div>
              ))}
            </div>
          )}
          {appWindows[0].icon}

        </div>
      ))}
    </div>
  );
}
