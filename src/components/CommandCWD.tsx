import { currentDirectory } from "../utils/utils";

function CommandCWD()
{

  return(
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
  );
}

export default CommandCWD;
