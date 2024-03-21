import React, { useEffect, useRef } from "react";
import { useDir } from "./CommandDir";
import { changeColor } from "../utils/utils";

interface CommandProcess
{
  cmd: string;
}

const CommandProcess: React.FC<CommandProcess> = ({ cmd }) => {

  const { dir, setDir } = useDir();

  const processCommand = (cmd: string): JSX.Element => {
    let ret: JSX.Element = <div/>;

    if(cmd.trim() === "") return ret;

    let process = cmd.split(" ");

    if(process.length <= 0) return ret;

    switch (process[0].toUpperCase())
    {
      case "LS":
        ret = 
          <div className="command">
            LS being implemented... or maybe not. Be back soon!
          </div>
        break;
      case "CD":
        ret = 
          <div className="command">
            CD being implemented... or maybe not. Be back soon!
          </div>
        break;
      case "HELP":
        if(process.length == 1)
          ret = 
          <div className="command">
            help - If unsure, try help help<br/>
            ls - Lists all files and directories within the given directory [Default is root directory]<br/>
            cat - Prints the contents of a given file<br/>
            whoami - Provides a brief description of the creator of JTOS<br/>
            whatami - Provides a brief description of JTOS<br/>
            whenami - Provides a brief description of where you are connected<br/>
            whereami - Provides a brief description of where you are<br/>
            whyami - Provides a brief description of why JTOS was created<br/>
            howami - Provides a brief description of how JTOS was created<br/>
            color - Change the color of the terminal text<br/>
            clear - Clears the terminal<br/>
            exit - Exits the terminal<br/>
          </div>
        else
          switch(process[1].toUpperCase())
          {
            case "HELP":
              ret =
                <div className="command">
                  help: help [command]<br/>
                  Displays brief summaries of built-in commands
                </div>
              break;
            default:
              ret = <div><em style={{color: "red"}}>bash: help: no help topics match `{process[1]}`</em></div>
              break;
          }
        break;
      case "WHOAMI"://TODO: Use API to fetch from github instead 
        ret =
        <div className="command"> 
          Hey! I am Jhon Tabio. I am the creator of JTOS, the operating system the server you are currently connected to is using.<br/>
          Currently an undergraduate student that is pursuing a Bachelors in Computer Science at the University of Central Florida. Throughout my educational and professional career, I have adopted various industry and social skills that allows me to easily integrate myself in any sort of team environment. Every day I work towards refining my skills in C / C++ / C#, Java, Javascript, Typescript, Python, and HTML / CSS using tools such as Visual Studio / Visual Studio Code, VIM / NeoVim, Git, and GitHub. One of my greatest achievements is having the chance to work alongside Microsoft and their TEALS division to bring more accessibility of computer science to High schools that did not have a strong CS program. I was able to gather the communication skills and patience to teach a group of high schoolers about the fundamentals of programming.
          <br/>
        </div>
        break;
      case "WHATAMI":
        ret =
        <div className="command"> 
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
      case "WHEREAMI":
        ret =
        <div className="command"> 
          Currently, you are connected to a remote server via an ssh terminal. This server
          houses various information, documents, and overall a good example of the Full Stack
          Development capabilities of the creator of JTOS (Jhon Tabio).
          <br/>
        </div>
        break;
      case "WHENAMI":
        ret =
        <div className="command"> 
          Not sure what to do tbh... time spent on this? My local time? Most recent commit time?
          <br/>
        </div>
        break;
      case "WHYAMI":
        ret =
        <div className="command"> 
          Why this? Why go through the effort of simulating a terminal? Well... because out of
          all my options / ideas for my portfolio, I thought this to be the best one that fits me.<br/>
          It was not too long ago where I had switched my working station from a Windows machine to a Linux machine.
          Since then, I have been enjoying the use of a terminal more than a GUI interface for the purposes
          of work. I emphasize work, because I most certainly still use Windows for leisure and entertainment :)
          <br/>
        </div>
        break;
      case "HOWAMI":
        ret =
        <div className="command"> 
          Doing very good! :)<br/><br/>
          Talk about tech stack maybe?
          <br/>
        </div>
        break;
      case "COLOR":
        if(process.length == 1)
          ret =
          <div className="command" style={{ color: "red" }}> 
            Wrong usage, do `help color` for more information
            <br/>
          </div>
        else
        {
          let res: boolean = changeColor(process.splice(1));

          if(res)
            ret = <br/>
          else
            ret = 
              <div className="command" style={{ color: "red" }}> 
                Wrong usage, do `help color` for more information
                <br/>
              </div>
        }
        break;
      case "BANNER":
        ret =
          <pre className="command" style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
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
      case "WELCOME"://[SPECS?]<br/>
        const currentDate = new Date();
        const formattedDate = `${currentDate.getMonth() + 1}`.padStart(2, '0') +
                          `.${currentDate.getDate()}`.padStart(2, '0') +
                          `.${currentDate.getFullYear()}`;

        ret = 
          <div className="command"> 
            JTOS Terminal (Version {formattedDate})<br/>
            © {currentDate.getFullYear()} Jhon Tabio All rights reserved.<br/>
            {processCommand("BANNER")} 
            Welcome to my portfolio!<br/>
            Feel free to stick and look around. Not sure where to start? Try help!
            <br/>
          </div>
        break;
      case "EXIT":
        ret =
        <div className="command"> 
          Exit command still being implemented... Close the tab :)
          <br/>
        </div>
        break;
      default:
        ret = <div className="command"><em style={{color: "red"}}>bash: {process[0]}: command not found. Try help</em></div>
        break;
    }

  return ret;
  }

  return(
      <>
        {processCommand(cmd)}
      </>
  );
}

export default CommandProcess;
