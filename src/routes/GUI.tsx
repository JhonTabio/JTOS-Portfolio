import { useEffect } from "react";
import { initialize } from "../utils/utils";
import { useWindowManager } from "../components/WindowContext";
import { Window } from "../components/Window";
import { FileExplorer } from "../components/FileExplorer";
import { WindowBar } from "../components/WindowBar";
import "./GUI.css"


function GUI()
{
  useEffect(() => {
    initialize();
    document.title = "Jhon Tabio | Desktop"

    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement
      if (favicon) favicon.href = "https://cdn-icons-png.freepik.com/512/14529/14529714.png?ga=GA1.1.1776313894.1759613306";
  }, []);

  const { windows, createWindow } = useWindowManager();

  return(
    <>
      <div id="gui_container">
        <button onClick={() => createWindow("Home", (id) => <FileExplorer id={id}/>)} style={{ margin: 10 }}>
          Open Window
        </button>
        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            zIndex={win.zIndex}
            minimized={win.minimized}
            focused={win.focus}
          >
            {win.content}
          </Window>
        ))}
        <WindowBar/>
      </div>
    </>
  );
}

export default GUI;
