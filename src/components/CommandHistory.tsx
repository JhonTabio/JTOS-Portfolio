import React from "react";
import CommandDir from "./CommandDir";
import CommandProcess from "./CommandProcess";

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
              <CommandProcess cmd={item}/>
            </li>
          ))}
        </ul>
    </>
  )
}

export default CommandHistory
