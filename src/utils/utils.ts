const isColor = (color: string) =>
{
  const element = document.createElement("div");
  element.style.color = color;
  if(element.style.color === "") throw Error;
  element.remove();
}

export const changeColor = (cmd: string[]): boolean =>{
  let ret: boolean = false;
  let part: string;
  let color: string;

  try
  {
    if(cmd.length === 1)
    {
      isColor(cmd[0]);

      document.documentElement.style.setProperty("--client", cmd[0]);
      document.documentElement.style.setProperty("--\@", cmd[0]);
      document.documentElement.style.setProperty("--server", cmd[0]);
      document.documentElement.style.setProperty("--directory", cmd[0]);
      document.documentElement.style.setProperty("--command", cmd[0]);
    }
    else
    {
      const root = getComputedStyle(document.documentElement);

      for(let i = 0; i < cmd.length; i += 2)
      {
        part = "--" + cmd[i].toLowerCase();
        color = cmd[i + 1].toLowerCase();

        const prop = root.getPropertyValue(part);

        if(prop === "") throw Error;

        isColor(color);

        document.documentElement.style.setProperty(part, color);
      }
    }
  }
  catch(e)
  {
    return ret;
  }

  ret = true;

  return ret;
}
