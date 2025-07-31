import { type FC } from "react";
import useDraggableIcon from "../hooks/useDraggableIcon";

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
  const {
    handleMouseDown,
    handleRightClick,
    handleKeyDown,
    iconRef,
    inputRef,
    editingName,
    setEditingName,
    handleNameSubmit,
  } = useDraggableIcon({ icon, onMove, onRightClick, onNameChange });

  return (
    <div
      ref={iconRef}
      className="size-20 absolute flex flex-col items-center justify-center cursor-pointer select-none "
      style={{ left: icon.position.x, top: icon.position.y }}
      onMouseDown={handleMouseDown}
      onDoubleClick={() => !icon.isEditing && onDoubleClick(icon.id)}
      onContextMenu={handleRightClick}
    >
      <div className="w-8 h-8 mb-1">
        {typeof icon.icon === "string" ? (
          <img
            src={typeof icon.icon === "string" ? icon.icon : icon.icon}
            alt="icon"
            className="w-full h-full"
          />
        ) : (
          icon.icon
        )}
      </div>
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
        <span className="text-xs text-white text-center px-1 bg-opacity-50 rounded max-w-16 font-w95fa font-medium leading-tight break-words line-clamp-2">
          {icon.name}
        </span>
      )}
    </div>
  );
};

export default DraggableIcon;
