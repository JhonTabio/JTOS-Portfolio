import { useState, useRef, ReactNode} from "react";
import BootSequence from "../components/BootSequence.tsx";
import CommandInput from "../components/CommandInput.tsx";
import "./CLI.css"

function CLI()
{
  const cmdRef = useRef<HTMLInputElement>(null);

  const [cmdHistory, setHistory] = useState<ReactNode[]>([]);
  const [historyIndex, setIndex] = useState<number>(0);

  return(
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="cli_container" onClick={() => cmdRef.current!.focus()}>
        <BootSequence/>
        <div id="cli_terminal">
          <ul id="cli_history">
            {cmdHistory.slice(historyIndex).map((cmd) => cmd)}
          </ul>
          <CommandInput cmdRef={cmdRef} setHistory={setHistory} cmdHistory={cmdHistory} setIndex={setIndex}/>
        </div>
      </div>
    </>
  );
}

export default CLI;
