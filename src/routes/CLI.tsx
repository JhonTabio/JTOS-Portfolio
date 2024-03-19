import { useState, useEffect } from "react";
import CommandInput from "../components/CommandInput"
import CommandHistory from "../components/CommandHistory";
import "./CLI.css"
import { processCommand } from "../utils/utils";

function CLI()
{
  const [cmdValue, setCmdValue] = useState("");
  const [cmdHistory, setList] = useState<string[]>([""]);
  const [cmdHistoryFull, setListFull] = useState<string[]>([""]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [currentDir] = useState("~");

  const handleOnChange = (newValue: string) => {
    setCmdValue(newValue);
    cmdHistory[0] = newValue;
    cmdHistoryFull[0] = newValue;
    setHistoryIndex(0);
  };

  const handleKeyDown = () => {
    setList(currentList => [...currentList, cmdValue]);
    if(cmdValue != "") setListFull(currentList => [...currentList, cmdValue]);

    if(cmdValue.toUpperCase() == "CLEAR")
    {
      setList([]);
      
      const welcome = document.getElementById("welcome")

      if(welcome) welcome.remove();
    }

    setCmdValue("");
    setHistoryIndex(0);
    cmdHistoryFull[0] = "";

    if(window.innerWidth > 768) window.scrollTo(0, document.body.scrollHeight);
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if(window.innerWidth > 768) window.scrollTo(0, document.body.scrollHeight);
      if (event.key === 'ArrowUp')
      {
        event.preventDefault();
        setHistoryIndex((prevIndex) => (prevIndex === 0 ? cmdHistoryFull.length - 1 : (prevIndex - 1 === 0 ? 1 : prevIndex - 1)));
        setCmdValue(cmdHistoryFull[historyIndex]);
      }
      else if (event.key === 'ArrowDown')
      {
        event.preventDefault();
        setHistoryIndex((prevIndex) => (prevIndex === cmdHistoryFull.length - 1 ? 0 : (prevIndex === 0 ? 0 : prevIndex + 1)));
        setCmdValue(cmdHistoryFull[historyIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cmdHistoryFull, cmdHistory.length, setHistoryIndex, historyIndex, setCmdValue, cmdValue]);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="terminal">
        <div id="welcome" className="command">
          {processCommand("welcome")}
        </div>
        <CommandHistory dir={currentDir} history={cmdHistory.slice(1)}/>
        <CommandInput dir={currentDir} value={cmdHistoryFull[historyIndex]} onChange={handleOnChange} onKeyDown={handleKeyDown}/>
        {cmdValue}
      </div>
    </>
  )
}

export default CLI
