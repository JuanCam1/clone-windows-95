import type { FC } from "react";

interface Props {
  items: MenuItemModelI[];
  onItemClick: (item: MenuItemModelI) => void;
  position: PositionModelI;
}
const StartMenuSubmenu: FC<Props> = ({ items, onItemClick, position }) => {
  return (
    <div
      className="absolute bg-gray-200 border-2 border-gray-400 shadow-lg z-50 min-w-48"
      style={{
        left: position.x,
        top: position.y,
        borderStyle: "outset",
      }}
    >
      <div className="py-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className="w-full px-3 py-1 text-left text-sm hover:bg-blue-100 text-black flex items-center gap-2"
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            {item.label}
            {item.submenu && <span className="ml-auto">▶</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StartMenuSubmenu;
