import type { FC } from "react";
import Button from "./Button";
import logo from "../assets/images/windows-0.png";

interface Props {
  openWindows: OpenWindowModelI[];
  onToggleWindow: (id: string) => void;
  onOpenStartMenu: () => void;
  startMenuOpen: boolean;
}
const Taskbar: FC<Props> = ({
  openWindows,
  onToggleWindow,
  onOpenStartMenu,
  startMenuOpen,
}) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-8 bg-gray-300 border-t-2 border-gray-400 flex items-center px-1 z-40"
      style={{ borderStyle: "outset" }}
    >
      <Button
        active={startMenuOpen}
        onClick={(e) => {
          e.stopPropagation();
          onOpenStartMenu();
        }}
      >
        <div className="w-full flex items-center gap-2">
          <img src={logo} alt="logo" className="w-4 h-4" />
          <span className="text-sm">Start</span>
        </div>
      </Button>

      <div className="flex-1 flex gap-1 ml-2">
        {openWindows.map((window) => (
          <Button
            key={window.id}
            onClick={() => onToggleWindow(window.id)}
            className={`${
              window.isMinimized ? "bg-gray-300" : "bg-blue-200"
            } text-black truncate max-w-32`}
            style={{ borderStyle: window.isMinimized ? "outset" : "inset" }}
          >
            {window.title}
          </Button>
        ))}
      </div>
      <div
        className="text-xs text-black px-2 border border-gray-400 bg-gray-100"
        style={{ borderStyle: "inset" }}
      >
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default Taskbar;
