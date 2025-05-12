import { ReactNode } from "react";

interface NotepadProps
{
  id: number;
  children: ReactNode;
}

export function Notepad({ children }: NotepadProps)
{
  return (
    <div className="gui_notepad_container">
      {children}
    </div>
  );
}
