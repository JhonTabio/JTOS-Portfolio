import { useState, useEffect, useRef } from "react"
import { useLocation } from "wouter";
import { bannerChars, sliderChar, initialize } from "../utils/utils";
import "./Landing.css"

function Landing() {
  useEffect(() => {
    initialize();
    document.title = "Jhon Tabio | Welcome"

    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement
      if (favicon) favicon.href = "https://cdn-icons-png.freepik.com/512/6467/6467131.png?ga=GA1.1.1776313894.1759613306";
  }, []);

  const [_, setLocation] = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [animate, setAnimation] = useState("init");
  const animateIntervalRef = useRef<number | null>(null);
  const [typeIndex, setTypeIndex] = useState(0);
  const typeDelay = 2000;
  const typeSpeed = 250;

  const blinkIntervalRef = useRef<number | null>(null);
  const [blink, setBlink] = useState(true);

  const typeTimeoutRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  const options = [
    { name: "Graphical User Interface experience [Experimental]", link: "/GUI" },
    { name: "Command Line Interface experience", link: "/CLI" },
    { name: "Help", action: () => alert("Very useful help will be here soon! Try the CLI experience") }
  ];

  const [arrow, setArrow] = useState<string>('-');

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(animate === "init")
      {
        setAnimation("transition");
        return;
      }

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

  // Blinking animation
  useEffect(() => {
    const blink = () => {
      if(blinkIntervalRef.current)
      {
        clearInterval(blinkIntervalRef.current);
        blinkIntervalRef.current = null;
      }

      blinkIntervalRef.current = setInterval(() => {
          setBlink(currentBlink => !currentBlink);
      }, 500);
    }

    blink();

    typeTimeoutRef.current = setTimeout(() => {
      animateIntervalRef.current = setInterval(() => {
        setTypeIndex((prev) => {
          const next: number = prev + 1;
          if(next >= bannerChars.length)
          {
            if(animateIntervalRef.current)
            {
              clearInterval(animateIntervalRef.current);
              animateIntervalRef.current = null;
            }

            blink();

            transitionTimeoutRef.current = setTimeout(() => {setAnimation("transition");}, 1900);
            return bannerChars.length;
          }
          return next;
        });
      },typeSpeed);
    }, typeDelay);

    return () => {
      handleAnimationCleanUp();
    };
  }, []);

  const handleAnimationCleanUp = () => {
      if(blinkIntervalRef.current)
      {
        clearInterval(blinkIntervalRef.current);
        blinkIntervalRef.current = null;
      }

      if(typeTimeoutRef.current)
      {
        clearInterval(typeTimeoutRef.current);
        typeTimeoutRef.current = null;
      }

      if(transitionTimeoutRef.current)
      {
        clearInterval(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }

      if(animateIntervalRef.current)
      {
        clearInterval(animateIntervalRef.current);
        animateIntervalRef.current = null;
      }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="landing_container" className={`${animate}`} onClick={() => {if(animate === "init"){
        handleAnimationCleanUp();
        setTypeIndex(bannerChars.length);
        setAnimation("transition");
      }}}>
        <div id="landing_banner" style={{color: "purple", display: "flex"}}>
          {bannerChars.slice(0, typeIndex).map((char, i) => (<pre key={i}>{char}</pre>))}
          {animate === "init" && <pre style={{visibility: `${blink ? "visible" : "hidden"}`}}>{sliderChar}</pre>}
        </div>

        <p id="landing_contact">
          <strong id="landing_contact-arrow" style={arrow === '—' ? 
            { color: "gray", marginRight: "0.3em", position: "relative", left: "-0.3em", transform: "scaleX(1.5)", transformOrigin: "left", display: "inline-block" }
            : {color: "gray"}}>{arrow} </strong>
          <strong>Reach me at 
            <a id="landing_email" href="mailto:JhonTabioCS@gmail.com"> JhonTabioCS@gmail.com</a>
          </strong>
        </p>

        <div id="landing_info" style={{width: "50%"}}>
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

export default Landing;
