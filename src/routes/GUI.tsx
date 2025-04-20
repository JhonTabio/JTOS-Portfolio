import { Window } from "../components/Window";
import { FileExplorer } from "../components/FileExplorer";
import { useWindowManager } from "../components/WindowContext";
import "./GUI.css"


function GUI()
{
  const { windows, createWindow } = useWindowManager();

  return(
    <>
      <div id="gui_container">
        <button onClick={() => createWindow("Test", <FileExplorer/>)} style={{ margin: 10 }}>
          Open Window
        </button>
        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            zIndex={win.zIndex}
          >
            {win.content}
          </Window>
        ))}
      </div>
    </>
  );
}

export default GUI;
