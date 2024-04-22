import { useState, useEffect } from "react"
import { useLocation } from "wouter";
import "./Landing.css"

function Landing() {

  const [location, setLocation] = useLocation();
  const [animate, setAnimation] = useState("intro");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const options = [
    { name: "Command Line Interface experience", link: "/CLI" },
    { name: "Graphical User Interface experience", link: "/GUI" },
    { name: "Help", action: () => console.log("Information!") }
  ];

  const [arrow, setArrow] = useState<string>('-');

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === "ArrowDown")
        setSelectedIndex((selectedIndex + 1) % options.length);
      else if(e.key === "ArrowUp")
        setSelectedIndex((selectedIndex - 1 + options.length) % options.length);

      if (e.key === "Enter")
      {
        const option = options[selectedIndex];

        if (option.link) setLocation(option.link);
        else if (option.action) option.action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, options, setLocation]);
    
    // Arrow animation
    useEffect(() => {
        const interval = setInterval(() => {
            setArrow(currentChar => currentChar === '>' ? '—' : '>');
        }, 500);

        return () => clearInterval(interval);
    }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="container" className={`${animate}`}>
        <pre id="banner" style={{"color": "purple"}}>
          ███╗     ██╗████████╗   ███████╗██╗  ██╗██████╗ ███████╗██████╗ ██╗███████╗███╗   ██╗ ██████╗███████╗███╗<br/>
          ██╔╝     ██║╚══██╔══╝   ██╔════╝╚██╗██╔╝██╔══██╗██╔════╝██╔══██╗██║██╔════╝████╗  ██║██╔════╝██╔════╝╚██║<br/>
          ██║      ██║   ██║█████╗█████╗   ╚███╔╝ ██████╔╝█████╗  ██████╔╝██║█████╗  ██╔██╗ ██║██║     █████╗   ██║<br/>
          ██║ ██   ██║   ██║╚════╝██╔══╝   ██╔██╗ ██╔═══╝ ██╔══╝  ██╔══██╗██║██╔══╝  ██║╚██╗██║██║     ██╔══╝   ██║<br/>
          ███╗╚█████╔╝   ██║      ███████╗██╔╝ ██╗██║     ███████╗██║  ██║██║███████╗██║ ╚████║╚██████╗███████╗███║<br/>
          ╚══╝ ╚════╝    ╚═╝      ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝╚══╝<br/>
        </pre>

        <p id="contact">
          <strong id="contact-arrow" style={arrow === '—' ? 
            { color: "gray", marginRight: "0.3em", position: "relative", left: "-0.3em", transform: "scaleX(1.5)", transformOrigin: "left", display: "inline-block" }
            : {color: "gray"}}>{arrow} </strong>
          <strong>Reach me at 
            <a href="mailto:JhonTabioCS@gmail.com" style={{color: "inherit", fontWeight: "bold"}}> JhonTabioCS@gmail.com</a>
          </strong>
        </p>

        <div id="info" style={{width: "50%"}}>
          <span style={{color: "lightblue"}}>?</span> Admin Dashboard | Welcome Page<br/>
          <ul style={{listStyleType: "None", margin: 0, padding: "0em 1em"}}>
            {options.map((e, i) => (
              <li key={i} onClick={() => {
                if(e.link) setLocation(e.link);
                else if(e.action) e.action();
              }} onMouseEnter={() => setSelectedIndex(i)}
                style={{ cursor: "pointer", color: selectedIndex === i ? "lightslategray" : "inherit"}}>
                {(selectedIndex === i ? "> " : '') + e.name}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  )
}

export default Landing
