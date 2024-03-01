export const processCommand = (cmd: string): JSX.Element => {
  let ret: JSX.Element;

  switch (cmd.toUpperCase())
  {
    case "LS":
      ret = <span><b>LS</b> command was exectued!</span>
      break;
    case "HELP":
      ret = <span>Help is here!</span>
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
