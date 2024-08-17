import React, { ReactNode } from "react";

interface FileSystemItem
{
  name: string;
  type: "file" | "directory";
  children?: FileSystemItem[];
}

export const fileSystem: FileSystemItem = 
{
  name: "~",
  type: "directory",
  children: [
    {name: "File 1.txt", type: "file"},
    {
      name: "Subdirectory",
      type: "directory",
      children: [{name:"File 2.txt", type: "file"}],
    },
  ],
};

export let currentDirectory: FileSystemItem = fileSystem;
export let directoryStack: FileSystemItem[] = [fileSystem];

export function changeDirectory(directoryName: string) : boolean {
  const found = currentDirectory.children?.find(
    (child) => child.name === directoryName && child.type === "directory"
  );

  if (found) {
    directoryStack.push(currentDirectory);
    currentDirectory = found;

    return true;
  } else {
    console.log("Directory not found");
    return false;
  }
}

export function changeParent() : boolean {
  if (directoryStack.length > 1) {
    currentDirectory = directoryStack.pop()!;
    return true;
  } else {
    console.log("Already at the root directory");
    return false;
  }
}

export const treeDir = (fs: FileSystemItem): string[] => {
  let res: string[] = [];

  fs.children?.forEach(e => {
    res.push(e.name);

    if(e.type === "directory") res = [...res, ...treeDir(e)];
  });

  return res;
}

export const banner: string = `
███╗     ██╗████████╗   ███████╗██╗  ██╗██████╗ ███████╗██████╗ ██╗███████╗███╗   ██╗ ██████╗███████╗███╗
██╔╝     ██║╚══██╔══╝   ██╔════╝╚██╗██╔╝██╔══██╗██╔════╝██╔══██╗██║██╔════╝████╗  ██║██╔════╝██╔════╝╚██║
██║      ██║   ██║█████╗█████╗   ╚███╔╝ ██████╔╝█████╗  ██████╔╝██║█████╗  ██╔██╗ ██║██║     █████╗   ██║
██║ ██   ██║   ██║╚════╝██╔══╝   ██╔██╗ ██╔═══╝ ██╔══╝  ██╔══██╗██║██╔══╝  ██║╚██╗██║██║     ██╔══╝   ██║
███╗╚█████╔╝   ██║      ███████╗██╔╝ ██╗██║     ███████╗██║  ██║██║███████╗██║ ╚████║╚██████╗███████╗███║
╚══╝ ╚════╝    ╚═╝      ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝╚══╝
`

export const sliderChar: string = `
███████╗
╚══════╝
`

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

export const processElements = (element: ReactNode): ReactNode => {
  if (!React.isValidElement(element)) return element;

  const children = React.Children.map(element.props.children, processElements) || [];

  if (element.type === "div" || element.type === "span" || element.type === "em") return children;

  if (element.type === "br") return null;

  const newProps = {
    ...element.props,
    style: {
      ...element.props.style,
      padding: 0,
    },
    children,
  };

  return React.cloneElement(element, newProps);
};

export const commandSplit = (input: string): string[] => {
  const regex = /`[^`]*`|\S+/g;

  const results = [];

  let match;

  while ((match = regex.exec(input))) results.push(match[0]);

  return results;
}
