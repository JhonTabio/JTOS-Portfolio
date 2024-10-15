import React, { ReactNode } from "react";

const REPO_CACHE = "repo_cache";
const REPO_ETAG = "repo_etag";
let repoMemoryData: repoData[] = [];

interface repoData
{
  id: number;
  node_id: string;
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  open_issues_count: number;
  open_issues: number;
  default_branch: string;
}

async function fetchRepos(): Promise<repoData[]>
{
  const cachedRepo = localStorage.getItem(REPO_CACHE);
  const eTag = localStorage.getItem(REPO_ETAG);

  const headers: HeadersInit = {};

  if(eTag) headers["If-None-Match"] = eTag;

  try
  {
    const response = await fetch("https://api.github.com/users/JhonTabio/repos", { headers });

    if (response.status === 304 && cachedRepo) return JSON.parse(cachedRepo);
    if (!response.ok) throw new Error("Error fetching repos");
    
    const data = await response.json();

    const ret: repoData[] = data.map((repo: any) => ({
      id: repo.id,
      node_id: repo.node_id,
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      fork: repo.fork,
      url: repo.url,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      homepage: repo.homepage,
      size: repo.size,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      language: repo.language,
      open_issues_count: repo.open_issues_count,
      open_issues: repo.open_issues,
      default_branch: repo.default_branch,
    }));

    localStorage.setItem(REPO_CACHE, JSON.stringify(ret));

    const etag = response.headers.get("ETag");
    if (etag) localStorage.setItem(REPO_ETAG, etag);

    return ret;
  }
  catch(error)
  {
    console.log(error);
    throw error;
  }
}

export function initialize(): void
{
  fetchRepos().then(data => {
    repoMemoryData = data;

    repoMemoryData.forEach((repo) =>{
      fileSystem.children![1].children!.push({name: repo.name + ".proj", type: "file"});
    })
  });
}

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
    {name: "welcome.txt", type: "file"},
    {
      name: "Documents",
      type: "directory",
      children: [{name:"Info.txt", type: "file"}],
    },
    {
      name: "Downloads",
      type: "directory",
      children: [{name:"Info.txt", type: "file"}],
    },
    {
      name: "Music",
      type: "directory",
      children: [{name:"Info.txt", type: "file"}],
    },
    {
      name: "Pictures",
      type: "directory",
      children: [{name:"Info.txt", type: "file"}],
    },
    {
      name: "Videos",
      type: "directory",
      children: [{name:"Info.txt", type: "file"}],
    },
  ],
};

export let currentDirectory: FileSystemItem = fileSystem;
export let directoryStack: FileSystemItem[] = [fileSystem];

export function changeDirectory(directoryName: string) : boolean
{
  if(directoryName === '.' || directoryName === '') return true;

  if(directoryName === '~')
  {
    currentDirectory = fileSystem
    directoryStack = [fileSystem]
    return true;
  }

  if(directoryName === "..")
  {
    changeParent();
    return true;
  }

  const found = currentDirectory.children?.find(
    (child) => child.name === directoryName && child.type === "directory"
  );

  if(found)
  {
    directoryStack.push(currentDirectory);
    currentDirectory = found;

    return true;
  }
  else 
  {
    console.log("Directory not found");
    return false;
  }
}

export function changeDirectories(path: string): boolean
{

  const oldStack = directoryStack;
  let success = true;

  const dirs = path.split("/");

  for(let dir of dirs)
  {
    success = changeDirectory(dir);

    if(!success)
    {
      directoryStack = oldStack;
      currentDirectory = directoryStack[0];

      break;
    }
  }

  return success;
}

export function changeParent(): boolean
{
  if (directoryStack.length > 1)
  {
    currentDirectory = directoryStack.pop()!;
    return true;
  } 
  else 
  {
    console.log("Already at the root directory");
    return false;
  }
}

export function listDir(fs: FileSystemItem, tree: boolean): string[] 
{
  let res: string[] = [];

  fs.children?.forEach(e => {
    res.push(e.name + " ");

    if(tree && e.type === "directory") res = [...res, ...listDir(e, true)];
  });

  return res;
}

function listOtherDir(dir: string): string[] | null
{
  let ogDir = currentDirectory;
  let ogStack = directoryStack;

  if(!changeDirectories(dir)) return null;

  let res = listDir(currentDirectory, false);
  currentDirectory = ogDir;
  directoryStack = ogStack;

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

export function commandProcess(cmd: string): React.ReactNode
{
  if(cmd.length <= 0 || cmd.trim() === "") return React.createElement("div", { className: "command" });

  let ret: React.ReactNode;

  const evaluatedParts: string[] = commandSplit(cmd).map(subCmd => {
    if (subCmd.startsWith('`') && subCmd.endsWith('`'))
    {
      const part = subCmd.slice(1, -1);
      const comps = (commandProcess(part) as React.ReactElement);

      const retrieveString = (component: React.ReactElement) => {
        let res = "";

        React.Children.forEach(component.props.children, (child: string | React.ReactElement) => {
          if(typeof(child) === "string") res = res + " " + child;
          else 
          {
            let recursive = retrieveString(child);

            if(recursive !== "") res = res + " " + recursive;
          }
        })

        return res;
      }

      return retrieveString(comps).trim();
    }
    return subCmd;
  });

  switch(evaluatedParts[0].toUpperCase())
  {
    case "":
      ret = React.createElement("div", { className: "command" });
      break;
    case "HELP":
      if (evaluatedParts.length == 1)
        ret = React.createElement(
          "div",
          { className: "command" },
          "help - If unsure, try help help",
          React.createElement("br"),
          "*ls - Lists all files and directories within the given directory",
          React.createElement("br"),
          "*cat - Prints the contents of a given file",
          React.createElement("br"),
          "*whoami - Provides a brief description of the creator of JTOS",
          React.createElement("br"),
          "*whatami - Provides a brief description of JTOS",
          React.createElement("br"),
          "*whenami - Provides a brief description of where you are connected",
          React.createElement("br"),
          "*whereami - Provides a brief description of where you are",
          React.createElement("br"),
          "*whyami - Provides a brief description of why JTOS was created",
          React.createElement("br"),
          "*howami - Provides a brief description of how JTOS was created",
          React.createElement("br"),
          "*color - Change the color of the terminal text",
          React.createElement("br"),
          "*clear - Clears the terminal",
          React.createElement("br"),
          "*exit - Exits the terminal"
        );
      else
        switch (evaluatedParts[1].toUpperCase()) {
          case "HELP":
            ret = React.createElement(
              "div",
              { className: "command" },
              "help: help [command]",
              React.createElement("br"),
              "Displays brief summaries of built-in commands"
            );
            break;
          default:
            ret = React.createElement(
              "div",
              { className: "command" },
              React.createElement("em", { style: { color: "red" } }, `bash: help: no help topics match \"${evaluatedParts[1]}\"`)
            );
            break;
        }
      break;

    case "LS":
      if(evaluatedParts.length == 1)
        ret = React.createElement("div", { className: "command" }, listDir(currentDirectory, false).map((item, index) => {
          if(item.indexOf('.') === -1) return React.createElement("span", {key: index, style: {color: "lightblue"}}, item);
          else return React.createElement("span", {key: index}, item);
        }));
      else 
      {

        ret = React.createElement("div", { className: "command" }, []);

        for(let i = 1; i <= evaluatedParts.length - 1; i++)
        {
          const strings: string[] | null = listOtherDir(evaluatedParts[i]);

          if(strings == null)
          {
            const dirs = evaluatedParts[i].split("/");

            ret.props.children.push(React.createElement(
              "div",
              { className: "command" },
              React.createElement("em", { style: { color: "red" } }, `bash: ls: cannot access '${dirs[dirs.length - 1]}'`)
            ));
          }
          else
            ret.props.children.push(React.createElement("div", { className: "command" }, strings.map((item, index) => {
              if(item.indexOf('.') === -1) return React.createElement("span", {key: index, style: {color: "lightblue"}}, item);
              else return React.createElement("span", {key: index}, item)})));
        }
      }
      break;

    case "CD":
      ret = React.createElement("div", { className: "command" });

      if(evaluatedParts.length == 1) break;

      if(evaluatedParts.length > 2)
      {
        ret = React.createElement(
          "div",
          { className: "command" },
          React.createElement("em", { style: { color: "red" } }, "bash: cd: too many arguments")
        );

        break;
      }

      if(evaluatedParts[1][0] === '/')
      {
        ret = React.createElement(
          "div",
          { className: "command" },
          React.createElement("em", { style: { color: "red" } }, "error: you cannot perform this operation unless you are root")
        );

        break;
      }

      if(!changeDirectories(evaluatedParts[1]))
      {
        const dirs = evaluatedParts[1].split("/");

        ret = React.createElement(
          "div",
          { className: "command" },
          React.createElement("em", { style: { color: "red" } }, `bash: cd: ${dirs[dirs.length - 1]}: no such file or directory`)
        );
      }
      break;

    case "ECHO":
      ret = React.createElement(
        "div",
        { className: "command" },
        evaluatedParts.slice(1).map((cmd, i) => React.createElement("span", { key: i }, cmd, '\u00A0')),
        React.createElement("br")
      );
      break;

    default:
      ret = React.createElement(
        "div",
        { className: "command" },
        React.createElement("em", { style: { color: "red" } }, `bash: ${evaluatedParts[0]}: command not found. Try help`)
      );
      break;
  }

  return ret;
}

export function CommandProcess(cmd: string)
{
    let ret: React.ReactNode = React.createElement("div");

    if (cmd.trim() === "") return ret;

    let process = commandSplit(cmd.trim());

    if (process.length <= 0) return ret;

    switch (process[0].toUpperCase()) {
      case "LS":
        ret = React.createElement(
          "div",
          { className: "command" },
          "LS being implemented... or maybe not. Be back soon!"
        );
        break;
      case "CD":
        ret = React.createElement('div');
        let path: string[];

        if (process.length == 1) break;
        if (process[1].trim() === "/") path = ["/"];
        else path = process[1].trim().split("/");

        if (path[path.length - 1] === "") path.pop();
        else if (process.length > 2)
          ret = React.createElement(
            'div',
            null,
            React.createElement('em', { style: { color: "red" } }, "bash: cd: too many arguments")
          );
        break;
      case "HELP":
        if (process.length == 1)
          ret = React.createElement(
            'div',
            { className: "command" },
            `help - If unsure, try help help`,
            React.createElement('br'),
            `*ls - Lists all files and directories within the given directory [Default is root directory]`,
            React.createElement('br'),
            `*cat - Prints the contents of a given file`,
            React.createElement('br'),
            `*whoami - Provides a brief description of the creator of JTOS`,
            React.createElement('br'),
            `*whatami - Provides a brief description of JTOS`,
            React.createElement('br'),
            `*whenami - Provides a brief description of where you are connected`,
            React.createElement('br'),
            `*whereami - Provides a brief description of where you are`,
            React.createElement('br'),
            `*whyami - Provides a brief description of why JTOS was created`,
            React.createElement('br'),
            `*howami - Provides a brief description of how JTOS was created`,
            React.createElement('br'),
            `*color - Change the color of the terminal text`,
            React.createElement('br'),
            `*clear - Clears the terminal`,
            React.createElement('br'),
            `*exit - Exits the terminal`
          );
        else
          switch (process[1].toUpperCase()) {
            case "HELP":
              ret = React.createElement(
                'div',
                { className: "command" },
                `help: help [command]`,
                React.createElement('br'),
                `Displays brief summaries of built-in commands`
              );
              break;
            default:
              ret = React.createElement(
                'div',
                null,
                React.createElement('em', { style: { color: "red" } }, `bash: help: no help topics match \`${process[1]}\``)
              );
              break;
          }
        break;
      case "WHOAMI":
        ret = React.createElement(
          'div',
          { className: "command" },
          `Hey! I am Jhon Tabio. I am the creator of JTOS, the operating system the server you are currently connected to is using.`,
          React.createElement('br'),
          `Currently an undergraduate student pursuing a Bachelors in Computer Science at the University of Central Florida. Throughout my educational and professional career, I have adopted various industry and social skills that allow me to integrate into any team. I work on refining my skills in C / C++ / C#, Java, Javascript, Typescript, Python, and HTML / CSS using tools such as Visual Studio, Vim, GitHub, and others.`,
          React.createElement('br')
        );
        break;
      case "WHATAMI":
        ret = React.createElement(
          'div',
          { className: "command" },
          `JTOS is more of an artistic simulation than a full-fledged operating system. The idea is to challenge myself with Front End Development and React rather than simplifying the approach. This helped me strategize and improve my overall full-stack development skills.`,
          React.createElement('br')
        );
        break;
      case "WHEREAMI":
        ret = React.createElement(
          'div',
          { className: "command" },
          `You are connected to a remote server via an SSH terminal, where I showcase my full-stack development capabilities.`,
          React.createElement('br')
        );
        break;
      case "WHENAMI":
        ret = React.createElement(
          'div',
          { className: "command" },
          `Not sure what to do tbh... time spent on this? My local time? Most recent commit time?`,
          React.createElement('br')
        );
        break;
      case "WHYAMI":
        ret = React.createElement(
          'div',
          { className: "command" },
          `Why this? Why go through the effort of simulating a terminal? Well, I thought this would fit me as it challenges my front-end development skills.`,
          React.createElement('br')
        );
        break;
      case "HOWAMI":
        ret = React.createElement(
          'div',
          { className: "command" },
          `Doing very good! :) Talk about tech stack maybe?`,
          React.createElement('br')
        );
        break;
      case "COLOR":
        ret = React.createElement('div');

        if (process.length == 1) {
          ret = React.createElement(
            'div',
            { className: "command", style: { color: "red" } },
            `bash: color: Wrong usage, do 'help color' for more information`,
            React.createElement('br')
          );
        } else {
          let res: boolean = changeColor(process.splice(1));

          if (res) ret = React.createElement('div');
          else
            ret = React.createElement(
              'div',
              { className: "command", style: { color: "red" } },
              `bash: color: Wrong usage, do 'help color' for more information`,
              React.createElement('br')
            );
        }
        break;
      case "BANNER":
        ret = React.createElement(
          'pre',
          { className: "command", style: { whiteSpace: 'pre-wrap', wordWrap: 'break-word' } },
          `|-------------------------------------------------|\n` +
            `|        _____  _________    ___     ______       |\n` +
            `|       |_   _||  _   _  | .'   \`. .' ____ \\      |\n` +
            `|         | |  |_/ | | \\_|/  .-.  \\| (___ \\_|     |\n` +
            `|     _   | |      | |    | |   | | _.____\`.      |\n` +
            `|    | |__' |     _| |_   \\  \`-'  /| \\____) |     |\n` +
            `|    \`.____.'    |_____|   \`.___.'  \\______.'     |\n` +
            `|                                                 |\n` +
            `|-------------------------------------------------|\n`
        );
        break;
      case "WELCOME":
        const currentDate = new Date();
        const formattedDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getDate().toString().padStart(2, '0')}.${currentDate.getFullYear()}`;

        ret = React.createElement(
          'div',
          { className: "command" },
          `JTOS Terminal (Version ${formattedDate})`,
          React.createElement('br'),
          `© ${currentDate.getFullYear()} Jhon Tabio All rights reserved.`,
          React.createElement('br'),
          `Welcome to my portfolio! Try help!`
        );
        break;
      case "EXIT":
        ret = React.createElement('br');
        break;
      case "ECHO":
        ret = React.createElement(
          'div',
          { className: "command" },
          process.slice(1).map((cmd, i) => React.createElement('span', { key: i }, cmd, '\u00A0')),
          React.createElement('br')
        );
        break;
      default:
        ret = React.createElement(
          'div',
          { className: "command" },
          React.createElement('em', { style: { color: "red" } }, `bash: ${process[0]}: command not found. Try help`)
        );
        break;
    }

    return ret;
  };

export default CommandProcess;
