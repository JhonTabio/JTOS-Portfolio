import React, { createContext, useContext, useState, ReactNode} from "react";

interface DirContextType
{
  dir: string;
  setDir: (newDir: string) => void;
}

interface DirContextProvider
{
  children: ReactNode;
}

const DirContext = createContext<DirContextType | undefined>(undefined);

export const DirProvider: React.FC<DirContextProvider>= ({ children }) => {
  const [dir, setDir] = useState("~");

  return (
    <DirContext.Provider value={{ dir, setDir }}>
      {children}
    </DirContext.Provider>
  );
};

export const useDir = (): DirContextType => {
  const context = useContext(DirContext);

  if (context === undefined)
    throw new Error("useDir must be used within a DirProvider");

  return context;
};

const CommandDir: React.FC = () => {
  const { dir } = useDir();

  return (
    <>
      [<span className="client">
        client
      </span>
      <span className="@">
        @
      </span>
      <span className="server">
        portfolio
      </span>
      <span className="directory">
        &nbsp;{dir}
      </span>]$
    </>
  )
}

export default CommandDir
