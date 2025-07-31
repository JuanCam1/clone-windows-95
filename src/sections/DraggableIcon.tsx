import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type KeyboardEvent,
} from "react";

interface Props {
  icon: DesktopIconModelI;
  onMove: (id: string, position: PositionModelI) => void;
  onDoubleClick: (id: string) => void;
  onRightClick: (id: string, position: PositionModelI) => void;
  onNameChange: (id: string, newName: string) => void;
}

const DraggableIcon: FC<Props> = ({
  icon,
  onMove,
  onDoubleClick,
  onRightClick,
  onNameChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingName, setEditingName] = useState(icon.name);
  const iconRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (icon.isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [icon.isEditing]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (icon.isEditing) return;

    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRightClick(icon.id, { x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && !icon.isEditing) {
        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        };
        onMove(icon.id, newPosition);
      }
    },
    [isDragging, dragOffset, icon.id, icon.isEditing, onMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleNameSubmit = () => {
    if (editingName.trim()) {
      onNameChange(icon.id, editingName.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    } else if (e.key === "Escape") {
      setEditingName(icon.name);
      onNameChange(icon.id, icon.name);
    }
  };

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

  return (
    <div
      ref={iconRef}
      className="absolute flex flex-col items-center cursor-pointer select-none"
      style={{ left: icon.position.x, top: icon.position.y }}
      onMouseDown={handleMouseDown}
      onDoubleClick={() => !icon.isEditing && onDoubleClick(icon.id)}
      onContextMenu={handleRightClick}
    >
      <div className="w-8 h-8 mb-1 text-white">{icon.icon}</div>
      {icon.isEditing ? (
        <input
          ref={inputRef}
          value={editingName}
          onChange={(e) => setEditingName(e.target.value)}
          onBlur={handleNameSubmit}
          onKeyDown={handleKeyDown}
          className="text-xs text-center px-1 bg-white text-black rounded border border-blue-500 w-16"
        />
      ) : (
        <span className="text-xs text-white text-center px-1 bg-black bg-opacity-50 rounded max-w-16 truncate">
          {icon.name}
        </span>
      )}
    </div>
  );
};

export default DraggableIcon;
