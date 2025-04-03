import { fileSystem, currentDirectory, FileSystemItem } from "../utils/utils";
import { Card } from "../components/Card";
import { Tabs } from "../components/Tabs";
import "./GUI.css"


function GUI()
{
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
              {item.type === "directory" ? <p>FOLDER</p> : <p>FILE</p>} {item.name}
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
              gridTemplateColumns: "repeat(auto-fit, 150px)"
            }}
          >
            {folder.children?.map((item, i) => (
              <Card key={i}>
                {item.type === "directory" ? <p>FOLDER</p> : <p>FILE</p>} {item.name}
              </Card>
            )) ?? <p>No content</p>}
          </div>
        )
      }))
  ];

  return(
    <>
      <div id="gui_container">
        <h1 className="gui_header">JTOS File Explorer</h1>
        <Tabs tabs={tabs}/>
      </div>
    </>
  );
}

export default GUI;
