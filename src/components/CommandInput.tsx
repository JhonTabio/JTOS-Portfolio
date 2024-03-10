import React, { useEffect, useRef } from 'react';
import CommandDir from './CommandDir';

interface CommandInput
{
  dir: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: () => void;
}

const CommandInput: React.FC<CommandInput> = ({ dir, value, onChange, onKeyDown }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusInput = () => {
      inputRef.current?.focus();
    };

    document.body.addEventListener('click', focusInput);

    return () => {
      document.body.removeEventListener('click', focusInput);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter")
    {
      onKeyDown();

      if(!inputRef.current) return;

      const rect = inputRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (!isVisible) inputRef.current.scrollIntoView({ block: 'nearest', inline: 'start' });
    }
  };

  return(
      <div id="cl">
        <span className="commandInputInfo">
          <CommandDir dir={dir}/>
        </span>
        <span className="command">
          &nbsp;<input ref={inputRef} className="commandInput" name="cmd" type="text" value={value} onChange={handleChange} onKeyDown={handleKeyDown} autoFocus/>
        </span>
      </div>
  );
}

export default CommandInput;
