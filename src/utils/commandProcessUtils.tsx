import React from "react";
import { changeDirectories, currentDirectory, listDir, listOtherDir } from "./utils";

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
  if (cmd.length <= 0 || cmd.trim() === "") return <div className="command"></div>;

  let ret: React.ReactNode;

  const evaluatedParts: string[] = commandSplit(cmd).map((subCmd) =>
  {
    if (subCmd.startsWith('`') && subCmd.endsWith('`'))
    {
      const part = subCmd.slice(1, -1);
      const comps = commandProcess(part) as React.ReactElement;
      console.log(comps);

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

  switch (evaluatedParts[0].toUpperCase())
  {
    case "":
      ret = <div className="command"></div>;
      break;

    case "HELP":
      if (evaluatedParts.length == 1)
      {
        ret = (
          <div className="command">
            help - If unsure, try help help
            <br />
            *ls - Lists all files and directories within the given directory
            <br />
            *cat - Prints the contents of a given file
            <br />
            *whoami - Provides a brief description of the creator of JTOS
            <br />
            *whatami - Provides a brief description of JTOS
            <br />
            *whenami - Provides a brief description of where you are connected
            <br />
            *whereami - Provides a brief description of where you are
            <br />
            *whyami - Provides a brief description of why JTOS was created
            <br />
            *howami - Provides a brief description of how JTOS was created
            <br />
            *color - Change the color of the terminal text
            <br />
            *clear - Clears the terminal
            <br />
            *exit - Exits the terminal
          </div>
        );
      }
      else
      {
        switch (evaluatedParts[1].toUpperCase())
        {
          case "HELP":
            ret = (
              <div className="command">
                help: help [command]
                <br />
                Displays brief summaries of built-in commands
              </div>
            );
            break;
          default:
            ret = (
              <div className="command">
                <em style={{ color: "red" }}>{`bash: help: no help topics match \"${evaluatedParts[1]}\"`}</em>
              </div>
            );
            break;
        }
      }
      break;

    case "LS":
      if (evaluatedParts.length == 1)
      {
        ret = (
          <div className="command">
            {listDir(currentDirectory, false).map((item, index) => (
              <span key={index} style={item.indexOf('.') === -1 ? { color: "lightblue" } : undefined}>
                {item}
              </span>
            ))}
          </div>
        );
      }
      else
      {
        ret = (
          <div className="command">
            {evaluatedParts.slice(1).map((dir, i) => {
              const strings: string[] | null = listOtherDir(dir);

              if (strings == null)
              {
                const dirs = dir.split("/");

                return (
                  <div key={i} className="command">
                    <em style={{ color: "red" }}>{`bash: ls: cannot access '${dirs[dirs.length - 1]}'`}</em>
                  </div>
                );
              }

              return (
                <div key={i} className="command">
                  {strings.map((item, index) => (
                    <span key={index} style={item.indexOf('.') === -1 ? { color: "lightblue" } : undefined}>
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

    case "CD":
      if (evaluatedParts.length == 1)
      {
        ret = <div className="command"></div>;
        break;
      }

      if (evaluatedParts.length > 2)
      {
        ret = (
          <div className="command">
            <em style={{ color: "red" }}>bash: cd: too many arguments</em>
          </div>
        );
        break;
      }

      if (evaluatedParts[1][0] === '/')
      {
        ret = (
          <div className="command">
            <em style={{ color: "red" }}>error: you cannot perform this operation unless you are root</em>
          </div>
        );
        break;
      }

      if (!changeDirectories(evaluatedParts[1]))
      {
        const dirs = evaluatedParts[1].split("/");

        ret = (
          <div className="command">
            <em style={{ color: "red" }}>{`bash: cd: ${dirs[dirs.length - 1]}: no such file or directory`}</em>
          </div>
        );
      }
      break;

    case "ECHO":
      ret = (
        <div className="command">
          {evaluatedParts.slice(1).map((cmd, i) => (
            <span key={i}>{cmd}&nbsp;</span>
          ))}
          <br/>
        </div>
      );
      break;

    default:
      ret = (
        <div className="command">
          <em style={{ color: "red" }}>{`bash: ${evaluatedParts[0]}: command not found. Try help`}</em>
        </div>
      );
      break;
  }

  return ret;
}
