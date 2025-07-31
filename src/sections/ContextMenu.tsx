import { FolderPlus } from "lucide-react";
import type { FC } from "react";

const ContextMenu: FC<ContextMenuPropsModelI> = ({
  isOpen,
  position,
  onClose,
  onArrangeIcons,
  onRefresh,
  onNewFolder,
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
            onArrangeIcons();
            onClose();
          }}
          className="w-full px-3 py-1 text-left text-sm hover:bg-blue-100 text-black"
        >
          Arrange Icons
        </button>
        <button
          onClick={() => {
            onRefresh();
            onClose();
          }}
          className="w-full px-3 py-1 text-left text-sm hover:bg-blue-100 text-black"
        >
          Refresh
        </button>
        <hr className="my-1 border-gray-400" />
        <button
          onClick={() => {
            onNewFolder();
            onClose();
          }}
          className="w-full px-3 py-1 text-left text-sm hover:bg-blue-100 text-black flex items-center gap-2"
        >
          <FolderPlus className="w-4 h-4" />
          New Folder
        </button>
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

export default ContextMenu;
