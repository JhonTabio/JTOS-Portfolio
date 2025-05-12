import { changeDirectories } from "../utils/utils";
import { useWindowManager } from "./WindowContext";

interface Tab
{
  value: string;
  label: string;
  content: JSX.Element;
}

interface TabsProps
{
  id: number;
  tabs: Tab[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export function Tabs({ id, tabs, activeTab, setActiveTab }: TabsProps)
{
  const { renameWindow } = useWindowManager();

  return (
    <div className="gui_tabs-container">
      <div className="gui_tabs-header">
        <h2 className="gui_header">JTOS File Explorer</h2>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`gui_tab-button ${activeTab === tab.value ? "active" : ""}`}
            onClick={() => {setActiveTab(tab.value); changeDirectories(tab.value); renameWindow(id, tab.label)}}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="gui_tabs-content">
        {tabs.map((tab) =>
          tab.value === activeTab ? (
            <div key={tab.value} className="gui_tab-panel">
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
