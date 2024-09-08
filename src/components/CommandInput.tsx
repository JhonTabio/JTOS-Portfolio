import CommandCWD from "./CommandCWD";
import { currentDirectory } from "../utils/utils";

function CommandInput({cmdRef, onSubmit}: {cmdRef: React.RefObject<HTMLInputElement>, onSubmit: () => void})
{

  return(
      <div id="cli_cl">
        <CommandCWD cwd={currentDirectory.name}/>
        <span id="cli_command" style={{display: "flex", flexGrow: 1}}>
          &nbsp;

          <form style={{display: "flex", flexGrow: 1}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => {e.preventDefault(); onSubmit(); cmdRef.current!.value = ""}}>
            <input id="cli_commandInput" name="cmd" type="text" ref={cmdRef}/>
          </form>
        </span>
      </div>
  );
}

export default CommandInput;
