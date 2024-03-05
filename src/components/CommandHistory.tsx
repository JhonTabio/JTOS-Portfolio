import React from "react";
import CommandDir from "./CommandDir";
import { processCommand } from "../utils/utils";

interface CommandHistory
{
  dir: string;
  history: string[];
}

const CommandHistory: React.FC<CommandHistory> = ({ dir, history }) => {
  return (
    <>
        <ul id="history">
          {history.map((item, index) => (
            <li key={index}>
              <CommandDir dir={dir}/>
              <span className="command">&nbsp;{item}</span>
              <br/>
              {processCommand(item)}
            </li>
          ))}
        </ul>
    </>
  )
}

export default CommandHistory
