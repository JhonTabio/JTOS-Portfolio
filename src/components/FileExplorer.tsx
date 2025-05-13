import { useState } from "react";
import { fileSystem, FileSystemItem, changeDirectories, folderIcon, fileIcon } from "../utils/utils";
import { useWindowManager } from "./WindowContext";
import { Card } from "../components/Card";
import { Tabs } from "./Tabs";
import { Notepad } from "./Notepad";
import { Project } from "./Project";
import { TEXTS } from "../assets/texts";

export function FileExplorer({id}: { id: number })
{
  const files: FileSystemItem[] = fileSystem.children ?? [];
  const tabs = [
    {
      value: fileSystem.name,
      label: "Home",
      content: (
        <div className="gui_icon_container">
          {files.map((item: FileSystemItem, i: number) => (
            <Card key={i} onClick={() => {openFile(item)}}>
              {item.type === "directory" ?  folderIcon : fileIcon} {item.name}
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
          <div className="gui_icon_container">
            {folder.children?.map((item, i) => (
              <Card key={i} onClick={() => {openFile(item)}}>
                {item.type === "directory" ?  folderIcon : fileIcon} {item.name}
              </Card>
            )) ?? <p>No content</p>}
          </div>
        )
      }))
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.value);
  const { createWindow, renameWindow } = useWindowManager();

  const openFile = (item: FileSystemItem) => {
    if(item.type === "directory")
    {
      setActiveTab(item.name);
      changeDirectories(item.name);
      renameWindow(id, item.name);
      return;
    }

    const [fileName, fileType] = item.name.split('.');

    if(fileType === "txt")
    {
      const content = (id: number) => <Notepad id={id}>{TEXTS[activeTab + "_" + fileName].gui}</Notepad>;
      createWindow(fileName, content);
    }

    else if(fileType === "proj")
      createWindow(fileName, (id: number) => <Project id={id} project={item.name}/>);
  }

  return (
    <div className="gui_file_explorer_container">
      <Tabs id={id} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  );
}
