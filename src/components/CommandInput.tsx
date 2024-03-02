import React, { useEffect, useRef } from 'react';

interface CommandInput
{
  value: string;
  onChange: (value: string) => void;
  onKeyDown: () => void;
}

const CommandInput: React.FC<CommandInput> = ({value, onChange, onKeyDown}) => {
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
    if(e.key === "Enter") onKeyDown();
  };

  return(
      <div id="cl">
        <span className="commandInputInfo">
          [<span className="client">
              client
          </span>
          <span className="@">
            @
          </span>
          <span className="server">
            portfolio
          </span>
          <span className="directory">
            &nbsp;~
          </span>]$
        </span>
        <span className="command">
          &nbsp;<input ref={inputRef} className="commandInput" name="cmd" type="text" value={value} onChange={handleChange} onKeyDown={handleKeyDown} autoFocus/>
        </span>
      </div>
  );
}

export default CommandInput;
