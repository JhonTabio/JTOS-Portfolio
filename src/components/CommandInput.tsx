import CommandCWD from "./CommandCWD";
import { currentDirectory } from "../utils/utils";

function CommandInput({cmdRef, setHistory, cmdHistory}: {cmdRef: React.RefObject<HTMLInputElement>, setHistory: React.Dispatch<React.SetStateAction<React.ReactNode[]>>, cmdHistory: React.ReactNode[]})
{

  function onSubmit(e: React.FormEvent<HTMLFormElement>):void
  {
    e.preventDefault(); 

    if(!cmdRef.current) return;

    const cmd = cmdRef.current.value;
    const cwd = currentDirectory.name;

    setHistory((oldHistory) => [...oldHistory,
      <li key={oldHistory.length} className="cli_commandItem">
        <CommandCWD cwd={cwd}/>
        &nbsp;<span id="cli_command">{cmd}</span><br/>
      </li>]
    );
    
    cmdRef.current!.value = "";
  }

  return(
      <div id="cli_cl">
        <CommandCWD cwd={currentDirectory.name}/>
        <span id="cli_command" style={{display: "flex", flexGrow: 1}}>
          &nbsp;

          <form style={{display: "flex", flexGrow: 1}} onSubmit={onSubmit}>
            <input id="cli_commandInput" name="cmd" type="text" ref={cmdRef} placeholder=""/>
          </form>
        </span>
      </div>
  );
}

export default CommandInput;
