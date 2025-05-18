import { useState } from "react";
import { useWindowManager } from "./WindowContext";
import { folderIcon } from "../utils/utils";
import { FileExplorer } from "./FileExplorer";

export function WindowBar()
{
  const { windows, createWindow, toggleWindow } = useWindowManager();
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const grouped = windows.reduce((acc, win) => {
    if (!acc[win.app]) acc[win.app] = [];
    acc[win.app].push(win);
    return acc;
  }, {} as Record<string, typeof windows>);

  const fileManagerWindows = grouped["FileExplorer"] || [];
  const otherApps = Object.keys(grouped).filter(app => app !== "FileExplorer");

  return (
    <>
      {hoveredApp && grouped[hoveredApp] && (
        <div className="gui_windowbar_panel">
          {grouped[hoveredApp].map((win) => (
            <div
              key={win.id}
              className={`gui_panel_item ${win.minimized ? "" : "opened"} ${win.focus ? "focused" : ""}`}
              onClick={() => toggleWindow(win.id)}
            >
              {win.title}
            </div>
          ))}
        </div>
      )}

      <div className="gui_windowbar">
        <div
          key="FileExplorer"
          className="gui_windowbar_icon"
          onMouseEnter={() => setHoveredApp("FileExplorer")}
          onMouseLeave={() => setHoveredApp(null)}
          onClick={() => {
            if (fileManagerWindows.length === 0)
              createWindow("Home", (id: number) => <FileExplorer id={id}/>, "FileExplorer", folderIcon);
            else if (fileManagerWindows.length === 1)
              toggleWindow(fileManagerWindows[0].id);
          }}
        >
          {folderIcon}
        </div>

        {otherApps.map((app) => {
          const appWindows = grouped[app] || [];

          if (appWindows.length === 0) return null;

          const icon = appWindows[0]?.icon;

          return (
            <div
              key={app}
              className="gui_windowbar_icon"
              onMouseEnter={() => setHoveredApp(app)}
              onMouseLeave={() => setHoveredApp(null)}
              onClick={() => {
                if (appWindows.length === 1) toggleWindow(appWindows[0].id);
              }}
            >
              {icon}
            </div>
          );
        })}
      </div>
    </>
  );
}
