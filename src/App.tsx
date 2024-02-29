import React, { useState } from 'react';
import CommandInput from './components/CommandInput'
import './App.css'

function App()
{
  const [cmdValue, setCmdValue] = useState('');
  const [cmdData, setCmdData] = useState('');

  const handleOnChange = (newValue: string) => {
    setCmdValue(newValue);
  };

  const handleKeyDown = () => {
    setCmdData(`You entered: ${cmdValue}`);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>

      <div id="terminal">
        {cmdData && <div>{cmdData}</div>}
        <CommandInput value={cmdValue} onChange={handleOnChange} onKeyDown={handleKeyDown}/>
      </div>
    </>
  )
}

export default App
