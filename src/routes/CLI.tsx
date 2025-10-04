import { useState, useEffect, useRef, ReactNode} from "react";
import { commandProcess } from "../utils/commandProcessUtils.tsx";
import { initialize } from "../utils/utils.ts";
import BootSequence from "../components/BootSequence.tsx";
import CommandInput from "../components/CommandInput.tsx";
import "./CLI.css"

function CLI()
{
  useEffect(() => {
    initialize();
    document.title = "Jhon Tabio | Terminal"
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement
      if (favicon) favicon.href = "https://cdn-icons-png.freepik.com/512/14627/14627773.png?ga=GA1.1.1776313894.1759613306"
  }, []);

  const cmdRef = useRef<HTMLInputElement>(null);

  const [cmdHistory, setHistory] = useState<ReactNode[]>([
    <li key={0} className="cli_welcome">
      {commandProcess("welcome")}
    </li>]
  );
  const [historyIndex, setIndex] = useState<number>(0);

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
