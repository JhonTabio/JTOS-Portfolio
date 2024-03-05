import React from "react";

interface CommandDir
{
  dir: string;
}

const CommandDir: React.FC<CommandDir> = ({ dir }) => {
  return (
    <>
      [<span className="client">
        client
      </span>
      <span className="@">
        @
      </span>
      <span className="server">
        portfolio
      </span>
      <span className="directory">
        &nbsp;{dir}
      </span>]$
    </>
  )
}

export default CommandDir
