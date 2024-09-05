import CommandCWD from "./CommandCWD";

function CommandInput({cmdRef, onSubmit}: {cmdRef: React.RefObject<HTMLInputElement>, onSubmit: () => void})
{

  return(
      <div id="cli_cl">
        <CommandCWD/>
        <span id="cli_command">
          &nbsp;

          <form style={{display: "inline"}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => {e.preventDefault(); onSubmit(); cmdRef.current!.value = ""}}>
            <input id="cli_commandInput" name="cmd" type="text" ref={cmdRef}/>
          </form>
        </span>
      </div>
  );
}

export default CommandInput;
