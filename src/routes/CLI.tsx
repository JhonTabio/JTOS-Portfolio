import { useState, useEffect } from "react";
import BootSequence from "../components/BootSequence.tsx";
import "./CLI.css"

function CLI()
{
  return(
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="cli_container">
        <BootSequence/>
        <div id="cli_terminal" style={{display: "none"}}>
          <h1> Hello World!</h1>
        </div>
      </div>
    </>
  );
}

export default CLI;
