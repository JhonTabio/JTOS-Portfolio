import { Window } from "../components/Window";
import { FileExplorer } from "../components/FileExplorer";
import { WindowBar } from "../components/WindowBar";
import { useWindowManager } from "../components/WindowContext";
import { folderIcon } from "../utils/utils";
import "./GUI.css"


function GUI()
{
  const { windows, createWindow } = useWindowManager();

  return(
    <>
      <div id="gui_container">
        <button onClick={() => createWindow("Home", (id) => <FileExplorer id={id}/>, "FileExplorer", folderIcon)} style={{ margin: 10 }}>
          Open Window
        </button>
        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            app={win.app}
            icon={win.icon}
            zIndex={win.zIndex}
            minimized={win.minimized}
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
