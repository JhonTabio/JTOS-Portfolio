interface CommandInput
{
  value: string;
  onChange: (value: string) => void;
  onKeyDown: () => void;
}

const processCommand = (cmd: string): string => {
  let ret = "Error";

  switch(cmd.toUpperCase())
  {
    case "LS":
      ret = "LS!";
      break;
    default:
      ret = "Error occured";
      break;
  }
  return ret;
}

const CommandInput: React.FC<CommandInput> = ({value, onChange, onKeyDown}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") onKeyDown();
  };

  return(
      <div id="cl">[client@portfolio ~]$ <input className="commandInput" name="cmd" type="text" value={value} onChange={handleChange} onKeyDown={handleKeyDown} autoFocus/></div>
  );
}

export default CommandInput;
