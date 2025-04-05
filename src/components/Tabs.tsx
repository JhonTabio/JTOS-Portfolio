import { useState } from 'react';

interface Tab
{
  value: string;
  label: string;
  content: JSX.Element;
}

interface TabsProps
{
  tabs: Tab[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export function Tabs({ tabs, activeTab, setActiveTab }: TabsProps)
{
  return (
    <div className="gui_tabs-container">
      <div className="gui_tabs-header">
      <h1 className="gui_header">JTOS File Explorer</h1>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`gui_tab-button ${activeTab === tab.value ? "active" : ""}`}
            onClick={() => setActiveTab(tab.value)}
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
