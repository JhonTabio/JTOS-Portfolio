import React from "react";
import CommandDir from "./CommandDir";
import { processCommand } from "../utils/utils";

interface CommandHistory
{
  history: string[];
}

const CommandHistory: React.FC<CommandHistory> = ({ history }) => {
  return (
    <>
        <ul id="history">
          {history.map((item, index) => (
            <li key={index}>
              <CommandDir/>
              <span className="command" style={{paddingLeft: 0}}>&nbsp;{item}</span>
              <br/>
              {processCommand(item)}
            </li>
          ))}
        </ul>
    </>
  )
}

export default CommandHistory
