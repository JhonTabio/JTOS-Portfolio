import { useEffect, useState, useRef } from "react";
import BootSequence from "../components/BootSequence.tsx";
import CommandInput from "../components/CommandInput.tsx";
import "./CLI.css"

function CLI()
{
  const cmdRef = useRef<HTMLInputElement>(null);

  return(
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="cli_container" onClick={() => cmdRef.current!.focus()}>
        <BootSequence/>
        <div id="cli_terminal" style={{display: "none"}}>
          <CommandInput cmdRef={cmdRef} onSubmit={() => console.log(cmdRef.current!.value!)}/>
        </div>
      </div>
    </>
  );
}

export default CLI;
