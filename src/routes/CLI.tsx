import { useEffect, useState, useRef, useCallback } from "react";
import BootSequence from "../components/BootSequence.tsx";
import CommandCWD from "../components/CommandCWD.tsx";
import CommandInput from "../components/CommandInput.tsx";
import "./CLI.css"
import { currentDirectory } from "../utils/utils.ts";

function CLI()
{
  const cmdRef = useRef<HTMLInputElement>(null);

  const [cmdHistory, setHistory] = useState<JSX.Element[]>([]);

  function onSubmit():void
  {
    if(!cmdRef.current) return;

    const cmd = cmdRef.current.value;

    setHistory((oldHistory) => [...oldHistory,
      <li key={oldHistory.length} className="cli_commandItem">
        <CommandCWD/>
        &nbsp;{cmd}<br/>
      </li>]
    );

    currentDirectory.name = cmd;
  }

  return(
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="cli_container" onClick={() => cmdRef.current!.focus()}>
        <BootSequence/>
        <div id="cli_terminal">
          <ul id="cli_history">
            {cmdHistory.map((cmd) => cmd)}
          </ul>
          <CommandInput cmdRef={cmdRef} onSubmit={onSubmit}/>
        </div>
      </div>
    </>
  );
}

export default CLI;
