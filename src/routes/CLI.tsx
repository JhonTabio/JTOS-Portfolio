import { useState, useRef } from "react";
import BootSequence from "../components/BootSequence.tsx";
import CommandInput from "../components/CommandInput.tsx";
import "./CLI.css"

function CLI()
{
  const cmdRef = useRef<HTMLInputElement>(null);

  const [cmdHistory, setHistory] = useState<React.ReactNode[]>([]);

  return(
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="cli_container" onClick={() => cmdRef.current!.focus()}>
        <BootSequence/>
        <div id="cli_terminal">
          <ul id="cli_history">
            {cmdHistory.map((cmd) => cmd)}
          </ul>
          <CommandInput cmdRef={cmdRef} setHistory={setHistory} cmdHistory={cmdHistory}/>
        </div>
      </div>
    </>
  );
}

export default CLI;
