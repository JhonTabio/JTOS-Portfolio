import { currentDirectory } from "../utils/utils";

function CommandInput({cmdRef, onSubmit}: {cmdRef: React.RefObject<HTMLInputElement>, onSubmit: () => void})
{

  return(
      <div id="cli_cl">
        <span id="cli_commandInputInfo">
          [<span id="cli_client">
            client
          </span>
          <span id="cli_@">
            @
          </span>
          <span id="cli_server">
            portfolio
          </span>
          <span id="cli_directory">
            &nbsp;{currentDirectory.name}
          </span>]$
        </span>
        <span id="cli_command">
          &nbsp;

          <form style={{display: "inline"}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => {e.preventDefault(); onSubmit(); cmdRef.current!.value = ""}}>
            <input id="cli_commandInput" name="cmd" type="text" ref={cmdRef} autoFocus/>
          </form>
        </span>
      </div>
  );
}

export default CommandInput;
