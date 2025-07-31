import { Edit, Trash2 } from "lucide-react";
import type { FC } from "react";

const IconContextMenu: FC<IconContextMenuPropsModelI> = ({
  isOpen,
  position,
  onClose,
  onRename,
  onDelete,
  iconType,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute bg-gray-200 border-2 border-gray-400 shadow-lg z-50 min-w-32"
      style={{
        left: position.x,
        top: position.y,
        borderStyle: "outset",
      }}
    >
      <div className="py-1">
        <button
          onClick={() => {
            onRename();
            onClose();
          }}
          className="w-full px-3 py-1 text-left text-sm hover:bg-blue-100 text-black flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Rename
        </button>
        {iconType === "folder" && (
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="w-full px-3 py-1 text-left text-sm hover:bg-blue-100 text-black flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
        <hr className="my-1 border-gray-400" />
        <button
          onClick={onClose}
          className="w-full px-3 py-1 text-left text-sm hover:bg-blue-100 text-black"
        >
          Properties
        </button>
      </div>
    </div>
  );
};

export default IconContextMenu;
