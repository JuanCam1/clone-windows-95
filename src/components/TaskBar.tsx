import type { FC } from "react";
import Button from "./Button";
import logo from "../assets/images/windows-0.png";
import DateCalendar from "./DateCalendar";

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
      className="fixed bottom-0 left-0 right-0 bg-[#c0c0c0] border-t-2 border-l-[#dcdcdc] flex items-center  px-1 py-1 z-40"
      style={{ borderStyle: "outset" }}
    >
      <div className="flex items-center gap-2">
        <div className="flex-grow max-w-[200px] mr-2">
          <Button
            active={startMenuOpen}
            onClick={(e) => {
              e.stopPropagation();
              onOpenStartMenu();
            }}
            className="w-full"
          >
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-4 h-4" />
              <span className="text-sm">Start</span>
            </div>
          </Button>
        </div>

        <div className="flex gap-1 flex-wrap bg-red-400">
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
      </div>

      <DateCalendar />
    </div>
  );
};

export default Taskbar;
