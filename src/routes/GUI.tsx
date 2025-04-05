import { useState } from "react";
import { Tabs } from "../components/Tabs";
import { Window } from "../components/Window";
import "./GUI.css"
import { FileExplorer } from "../components/FileExplorer";


function GUI()
{
  const [windows, setWindows] = useState<{ id: number; title: string }[]>([]);

  const createWindow = () => {
    setWindows((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: `Window ${prev.length + 1}`
      }
    ]);
  }
  
  const closeWindow = (id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  return(
    <>
      <div id="gui_container">
        <button onClick={createWindow} style={{ margin: 10 }}>
          Open Window
        </button>
        {windows.map((win) => (
          <Window
            key={win.id}
            title={win.title}
            initialPos={{ x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 }}
            onClose={() => closeWindow(win.id)}
          >
            <FileExplorer/>
          </Window>
        ))}
      </div>
    </>
  );
}

export default GUI;
