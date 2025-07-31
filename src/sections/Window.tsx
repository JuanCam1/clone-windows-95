import { type FC } from "react";
import Button from "../components/Button";
import useWindow from "../hooks/useWindow";

interface Props {
  window: OpenWindowModelI;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  isActive: boolean;
}

const Window: FC<Props> = ({
  window,
  onClose,
  onMinimize,
  onFocus,
  isActive,
}) => {
  if (window.isMinimized) return null;

  const { position, handleMouseDown } = useWindow({ window, onFocus });
  return (
    <div
      className={`absolute bg-gray-200 border-2 border-gray-400 shadow-lg transition-all duration-200 ${
        isActive ? "z-50" : ""
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
        borderStyle: "outset",
      }}
      onClick={() => onFocus(window.id)}
    >
      <div
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 cursor-move flex justify-between items-center"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-bold">{window.title}</span>
        <div className="flex gap-1">
          <Button
            onClick={() => onMinimize(window.id)}
            className="size-4 flex justify-center items-center"
          >
            -
          </Button>
          <Button
            onClick={() => onClose(window.id)}
            className="size-4 flex justify-center items-center"
          >
            x
          </Button>
        </div>
      </div>
      <div className="p-2 h-full overflow-auto">{window.component}</div>
    </div>
  );
};

export default Window;
