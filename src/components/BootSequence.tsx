import { useEffect, useState } from "react";

function BootSequence()
{
  // Boot sequence
  const [boot_animate, setBootAnimation] = useState(true); // Maybe cache if you want animate to play or not and set to play when user uses exit cmd?
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Fetch boot text
  useEffect(() => {
    fetch("/boot.log")
      .then(response => response.text())
      .then(text => {
        const logLines = text.split('\n');
        setLines(logLines);
        setCurrentLineIndex(1);
      });

    document.getElementById("cli_intro")?.focus();
  }, []);

  // Append the lines as long as there are lines left to display
  useEffect(() => {
    if (currentLineIndex < lines.length && boot_animate)
    {
      // Display lines in random intervals
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prevIndex => prevIndex + 1);
      }, Math.random() * 200);
      return () => clearTimeout(timeout);
    }
    else
    {
      const removeIntro = setTimeout(() => {
        document.getElementById("cli_intro")!.remove();
      }, boot_animate ? 2000 : 200);

      const showTerminal = setTimeout(() => {
        document.getElementById("cli_terminal")!.style.display = "inherit";
        document.getElementById("cli_commandInput")?.focus();

      }, boot_animate ? 3000 : 500);

      return () => {clearTimeout(removeIntro), clearTimeout(showTerminal)};
    }
  }, [currentLineIndex]);

  return(
    <>
      <div id="cli_intro" tabIndex={1} onKeyDown={() => setBootAnimation(false)} onMouseDown={() => setBootAnimation(false)}>
        <div id="cli_boot">
          {lines.slice(0, currentLineIndex).map((line, index) => {
            const currentDate = new Date();

            const formattedDate = `${currentDate.toLocaleDateString('en-US', {weekday: 'short'})} ${currentDate.toLocaleDateString('en-US', {month: 'short', day: '2-digit'})} ${currentDate.toLocaleTimeString('en-US', {hour12: false})} ${currentDate.getFullYear()}`;

            if(line.includes("%date%")) line = line.replace(/%date%/g, formattedDate);

            if (line.includes("[  OK  ]"))
              return (
                <div key={index} style={{whiteSpace: "pre-wrap"}}>
                  {line.substring(0, line.indexOf("[  OK  ]"))} <span style={{color: "green"}}>{line.substring(line.indexOf("[  OK  ]"), line.length)}</span>
                </div>
              );
            else if (line.includes("[FAILED]"))
              return (
                <div key={index} style={{whiteSpace: "pre-wrap"}}>
                  {line.substring(0, line.indexOf("[FAILED]"))} <span style={{color: "red"}}>{line.substring(line.indexOf("[FAILED]"), line.length)}</span>
                </div>
              );
            else 
              return (
                <div key={index} style={{whiteSpace: "pre-wrap"}}>
                  {line}
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
}

export default BootSequence;
