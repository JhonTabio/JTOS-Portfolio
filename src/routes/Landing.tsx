import { useState, useEffect } from "react"
import "./Landing.css"

function Landing() {

  const [animate, setAnimation] = useState("intro");

  const [arrow, setArrow] = useState<string>('-');
    
    useEffect(() => {
        const interval = setInterval(() => {
            setArrow(currentChar => currentChar === '>' ? '—' : '>');
        }, 500);

        return () => clearInterval(interval);
    }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="container" class={`${animate}`}>
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

        <p id="info" style={{width: "50%"}}>
          <span style={{color: "lightblue"}}>?</span> Admin Dashboard | Welcome Page<br/>
          <ul>
            Command Line Interface experience<br/>
            Graphical User Interface experience
          </ul>
        </p>

      </div>
    </>
  )
}

export default Landing
