import { useState, useEffect } from "react"
import { useLocation } from "wouter";
import { banner, sliderChar } from "../utils/utils";
import "./Landing.css"

function Landing() {

  const [_, setLocation] = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [animate, setAnimation] = useState("init");
  const [slider, setSlider] = useState(true);
  const sliderKeyFrames = [102, 96.3, 88.6, 77.2,
        69.6, 62, 54.4, 46.8, 39.1, 36.2, 28.7, 19,
        11.5, 3.8, 0]
  const [sliderIndex, setSliderIndex] = useState(0);

  const options = [
    { name: "Graphical User Interface experience", link: "/GUI" },
    { name: "Command Line Interface experience", link: "/CLI" },
    { name: "Help", action: () => console.log("Information!") }
  ];

  const [arrow, setArrow] = useState<string>('-');

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(animate === "init")
      {
        setAnimation("post");
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
        let i = 0;
        const interval = setInterval(() => {
            setSlider(currentSlider => (i == 0 || i == sliderKeyFrames.length - 1)
                                        ? !currentSlider : true);
        }, 500);

        // Initial delay before starting the typing effect
        const delay = 2000;

        const typingTimeout = setTimeout(() => {
            const typingInterval = setInterval(() => {
              setSliderIndex((prev) => prev + 1);
              i++;
              
              if(i === sliderKeyFrames.length - 1)
              {
                clearInterval(typingInterval);
                
                setTimeout(() => {
                  setAnimation("transition");
                  console.log("Changed");
                }, 2000);
              }
            }, 250);
        }, delay);

        return () => {
          clearInterval(interval);
          clearTimeout(typingTimeout);
        }
    }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="landing_container" className={`${animate}`} onClick={() => {setAnimation("post")}}>
        <pre id="landing_banner" style={{color: "purple"}}>
          {banner}
          <pre id="landing_slider" style={{color: "purple", width: `${sliderKeyFrames[sliderIndex]}%`}}>
            {slider && sliderChar}
          </pre>
        </pre>

        <p id="landing_contact">
          <strong id="landing_contact-arrow" style={arrow === '—' ? 
            { color: "gray", marginRight: "0.3em", position: "relative", left: "-0.3em", transform: "scaleX(1.5)", transformOrigin: "left", display: "inline-block" }
            : {color: "gray"}}>{arrow} </strong>
          <strong>Reach me at 
            <a href="mailto:JhonTabioCS@gmail.com" style={{color: "inherit", fontWeight: "bold"}}> JhonTabioCS@gmail.com</a>
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

export default Landing
