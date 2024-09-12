import { currentDirectory } from "../utils/utils";
import { useState } from "react";
import CommandCWD from "./CommandCWD";

function CommandInput({cmdRef, setHistory, cmdHistory, setIndex}: {cmdRef: React.RefObject<HTMLInputElement>, setHistory: React.Dispatch<React.SetStateAction<React.ReactNode[]>>, cmdHistory: React.ReactNode[], setIndex: React.Dispatch<React.SetStateAction<number>>})
{
  const [currIndex, setCurrIndex] = useState<number>(0);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>):void
  {

    if(!cmdRef.current) return;

    if(e.key !== "ArrowUp" && e.key !== "ArrowDown") 
    {

      if(e.key !== "ArrowLeft" && e.key !== "ArrowRight")
        if(cmdRef.current.placeholder !== "")
        {
          cmdRef.current.placeholder = "";
          setCurrIndex(cmdHistory.length);
        }

      return;
    }

    var newIndex = 0;

    if(cmdRef.current.placeholder === "" && currIndex === cmdHistory.length)
      cmdRef.current.placeholder = cmdRef.current.value;

    if (e.key === "ArrowUp")
      newIndex = currIndex === 0 ? 0 : currIndex - 1;
    else if (e.key === "ArrowDown")
      newIndex = currIndex === cmdHistory.length ? cmdHistory.length : currIndex + 1;

    if(newIndex === cmdHistory.length)
    {
      cmdRef.current.value = cmdRef.current.placeholder;
      cmdRef .current.placeholder = "";
    }
    else
      cmdRef.current.value = (cmdHistory[newIndex] as React.ReactElement)["props"]["children"][2]["props"]["children"];
    
    setCurrIndex(newIndex);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>):void
  {
    e.preventDefault(); 

    if(!cmdRef.current) return;

    const cmd = cmdRef.current.value;
    const cwd = currentDirectory.name;

    setHistory((oldHistory) => [...oldHistory,
      <li key={oldHistory.length} className="cli_commandItem" data-cmd={cmd}>
        <CommandCWD cwd={cwd}/>
        &nbsp;<span id="cli_command">{cmd}</span><br/>
      </li>]
    );

    if(cmd === "clear") setIndex(cmdHistory.length + 1);
    
    cmdRef.current.value = "";
    cmdRef.current.placeholder = "";
    setCurrIndex(cmdHistory.length + 1);
  }

  return(
      <div id="cli_cl">
        <CommandCWD cwd={currentDirectory.name}/>
        <span id="cli_command" style={{display: "flex", flexGrow: 1}}>
          &nbsp;

          <form style={{display: "flex", flexGrow: 1}} onSubmit={onSubmit}>
            <input id="cli_commandInput" name="cmd" type="text" ref={cmdRef} onKeyDown={onKeyDown} placeholder=""/>
          </form>
        </span>
      </div>
  );
}

export default CommandInput;
