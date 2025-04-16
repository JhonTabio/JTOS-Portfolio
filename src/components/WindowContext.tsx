import { createContext, useContext, useState } from "react";

type WindowEntry = {
  id: number;
  title: string;
  content: React.ReactNode;
  zIndex: number;
};

type WindowManagerContext = {
  windows: WindowEntry[];
  createWindow: (title: string, content: React.ReactNode) => void;
  closeWindow: (id: number) => void;
  focusWindow: (id: number) => void;
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
    setWindows((prev) => {
      const maxZ = Math.max(0, ...prev.map(w => w.zIndex));
      return [
        ...prev,
        {
          id: Date.now(),
          title,
          content,
          zIndex: maxZ + 1
        }
      ];
    });
  };

  const closeWindow = (id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const focusWindow = (id: number) => {
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      return prev.map(w => w.id === id ? 
        { ...w, zIndex: maxZ + 1 } : w
      );
    });
  };

  return (
    <WindowContext.Provider value={{ windows, createWindow, closeWindow, focusWindow }}>
      {children}
    </WindowContext.Provider>
  );
};
