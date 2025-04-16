import { ReactNode } from "react";

interface NotepadProps
{
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
