import React from "react";
import { changeDirectories, concatenateFile, currentDirectory, changeColor, listDir, listOtherDir } from "./utils";

export const CMDS = ["help", "ls", "cat", "welcome", "banner", "echo", "cd",
              "whoami", "whatami", "whereami", "whyami", "howami", 
              "color", "clear", "exit"]

function commandSplit(input: string): string[]
{
  const regex = /`[^`]*`|\S+/g;

  const results = [];

  let match;

  while ((match = regex.exec(input))) results.push(match[0]);

  return results;
}

const ProcessElements: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  if (!React.isValidElement(element)) return <>{element}</>;

  const children = React.Children.map(element.props.children, (child) => (
    <ProcessElements element={child} />
  )) || [];

  if (element.type === "div" || element.type === "span" || element.type === "em") return <>{children}</>;

  if (element.type === "br") return null;

  const newProps = {
    ...element.props,
    style: {
      ...element.props.style,
      padding: 0,
    }
  };

  return <>{React.cloneElement(element, newProps, children)}</>;
};

export function commandProcess(cmd: string): React.ReactNode
{
  if (cmd.length <= 0 || cmd.trim() === "") return <div></div>;

  let ret: React.ReactNode;

  const evaluatedParts: string[] = commandSplit(cmd).map((subCmd) =>
  {
    if (subCmd.startsWith('`') && subCmd.endsWith('`'))
    {
      const part = subCmd.slice(1, -1);
      const comps = commandProcess(part) as React.ReactElement;

      const retrieveString = (component: React.ReactElement): string => {
        if(!component) return "";

        let res = "";

        React.Children.forEach(component.props.children, (child: string | React.ReactElement) => {
          if (typeof(child) === "string") res = res + " " + child;
          else
          {
            let recursive = retrieveString(child);
            if (recursive !== "") res = res + " " + recursive;
          }
        });

        return res;
      };

      return retrieveString(comps).trim();
    }
    return subCmd;
  });

  switch (evaluatedParts[0])
  {
    case "":
      ret = <br/>;
      break;

    case "help":
      if (evaluatedParts.length == 1)
      {
        ret = (
          <div>
            help - If unsure, try help help
            <br/>
            ls - Lists all files and directories within the given directory
            <br/>
            cat - Prints the contents of a given file
            <br/>
            whoami - Provides a brief description of the creator of JTOS
            <br/>
            whatami - Provides a brief description of JTOS
            <br/>
            whenami - Provides a brief description of where you are connected
            <br/>
            whereami - Provides a brief description of where you are
            <br/>
            whyami - Provides a brief description of why JTOS was created
            <br/>
            howami - Provides a brief description of how JTOS was created
            <br/>
            color - Change the color of the terminal text
            <br/>
            clear - Clears the terminal
            <br/>
            exit - Exits the terminal
            <br/>
            echo - Print to the terminal
            <br/>
            welcome - Displays the welcome screen
            <br/>
            banner - Displays the banner ASCII art
          </div>
        );
      }
      else
      {
        switch (evaluatedParts[1])
        {
          case "help":
            ret = (
              <div>
                help: help COMMAND
                <br/>
                &nbsp;Displays brief summary of given COMMAND, which is from
                a list of built-in commands
              </div>
            );
            break;

          case "ls":
            ret = (
              <div>
                help: ls FILE...
                <br/>
                &nbsp;List about the FILEs (The current directory by default)
              </div>
            );
            break;

          case "cd":
            ret = (
              <div>
                help: cd DIR...
                <br/>
                &nbsp;Change the current directory to DIR. The default DIR is the value of the
                HOME (~) shell variable
              </div>
            );
            break;

          case "cat":
            ret = (
              <div>
                help: cat FILE...
                <br/>
                &nbsp;Concatenate FILEs and print to screen
              </div>
            );
            break;

          case "clear":
            ret = (
              <div>
                help: clear
                <br/>
                &nbsp;Clears the terminal screen
              </div>
            );
            break;

          case "whoami":
            ret = (
              <div>
                help: whoami
                <br/>
                &nbsp;Insight on the developer of this Portfolio
              </div>
            );
            break;

          case "whatami":
            ret = (
              <div>
                help: whatami
                <br/>
                &nbsp;Insight on the background of this Portfolio's idea
              </div>
            );
            break;

          case "whereami":
            ret = (
              <div>
                help: whereami
                <br/>
                &nbsp;The given scenario is that the website simulates you SSHing into 'my machine'
                which contains all of my 'local' projects to view
              </div>
            );
            break;

          case "howami":
            ret = (
              <div>
                help: howami
                <br/>
                &nbsp;Insights on how this projects operates in a technical level
              </div>
            );
            break;

          case "color":
            ret = (
              <div>
                help: color LABEL COLOR
                <br/>
                &nbsp;Set the color of any given LABEL (Optional, if ommitted then will do all labels)
                to COLOR
                <br/>
                &nbsp;Valid LABELs are the following:
                  client, @, server, directory, command, error, dir, file, $, []
              </div>
            );
            break;

          case "welcome":
            ret = (
              <div>
                help: welcome
                <br/>
                &nbsp;Displays the intro text
              </div>
            );
            break;

          case "echo":
            ret = (
              <div>
                help: echo ARG...
                <br/>
                &nbsp;Displays ARGs, seperated by a single space character followed by a newline,
                on the standard output
              </div>
            );
            break;

          case "exit":
            ret = (
              <div>
                help: exit
                <br/>
                &nbsp;Exit the shell
              </div>
            );
            break;

          case "banner":
            ret = (
              <div>
                help: banner
                <br/>
                &nbsp;Displays the JTOS ASCII art
              </div>
            );
            break;

          default:
            ret = (
              <div id="cli_error">
                {`bash: help: no help topics match \"${evaluatedParts[1]}\"`}
              </div>
            );
            break;
        }
      }
      break;

    case "ls":
      if (evaluatedParts.length == 1)
      {
        ret = (
          <div>
            {listDir(currentDirectory, false).map((item, index) => (
              <span key={index} id={item.indexOf('.') === -1 ? "cli_dir" : "cli_file"}>
                {item}
              </span>
            ))}
          </div>
        );
      }
      else
      {
        ret = (
          <div>
            {evaluatedParts.slice(1).map((dir, i) => {
              const strings: string[] | null = listOtherDir(dir);

              if (strings == null)
              {
                const dirs = dir.split("/");

                return (
                  <div key={i} id="cli_error">
                    {`bash: ls: cannot access '${dirs[dirs.length - 1]}'`}
                  </div>
                );
              }

              return (
                <div key={i}>
                  {strings.map((item, index) => (
                    <span key={index} id={item.indexOf('.') === -1 ? "cli_dir" : "cli_file"}>
                      {item}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        );
      }
      break;

    case "cd":
      if (evaluatedParts.length == 1)
      {
        ret = <br/>;
        break;
      }

      if (evaluatedParts.length > 2)
      {
        ret = (
          <div id="cli_error">
            bash: cd: too many arguments
          </div>
        );
        break;
      }

      if (evaluatedParts[1][0] === '/')
      {
        ret = (
          <div id="cli_error">
            error: you cannot perform this operation unless you are root
          </div>
        );
        break;
      }

      if (!changeDirectories(evaluatedParts[1]))
      {
        const dirs = evaluatedParts[1].split("/");

        ret = (
          <div id="cli_error">
            {`bash: cd: ${dirs[dirs.length - 1]}: no such file or directory`}
          </div>
        );
      }
      break;

    case "cat":
      if (evaluatedParts.length == 1)
        ret = <br/>;
      else
      {
        ret = (
          <div>
            {evaluatedParts.slice(1).map((dir, i) => {

              if (dir[0] === '/')
                return(
                  <div key={i} id="cli_error">
                    error: you cannot perform this operation unless you are root
                  </div>
                );

              let info = concatenateFile(dir);
              console.log(info);

              if(info)
                if(typeof(info) === "string")
                  if(info === "dir")
                    return(
                      <div key={i} id="cli_error">
                        {`cat: ${dir}: Is a directory`}
                      </div>
                    );
                  else return(<pre key={i} style={{ margin: 0, textWrap: "balance", fontFamily: "VT323"}}>{info}</pre>);
                else
                  return(
                    <pre key={i} style={{ margin: 0, fontFamily: "VT323" }}>
                      +---------------------------------------------------------+<br/>
                      |                  {info.name.toUpperCase()}<br/>
                      +---------------------------------------------------------+<br/>
                      | <strong>Description</strong>       : {info.description ?? "No description"}<br/>
                      | <strong>URL</strong>               : <a href={info.html_url} target="_blank" rel="noopener noreferrer">{info.html_url}</a><br/>
                      | <strong>Language</strong>          : {info.language ?? "None"}<br/>
                      | <strong>Topics</strong>            : {info.topics?.join(" ") ?? "None"}<br/>
                      | <strong>Homepage</strong>          : {info.homepage === "https://N/A" ? "N/A" : <a href={info.homepage!} target="_blank" rel="noopener noreferrer">{info.homepage}</a>}<br/>
                      | <strong>Fork</strong>              : {info.fork ? "Yes" : "No"}<br/>
                      | <strong>License</strong>           : {(info.license as {name: string})?.name ?? "None"}<br/>
                      | <strong>Creation Date</strong>     : {new Date(info.created_at).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true, timeZoneName: "short" })}<br/>
                      | <strong>Last Updated</strong>      : {new Date(info.updated_at).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true, timeZoneName: "short" })}<br/>
                      | <strong>Last Pushed</strong>       : {new Date(info.pushed_at).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true, timeZoneName: "short" })}<br/>
                      | <strong>Default Branch</strong>    : {info.default_branch}<br/>
                      +---------------------------------------------------------+<br/>
                      |                  STATS<br/>
                      +---------------------------------------------------------+<br/>
                      | <strong>Size</strong>              : {info.size} KB<br/>
                      | <strong>Stargazers Count</strong>  : {info.stargazers_count}<br/>
                      | <strong>Watchers Count</strong>    : {info.watchers_count}<br/>
                      | <strong>Open Issues Count</strong> : {info.open_issues_count}<br/>
                      | <strong>Open Issues</strong>       : {info.open_issues}<br/>
                      +---------------------------------------------------------+<br/>
                    </pre>
                  );
              else
                return(
                  <div key={i} id="cli_error">
                    {`cat: ${dir}: No such file or directory`}
                  </div>
                );
            })}
          </div>
        );
      }

      break;

    case "echo":
      ret = (
        <div>
          {evaluatedParts.slice(1).map((cmd, i) => (
            <span key={i}>{cmd}&nbsp;</span>
          ))}
          <br/>
        </div>
      );
      break;

    case "whoami"://TODO: Use API to fetch from github instead 
        ret =
        <div> 
          Hey! I am Jhon Tabio. I am the creator of JTOS, the operating system the server you are currently connected to is using.<br/>
          Currently an undergraduate student that is pursuing a Bachelors in Computer Science at the University of Central Florida. Throughout my educational and professional career, I have adopted various industry and social skills that allows me to easily integrate myself in any sort of team environment. Every day I work towards refining my skills in C / C++ / C#, Java, Javascript, Typescript, Python, and HTML / CSS using tools such as Visual Studio / Visual Studio Code, VIM / NeoVim, Git, and GitHub. One of my greatest achievements is having the chance to work alongside Microsoft and their TEALS division to bring more accessibility of computer science to High schools that did not have a strong CS program. I was able to gather the communication skills and patience to teach a group of high schoolers about the fundamentals of programming.
          <br/>
        </div>
        break;
      case "whatami":
        ret =
        <div> 
          JTOS is a full fledge operating system with all kinds of capabilities!<br/><br/>
          Not. The reality is that the OS as a whole is more of an artistic simulation rather
          than an emulation. The idea is I wanted to challenge myself with my weaker side of
          Full Stack Development, which is Front End Development. I could have easily minimized
          the use of Components, and React overall, with emulating a terminal in Javascript / Typescript.
          Taking the approach I did forced me to not only use React, but strategize how I wanted
          core parts of this simulation to work.
          <br/>
        </div>
        break;
      case "whereami":
        ret =
        <div> 
          Currently, you are connected to a remote server via an ssh terminal. This server
          houses various information, documents, and overall a good example of the Full Stack
          Development capabilities of the creator of JTOS (Jhon Tabio).
          <br/>
        </div>
        break;
      case "whenami":
        ret =
        <div> 
          Not sure what to do tbh... time spent on this? My local time? Most recent commit time?
          <br/>
        </div>
        break;
      case "whyami":
        ret =
        <div> 
          Why this? Why go through the effort of simulating a terminal? Well... because out of
          all my options / ideas for my portfolio, I thought this to be the best one that fits me.<br/>
          It was not too long ago where I had switched my working station from a Windows machine to a Linux machine.
          Since then, I have been enjoying the use of a terminal more than a GUI interface for the purposes
          of work. I emphasize work, because I most certainly still use Windows for leisure and entertainment :)
          <br/>
        </div>
        break;
      case "howami":
        ret =
        <div> 
          Doing very good! :)<br/><br/>
          Talk about tech stack maybe?
          <br/>
        </div>
        break;

      case "banner":
        ret =
          <pre style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
            |-------------------------------------------------|<br/>
            |        _____  _________    ___     ______       |<br/>
            |       |_   _||  _   _  | .'   `. .' ____ \      |<br/>
            |         | |  |_/ | | \_|/  .-.  \| (___ \_|     |<br/>
            |     _   | |      | |    | |   | | _.____`.      |<br/>
            |    | |__' |     _| |_   \  `-'  /| \____) |     |<br/>
            |    `.____.'    |_____|   `.___.'  \______.'     |<br/>
            |                                                 |<br/>
            |-------------------------------------------------|<br/>
          </pre>
        break;

      case "welcome"://[SPECS?]<br/>
        const currentDate = new Date();
        const formattedDate = `${currentDate.getMonth() + 1}`.padStart(2, '0') +
                          `.${currentDate.getDate()}`.padStart(2, '0') +
                          `.${currentDate.getFullYear()}`;

        ret = 
          <div> 
            JTOS Terminal (Version {formattedDate})<br/>
            © {currentDate.getFullYear()} Jhon Tabio All rights reserved.<br/>
            {commandProcess("banner")} 
            Welcome to my portfolio!<br/>
            Feel free to stick and look around. Not sure where to start? Try typing help
            <br/>
          </div>
        break;

      case "color":
        if(evaluatedParts.length == 1)
          ret =
          <div id="cli_error"> 
            Wrong usage, do `help color` for more information
            <br/>
          </div>
        else
        {
          let res: boolean = changeColor(evaluatedParts.splice(1));

          if(res)
            ret = <br/>
          else
            ret = 
              <div id="cli_error"> 
                Wrong usage, do `help color` for more information
                <br/>
              </div>
        }
        break;

    default:
      ret = (
        <div id="cli_error">
          {`bash: ${evaluatedParts[0]}: command not found. Try help`}
        </div>
      );
      break;
  }

  return ret;
}
