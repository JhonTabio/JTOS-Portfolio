import React, { useState } from "react";
import { processCommand } from "./utils/utils";
import CommandInput from "./components/CommandInput"
import "./App.css"

function App()
{
  const [cmdValue, setCmdValue] = useState("");
  const [cmdHistory, setList] = useState<string[]>([]);

  const handleOnChange = (newValue: string) => {
    setCmdValue(newValue);
  };

  const handleKeyDown = () => {
    setList(currentList => [...currentList, cmdValue]);
    setCmdValue("");
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="terminal">
        <ul id="history">
          {cmdHistory.map((item, index) => (
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
        <CommandInput value={cmdValue} onChange={handleOnChange} onKeyDown={handleKeyDown}/>
      </div>
    </>
  )
}

export default App
