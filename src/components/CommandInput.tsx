import { currentDirectory, listOtherDir } from "../utils/utils";
import { CMDS, commandProcess } from "../utils/commandProcessUtils";
import { useState, useEffect } from "react";
import CommandCWD from "./CommandCWD";

function CommandInput({cmdRef, setHistory, cmdHistory, setIndex}: {cmdRef: React.RefObject<HTMLInputElement>, setHistory: React.Dispatch<React.SetStateAction<React.ReactNode[]>>, cmdHistory: React.ReactNode[], setIndex: React.Dispatch<React.SetStateAction<number>>})
{
  const [currIndex, setCurrIndex] = useState<number>(0);

  useEffect(() => {
    cmdRef.current?.scrollIntoView();
  }, [cmdHistory.length])

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>):void
  {

    if(!cmdRef.current) return;

    if(e.key === "Tab")
    {
      e.preventDefault();

      const options = onAutoComplete(cmdRef.current.value);

      if(options.length === 1)
      {
        const option = options[0].trim();

        let split = cmdRef.current.value.split(" ");

        if(split.length === 1)
        {
          cmdRef.current.value = option;
          return;
        }

        let res = split[0] + " ";

        let process = split[1];
        
        if(process.includes('/')) res += process.substring(0, process.lastIndexOf('/') + 1);

        const char = split[0] === "help" ? '' : '/';
        cmdRef.current.value = option.includes('.') ? 
          res + option : res + option + char;
      }
      else if(options.length >= 2)
      {
        const cmd = cmdRef.current.value;
        const cwd = currentDirectory.name;

        setHistory((oldHistory) => [...oldHistory,
          <li key={oldHistory.length} className="cli_autoComplete" data-cmd={cmd}>
            <CommandCWD cwd={cwd}/>
            &nbsp;<span id="cli_command">{cmd}</span><br/>
            {options.join(" ")}
          </li>]
        );
      }
      return;
    }

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

    var newIndex = currIndex;

    if(cmdRef.current.placeholder === "" && currIndex === cmdHistory.length)
      cmdRef.current.placeholder = cmdRef.current.value;

    if (e.key === "ArrowUp")
      do
      {
        if(newIndex === 0)
        {
          newIndex = currIndex;
          break;
        }

        newIndex = newIndex === 0 ? 0 : newIndex - 1;
      }
      while((cmdHistory[newIndex] as React.ReactElement)["props"]["children"][2]["props"]["children"] === ""
        || (cmdHistory[newIndex] as React.ReactElement)["props"]["className"] !== "cli_commandItem");
    else if (e.key === "ArrowDown")
      do
      {
        if(newIndex === cmdHistory.length)
        {
          newIndex = currIndex;
          break;
        }
      
        newIndex = newIndex === cmdHistory.length ? cmdHistory.length : newIndex + 1;
      }
      while(newIndex < cmdHistory.length && ((cmdHistory[newIndex] as React.ReactElement)["props"]["children"][2]["props"]["children"] === ""
        || (cmdHistory[newIndex] as React.ReactElement)["props"]["className"] !== "cli_commandItem"));

    if(newIndex === cmdHistory.length)
    {
      cmdRef.current.value = cmdRef.current.placeholder;
      cmdRef.current.placeholder = "";
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
        {commandProcess(cmd)}
      </li>]
    );

    if(cmd.trim() === "clear") setIndex(cmdHistory.length + 1);

    cmdRef.current.value = "";
    cmdRef.current.placeholder = "";
    setCurrIndex(cmdHistory.length + 1);
  }

  function onAutoComplete(cmd: string): string[]
  {
    if(cmd.trim() === "") return [];

    const parts = cmd.split(" ");

    // First arg should be a command
    if(parts.length === 1) return CMDS.filter((c) => c.startsWith(cmd));
    else if(parts.length === 2)
    {
      if(parts[0] === "help") return CMDS.filter((c) => c.startsWith(parts[1]));
      else 
      {
        if(parts[1].startsWith('/')) return [];

        let path: string;
        let complete: string;

        if(!parts[1].includes('/'))
        {
          path = "";
          complete = parts[1];
        }
        else 
        {
          path = parts[1].substring(0, parts[1].lastIndexOf('/'));
          complete = parts[1].substring(parts[1].lastIndexOf('/') + 1, parts[1].length);
        }

        const options = listOtherDir("./" + path);

        return options ? options.filter((c) => c.startsWith(complete)) : [];
      }
    }
    return [];
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
