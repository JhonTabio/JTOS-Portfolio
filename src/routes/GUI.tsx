import { Window } from "../components/Window";
import { FileExplorer } from "../components/FileExplorer";
import { useWindowManager } from "../components/WindowContext";
import "./GUI.css"


function GUI()
{
  const { windows, createWindow, closeWindow } = useWindowManager();

  return(
    <>
      <div id="gui_container">
        <button onClick={() => createWindow("Test", <FileExplorer/>)} style={{ margin: 10 }}>
          Open Window
        </button>
        {windows.map((win) => (
          <Window
            key={win.id}
            title={win.title}
            initialPos={{ x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 }}
            onClose={() => closeWindow(win.id)}
          >
            {win.content}
          </Window>
        ))}
      </div>
    </>
  );
}

export default GUI;
