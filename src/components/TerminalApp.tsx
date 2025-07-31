import { useEffect, useRef, useState } from "react";
import { personalInfo } from "../consts/data-info";

const TerminalApp = () => {
  const [history, setHistory] = useState<string[]>([
    "Microsoft(R) Windows 95",
    "(C)Copyright Microsoft Corp 1981-1995.",
    "",
    "C:\\>",
  ]);

  const [command, setCommand] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);

  const processCommand = (cmd: string) => {
    const output: string[] = [];
    const parts = cmd.trim().split(" ");
    const mainCommand = parts[0].toLowerCase();
    const arg = parts[1] ? parts[1].toLowerCase() : "";

    switch (mainCommand) {
      case "echo":
        if (arg in personalInfo) {
          output.push(personalInfo[arg as keyof PersonalInfoModelI]);
        } else {
          output.push(
            `Error: Unknown argument '${arg}'. Try 'echo name', 'echo email', etc.`
          );
        }
        break;
      case "help":
        output.push("Available commands:");
        output.push(
          "  echo [name|email|skills|bio|contact] - Get personal information."
        );
        output.push("  help - Display this help message.");
        output.push("  clear - Clear the terminal screen.");
        output.push("  exit - Close the terminal application.");
        break;
      case "clear":
        setHistory(["C:\\>"]);
        return;
      case "exit":
        return null;
      case "":
        // Do nothing for empty command
        break;
      default:
        output.push(
          `'${mainCommand}' is not recognized as an internal or external command, operable program or batch file.`
        );
        break;
    }

    setHistory((prev) => [...prev, `C:\\>${cmd}`, ...output, "C:\\>"]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(command);
      setCommand("");
    }
  };

  return (
    <div
      className="bg-black text-green-400 font-mono p-2 w-full h-[90%] flex flex-col border-2 border-gray-400"
      style={{ borderStyle: "inset" }}
    >
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto text-sm whitespace-pre-wrap break-words "
      >
        {history.map((line, index) => (
          <div key={index} className="font-w95fa tracking-wider">
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center mt-2">
        <span className="text-sm font-w95fa tracking-wider">C:\&gt;</span>
        <input
          ref={inputRef}
          type="text"
          className="font-w95fa tracking-wider flex-1 bg-transparent border-none outline-none text-green-400 ml-1 text-sm"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck="false"
        />
      </div>
    </div>
  );
};
export default TerminalApp;
