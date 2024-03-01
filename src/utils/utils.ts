export const processCommand = (cmd: string): string => {
  let ret = "Error";

  switch (cmd.toUpperCase()) {
    case "LS":
      ret = "LS command executed!";
      break;
    default:
      ret = "Error occurred";
      break;
  }
  return ret;
};
