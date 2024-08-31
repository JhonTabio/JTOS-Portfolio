import { currentDirectory } from "../utils/utils";

function CommandInput({value, onKeyDown, onChange}: {value: string, onKeyDown: () => void, onChange: (value: string) => void})
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
          &nbsp;<input id="cli_commandInput" name="cmd" type="text" 
          value={value} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {if(e.key === "Enter")onKeyDown()}}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} 
          autoFocus/>
        </span>
      </div>
  );
}

export default CommandInput;
