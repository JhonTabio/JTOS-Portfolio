function CommandCWD({cwd}: {cwd: string})
{
  return(
    <span id="cli_commandInputInfo">
      <span id="cli_[]">[</span>
      <span id="cli_client">
        client
      </span>
      <span id="cli_@">
        @
      </span>
      <span id="cli_server">
        portfolio
      </span>
      <span id="cli_directory">
        &nbsp;{cwd}
      </span>
      <span id="cli_[]">
        ]
      </span>
      <span id="cli_$">
        $
      </span>
    </span>
  );
}

export default CommandCWD;
