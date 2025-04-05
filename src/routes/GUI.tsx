import { fileSystem, currentDirectory, FileSystemItem } from "../utils/utils";
import { Card } from "../components/Card";
import { Tabs } from "../components/Tabs";
import { Window } from "../components/Window";
import "./GUI.css"
import { useState } from "react";


function GUI()
{
  const folder_icon = <svg className="gui_icon" viewBox="0 0 512 512">
    <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/>
  </svg>;
  const file_icon = <svg className="gui_icon" viewBox="0 0 384 512">
    <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z"/>
  </svg>;

  const files: FileSystemItem[] = currentDirectory.children ?? [];
  const tabs = [
    {
      value: fileSystem.name,
      label: "Home",
      content: (
        <div
          style={{
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "repeat(auto-fit, 150px)"
          }}
        >
          {files.map((item: FileSystemItem, i: number) => (
            <Card key={i}>
              {item.type === "directory" ?  folder_icon : file_icon} {item.name}
            </Card>
          ))}
        </div>
      ),
    },
    ...files
      .filter((item) => item.type === "directory")
      .map((folder) => ({
        value: folder.name,
        label: folder.name,
        content: (
          <div
            style={{
              display: "grid",
              gap: "12px",
              gridTemplateColumns: "repeat(auto-fit, 150px)",
            }}
          >
            {folder.children?.map((item, i) => (
              <Card key={i}>
                {item.type === "directory" ?  folder_icon : file_icon} {item.name}
              </Card>
            )) ?? <p>No content</p>}
          </div>
        )
      }))
  ];

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
            Hello {win.title}!
          </Window>
        ))}
        <Tabs tabs={tabs}/>
      </div>
    </>
  );
}

export default GUI;
