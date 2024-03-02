export const processCommand = (cmd: string): JSX.Element => {
  let ret: JSX.Element;

  switch (cmd.toUpperCase())
  {
    case "LS":
      ret = <span><b>LS</b> command was exectued!</span>
      break;
    case "HELP":
      ret = 
        <span className="command">
          help - If unsure, try help<br/>
          ls - Lists all file and directories<br/>
          clear - Clears the terminal<br/>
        </span>
      break;
    case "":
      ret = <span/>
      break;
    default:
      ret = <span><em style={{color: "red"}}>bash: {cmd}: command not found. Try help</em></span>
      break;
  }

  return ret;
};
