import { createContext, useContext, useState } from "react";

type WindowEntry = {
  id: number;
  title: string;
  content: React.ReactNode;
  app: string;
  icon: JSX.Element;
  zIndex: number;
  minimized: boolean;
  focus: boolean;
};

type WindowManagerContext = {
  windows: WindowEntry[];
  createWindow: (title: string, content: (id: number) => React.ReactNode, app: string, icon: JSX.Element) => void;
  closeWindow: (id: number) => void;
  focusWindow: (id: number) => void;
  toggleWindow: (id: number) => void;
  renameWindow: (id: number, name: string) => void;
};

export const WindowContext = createContext<WindowManagerContext | null>(null);

export const useWindowManager = () => {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error("useWindowManager must be used within a WindowContext.Provider");
  return ctx;
};

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowEntry[]>([]);

  const createWindow = (title: string, content: (id: number) => React.ReactNode, app: string, icon: JSX.Element) => {
    const id = Date.now();

    setWindows((prev) => {
      const maxZ = Math.max(0, ...prev.map(w => w.zIndex));
      const updated = prev.map(w => ({ ...w, focus: false }));
      return [
        ...updated,
        {
          id: id,
          title,
          content: content(id),
          app: app,
          icon: icon,
          zIndex: maxZ + 1,
          minimized: false,
          focus: true
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
        { ...w, zIndex: maxZ + 1, minimized: false, focus: true } : {...w, focus: false}
      );
    });
  };

  const toggleWindow = (id: number) => {
    setWindows((prev) => {
      return prev.map(w => {
        if (w.id === id) {
          const minimized = !w.minimized;
          if(!minimized) focusWindow(id);
          return {
            ...w,
            minimized: minimized,
            focus: !minimized
          };
        }
        return { ...w, focus: false };
      });
    });
  };

  const renameWindow = (id: number, name: string) => {
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, title: name } : w)
    );
  }

  return (
    <WindowContext.Provider value={{ windows, createWindow, closeWindow, focusWindow, toggleWindow, renameWindow }}>
      {children}
    </WindowContext.Provider>
  );
};
