import { useState } from "react";
import { fileSystem, currentDirectory, FileSystemItem, changeDirectory, changeDirectories } from "../utils/utils";
import { useWindowManager } from "./WindowContext";
import { Card } from "../components/Card";
import { Tabs } from "./Tabs";
import { Notepad } from "./Notepad";
import { Project } from "./Project";
import { TEXTS } from "../assets/texts";

export function FileExplorer()
{
  const folder_icon = <svg className="gui_icon" viewBox="0 0 512 512" fill="#6e54a6">
    <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/>
  </svg>;
  const file_icon = <svg className="gui_icon" viewBox="0 0 384 512" fill="#604996">
    <path  d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z"/>
  </svg>;

  const files: FileSystemItem[] = fileSystem.children ?? [];
  const tabs = [
    {
      value: fileSystem.name,
      label: "Home",
      content: (
        <div className="gui_icon_container">
          {files.map((item: FileSystemItem, i: number) => (
            <Card key={i} onClick={() => {openFile(item)}}>
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
          <div className="gui_icon_container">
            {folder.children?.map((item, i) => (
              <Card key={i} onClick={() => {openFile(item)}}>
                {item.type === "directory" ?  folder_icon : file_icon} {item.name}
              </Card>
            )) ?? <p>No content</p>}
          </div>
        )
      }))
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.value);
  const { createWindow } = useWindowManager();

  const openFile = (item: FileSystemItem) => {
    if(item.type === "directory")
    {
      setActiveTab(item.name);
      changeDirectories(item.name);
      return;
    }

    const [fileName, fileType] = item.name.split('.');

    if(fileType === "txt")
    {
      const content = <Notepad>{TEXTS[activeTab + "_" + fileName].gui}</Notepad>;
      createWindow(fileName, content);
    }

    else if(fileType === "proj")
    {
      console.log(item.name);
      createWindow(fileName, <Project project={item.name}/>);
    }


    return;
  }

  return (
    <div className="gui_file_explorer_container">
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  );
}
