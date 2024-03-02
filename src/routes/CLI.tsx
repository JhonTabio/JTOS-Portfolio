import { useState, useEffect } from "react";
import { processCommand } from "../utils/utils";
import CommandInput from "../components/CommandInput"
import "./CLI.css"

function CLI()
{
  const [cmdValue, setCmdValue] = useState("");
  const [cmdHistory, setList] = useState<string[]>([""]);
  const [cmdHistoryFull, setListFull] = useState<string[]>([""]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleOnChange = (newValue: string) => {
    setCmdValue(newValue);
    cmdHistory[0] = newValue;
    cmdHistoryFull[0] = newValue;
    setHistoryIndex(0);
  };

  const handleKeyDown = () => {
    setList(currentList => [...currentList, cmdValue]);
    if(cmdValue != "") setListFull(currentList => [...currentList, cmdValue]);

    if(cmdValue.toUpperCase() == "CLEAR") setList([]);

    setCmdValue("");
    setHistoryIndex(0);
    cmdHistoryFull[0] = "";
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp')
        setHistoryIndex((prevIndex) => (prevIndex === 0 ? cmdHistoryFull.length - 1 : (prevIndex - 1 === 0 ? 1 : prevIndex - 1)));
      else if (event.key === 'ArrowDown')
        setHistoryIndex((prevIndex) => (prevIndex === cmdHistoryFull.length - 1 ? 0 : (prevIndex === 0 ? 0 : prevIndex + 1)));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cmdHistory.length]);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="terminal">
        <ul id="history">
          {cmdHistory.slice(1).map((item, index) => (
            <li key={index}>
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
                &nbsp;~
              </span>]$
              <span className="command">&nbsp;{item}</span>
              <br/>
              {processCommand(item)}
              </li>
          ))}
        </ul>
        <CommandInput value={cmdHistoryFull[historyIndex]} onChange={handleOnChange} onKeyDown={handleKeyDown}/>
      </div>
    </>
  )
}

export default CLI
