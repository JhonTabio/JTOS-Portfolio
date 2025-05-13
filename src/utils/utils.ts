import { TEXTS } from "../assets/texts";
import { commandProcess } from "./commandProcessUtils";

const REPO_CACHE = "repo_cache";
const REPO_ETAG = "repo_etag";
let repoMemoryData: repoData[] = [];

interface repoData
{
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
  topics: string[];
  license: object;
  readme: string;
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

    const ret: repoData[] = data.filter((repo: any) => 
      repo.topics && repo.topics.includes("showcase")).map((repo: any) => ({
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
      topics: repo.topics,
      license: repo.license ? {
        key: repo.license.key,
        name: repo.license.name,
        url: repo.license.url
      } : null,
      readme: null
    }));

    localStorage.setItem(REPO_CACHE, JSON.stringify(ret));

    const etag = response.headers.get("ETag");
    if (etag) localStorage.setItem(REPO_ETAG, etag);

    return ret;
  }
  catch(error)
  {
    throw error;
  }
}

// Github safely sanitizes their READMEs
export async function fetchReadme(repo: repoData): Promise<string>
{
  console.log("called readme");
  console.log(repo.name);
  console.log("exists");
  if(repo.readme) return repo.readme;
  console.log("does not have readme alr");

  const headers: HeadersInit = {};
  headers["Accept"] = "application/vnd.github.html+json";

  try
  {
    const response = await fetch(`https://api.github.com/repos/JhonTabio/${repo.name}/readme`, { headers });

    if (!response.ok) throw new Error("Error fetching repos");
    
    const data = await response.text();
    //repo.readme = data;
    console.log("set readme");
    return data;
  }
  catch(error)
  {
    throw error;
  }
}

export function initialize(): void
{
  commandProcess("cd ~");

  fetchRepos().then(data => {
    repoMemoryData = data;

    repoMemoryData.forEach((repo) =>{
      fetchReadme(repo).then(readme => {
        repo.readme = readme;
      })

      if (!fileSystem.children![1].children!.some(child => child.name === repo.name + ".proj" && child.type === "file"))
        fileSystem.children![1].children!.push({name: repo.name + ".proj", type: "file"});
    })
  });
}

export interface FileSystemItem
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
      children: [{name:"info.txt", type: "file"}],
    },
    {
      name: "Downloads",
      type: "directory",
      children: [{name:"info.txt", type: "file"}],
    },
    {
      name: "Music",
      type: "directory",
      children: [{name:"info.txt", type: "file"}],
    },
    {
      name: "Pictures",
      type: "directory",
      children: [{name:"info.txt", type: "file"}],
    },
    {
      name: "Videos",
      type: "directory",
      children: [{name:"info.txt", type: "file"}],
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
    directoryStack.push(found);
    currentDirectory = found;

    return true;
  }
  else 
  {
    return false;
  }
}

export function openProject(name: string): repoData | undefined
{
  console.log(currentDirectory);
  let file = name.substring(0, name.indexOf(".proj"));
  return currentDirectory.children?.find((item) => item.name === file + ".proj") ? repoMemoryData.find((repo) => repo.name === file) : undefined;
}

export function concatenateFile(dir: string): repoData | string | undefined
{
  let ogDir = currentDirectory;
  let ogStack = [...directoryStack];
  let file = dir;

  if(dir.includes('/'))
  {
    file = dir.substring(dir.lastIndexOf('/') + 1)
    if(!changeDirectories(dir.substring(0, dir.lastIndexOf('/')))) return undefined;
  }

  let res: repoData | string | undefined;

  if(file.includes("proj"))
    res = openProject(file);
  else if(file.includes("txt"))
  {
    file = file.substring(0, file.indexOf(".txt"));
    
    if(currentDirectory.children?.find((item) => item.name === file + ".txt"))
      res = TEXTS[currentDirectory.name + "_" + file].cli;
  }
  else
    if(res && !file.includes('.')) res = "dir";

  currentDirectory = ogDir;
  directoryStack = ogStack;

  return res;
}

export function changeDirectories(path: string): boolean
{
  const oldStack = [...directoryStack];
  let success = true;

  const dirs = path.split("/");

  for(let dir of dirs)
  {
    success = changeDirectory(dir);

    if(!success)
    {
      directoryStack = oldStack;
      currentDirectory = directoryStack[directoryStack.length - 1];

      break;
    }
  }

  return success;
}

export function changeParent(): boolean
{
  if (directoryStack.length > 1)
  {
    directoryStack.pop()!;
    currentDirectory = directoryStack[directoryStack.length - 1];
    return true;
  } 
  else 
  {
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

export function listOtherDir(dir: string): string[] | null
{
  let ogDir = currentDirectory;
  let ogStack = [...directoryStack];

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

import React, { ReactElement } from "react";

export const folderIcon: ReactElement = React.createElement(
  "svg",
  { className: "gui_icon", viewBox: "0 0 512 512", fill: "#6e54a6" },
  React.createElement("path", {
    d: "M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z",
  })
);

export const fileIcon: ReactElement = React.createElement(
  "svg",
  {
    className: "gui_icon",
    viewBox: "0 0 384 512",
    fill: "#604996",
  },
  React.createElement("path", {
    d: "M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z",
  })
);

const isColor = (color: string) =>
{
  const element = document.createElement("div");
  element.style.color = color;
  if(element.style.color === "") throw Error;
  element.remove();
}

export const changeColor = (cmd: string[]): boolean =>{
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
    return false;
  }
  return true;
}
