import { createContext, useContext, useState } from "react";

type WindowEntry = {
  id: number;
  title: string;
  content: React.ReactNode;
};

type WindowManagerContext = {
  windows: WindowEntry[];
  createWindow: (title: string, content: React.ReactNode) => void;
  closeWindow: (id: number) => void;
};

export const WindowContext = createContext<WindowManagerContext | null>(null);

export const useWindowManager = () => {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error("useWindowManager must be used within a WindowContext.Provider");
  return ctx;
};

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowEntry[]>([]);

  const createWindow = (title: string, content: React.ReactNode) => {
    setWindows((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        content
      }
    ]);
  };

  const closeWindow = (id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <WindowContext.Provider value={{ windows, createWindow, closeWindow }}>
      {children}
    </WindowContext.Provider>
  );
};
