import { useState, useEffect, useRef, ReactNode} from "react";
import BootSequence from "../components/BootSequence.tsx";
import CommandInput from "../components/CommandInput.tsx";
import "./CLI.css"
import { commandProcess } from "../utils/commandProcessUtils.tsx";
import { initialize } from "../utils/utils.ts";

function CLI()
{
  const cmdRef = useRef<HTMLInputElement>(null);

  const [cmdHistory, setHistory] = useState<ReactNode[]>([
    <li key={0} className="cli_welcome">
      {commandProcess("welcome")}
    </li>]
  );
  const [historyIndex, setIndex] = useState<number>(0);

  useEffect(() => {
    initialize();
  }, []);

  return(
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="cli_container" onClick={() => cmdRef.current!.focus({preventScroll: true})}>
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
