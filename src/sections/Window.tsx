import { useCallback, useEffect, useState, type FC } from "react";

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
  const [position, setPosition] = useState(window.position);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus(window.id);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    },
    [isDragging, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (window.isMinimized) return null;

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
          <button
            onClick={() => onMinimize(window.id)}
            className="w-4 h-4 p-0 bg-gray-300 hover:bg-gray-400 text-black border border-gray-400"
            style={{ borderStyle: "outset" }}
          >
            _
          </button>
          <button
            onClick={() => onClose(window.id)}
            className="w-4 h-4 p-0 bg-red-400 hover:bg-red-500 text-black border border-gray-400"
            style={{ borderStyle: "outset" }}
          >
            ×
          </button>
        </div>
      </div>
      <div className="p-2 h-full overflow-auto">{window.component}</div>
    </div>
  );
};

export default Window;
