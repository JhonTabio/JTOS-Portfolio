const changeColor = (cmd: string[]): JSX.Element =>{
  let ret: JSX.Element = <span/>;
  let part: string;
  let color: string;

  if(cmd.length === 1)
  {
    const element = document.createElement("div");
    element.style.color = cmd[0];
    if(element.style.color === "") throw Error;
    element.remove();

    document.documentElement.style.setProperty("--client", cmd[0]);
    document.documentElement.style.setProperty("--\@", cmd[0]);
    document.documentElement.style.setProperty("--server", cmd[0]);
    document.documentElement.style.setProperty("--directory", cmd[0]);
    document.documentElement.style.setProperty("--command", cmd[0]);
  }
  else
    try
    {
      const root = getComputedStyle(document.documentElement);

      for(let i = 0; i < cmd.length; i += 2)
      {
        part = "--" + cmd[i].toLowerCase();
        color = cmd[i + 1].toLowerCase();

        const prop = root.getPropertyValue(part);

        if(prop === "") throw Error;

        const element = document.createElement("div");
        element.style.color = color;
        if(element.style.color === "") throw Error;
        element.remove();

        document.documentElement.style.setProperty(part, color);
      }
    }
    catch(e)
    {
      ret =
        <span>
          error
        </span>
    }

  return ret;
}

export const processCommand = (cmd: string): JSX.Element => {
  let ret: JSX.Element = <span/>;

  if(cmd.trim() === "") return ret;

  let process = cmd.split(" ");

  if(process.length <= 0) return ret;

  switch (process[0].toUpperCase())
  {
    case "LS":
      ret = <span><b>LS</b> command was exectued!</span>
      break;
    case "HELP":
      if(process.length == 1)
        ret = 
        <span className="command">
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
        </span>
      else
        switch(process[1].toUpperCase())
        {
          case "HELP":
            ret =
              <span className="command">
                help: help [command]<br/>
                Displays brief summaries of built-in commands
              </span>
            break;
          default:
            ret = <span><em style={{color: "red"}}>bash: help: no help topics match `{process[1]}`</em></span>
            break;
        }
      break;
    case "WHOAMI"://TODO: Use API to fetch from github instead 
      ret =
      <span className="command"> 
        Hey! I am Jhon Tabio. I am the creator of JTOS, the operating system the server you are currently connected to is using.<br/>
        Currently an undergraduate student that is pursuing a Bachelors in Computer Science at the University of Central Florida. Throughout my educational and professional career, I have adopted various industry and social skills that allows me to easily integrate myself in any sort of team environment. Every day I work towards refining my skills in C / C++ / C#, Java, Javascript, Typescript, Python, and HTML / CSS using tools such as Visual Studio / Visual Studio Code, VIM / NeoVim, Git, and GitHub. One of my greatest achievements is having the chance to work alongside Microsoft and their TEALS division to bring more accessibility of computer science to High schools that did not have a strong CS program. I was able to gather the communication skills and patience to teach a group of high schoolers about the fundamentals of programming.
        <br/>
      </span>
      break;
    case "WHATAMI":
      ret =
      <span className="command"> 
        JTOS is a full fledge operating system with all kinds of capabilities!<br/><br/>
        Not. The reality is that the OS as a whole is more of an artistic simulation rather
        than an emulation. The idea is I wanted to challenge myself with my weaker side of
        Full Stack Development, which is Front End Development. I could have easily minimized
        the use of Components, and React overall, with emulating a terminal in Javascript / Typescript.
        Taking the approach I did forced me to not only use React, but strategize how I wanted
        core parts of this simulation to work.
        <br/>
      </span>
      break;
    case "WHEREAMI":
      ret =
      <span className="command"> 
        Currently, you are connected to a remote server via an ssh terminal. This server
        houses various information, documents, and overall a good example of the Full Stack
        Development capabilities of the creator of JTOS (Jhon Tabio).
        <br/>
      </span>
      break;
    case "WHENAMI":
      ret =
      <span className="command"> 
        Not sure what to do tbh... time spent on this? My local time? Most recent commit time?
        <br/>
      </span>
      break;
    case "WHYAMI":
      ret =
      <span className="command"> 
        Why this? Why go through the effort of simulating a terminal? Well... because out of
        all my options / ideas for my portfolio, I thought this to be the best one that fits me.<br/>
        It was not too long ago where I had switched my working station from a Windows machine to a Linux machine.
        Since then, I have been enjoying the use of a terminal more than a GUI interface for the purposes
        of work. I emphasize work, because I most certainly still use Windows for leisure and entertainment :)
        <br/>
      </span>
      break;
    case "HOWAMI":
      ret =
      <span className="command"> 
        Doing very good! :)<br/><br/>
        Talk about tech stack maybe?
        <br/>
      </span>
      break;
    case "COLOR":
      if(process.length == 1)
        ret =
        <span className="command"> 
          Wrong usage, do `help color` for more information
          <br/>
        </span>
      else
        ret = changeColor(process.splice(1));
      break;
    case "BANNER":
      ret =
        <span className="command"> 
              _____  _________    ___     ______   
            |_   _||  _   _  | .'   `. .' ____ \  
              | |  |_/ | | \_|/  .-.  \| (___ \_| 
          _   | |      | |    | |   | | _.____`.  
          | |__' |     _| |_   \  `-'  /| \____) | 
          `.____.'    |_____|   `.___.'  \______.' 
                                         
          <br/>
        </span>
      break;
    default:
      ret = <span><em style={{color: "red"}}>bash: {process[0]}: command not found. Try help</em></span>
      break;
  }

  return ret;
}
