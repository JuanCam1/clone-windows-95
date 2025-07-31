import {
  Calculator,
  Edit,
  FileText,
  Folder,
  Grid3X3,
  HelpCircle,
  Play,
  Power,
  Search,
  Settings,
} from "lucide-react";
import { useState, type FC, type MouseEvent } from "react";
import StartMenuSubmenu from "../components/StartMenuSubMenu";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}
const StartMenu: FC<Props> = ({ isOpen, onClose, onOpenApp }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<PositionModelI>({
    x: 0,
    y: 0,
  });

  const accessoriesItems: MenuItemModelI[] = [
    {
      id: "calculator",
      label: "Calculator",
      icon: <Calculator className="w-4 h-4" />,
      action: () => onOpenApp("calculator"),
    },
    {
      id: "notepad",
      label: "Notepad",
      icon: <FileText className="w-4 h-4" />,
      action: () => onOpenApp("notepad"),
    },
    {
      id: "paint",
      label: "Paint",
      icon: <Edit className="w-4 h-4" />,
      action: () => onOpenApp("paint"),
    },
  ];

  const gamesItems: MenuItemModelI[] = [
    {
      id: "solitaire",
      label: "Solitaire",
      icon: <Play className="w-4 h-4" />,
      action: () => onOpenApp("solitaire"),
    },
    {
      id: "minesweeper",
      label: "Minesweeper",
      icon: <Grid3X3 className="w-4 h-4" />,
      action: () => onOpenApp("minesweeper"),
    },
  ];

  const programsItems: MenuItemModelI[] = [
    {
      id: "accessories",
      label: "Accessories",
      icon: <Folder className="w-4 h-4" />,
      submenu: accessoriesItems,
    },
    {
      id: "games",
      label: "Games",
      icon: <Play className="w-4 h-4" />,
      submenu: gamesItems,
    },
    {
      id: "explorer",
      label: "Windows Explorer",
      icon: <Folder className="w-4 h-4" />,
      action: () => onOpenApp("explorer"),
    },
  ];

  const mainMenuItems: MenuItemModelI[] = [
    {
      id: "programs",
      label: "Programs",
      icon: <Folder className="w-4 h-4" />,
      submenu: programsItems,
    },
    {
      id: "documents",
      label: "Documents",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      submenu: [
        {
          id: "control-panel",
          label: "Control Panel",
          icon: <Settings className="w-4 h-4" />,
          action: () => onOpenApp("settings"),
        },
      ],
    },
    {
      id: "find",
      label: "Find",
      icon: <Search className="w-4 h-4" />,
      submenu: [
        {
          id: "find-files",
          label: "Files or Folders...",
          icon: <Search className="w-4 h-4" />,
          action: () => onOpenApp("find"),
        },
      ],
    },
    {
      id: "help",
      label: "Help",
      icon: <HelpCircle className="w-4 h-4" />,
    },
    {
      id: "run",
      label: "Run...",
      icon: <Play className="w-4 h-4" />,
    },
  ];

  const handleItemHover = (item: MenuItemModelI, event: MouseEvent) => {
    if (item.submenu) {
      const rect = event.currentTarget.getBoundingClientRect();
      setSubmenuPosition({
        x: rect.right,
        y: rect.top,
      });
      setActiveSubmenu(item.id);
    } else {
      setActiveSubmenu(null);
    }
  };

  const handleSubmenuItemClick = (item: MenuItemModelI) => {
    if (item.action) {
      item.action();
      onClose();
    } else if (item.submenu) {
      // Handle nested submenus if needed
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="absolute bottom-8 left-0 w-64 bg-gray-200 border-2 border-gray-400 shadow-lg z-50"
        style={{ borderStyle: "outset" }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xs">95</span>
          </div>
          Windows 95
        </div>
        <div className="p-2">
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onMouseEnter={(e) => handleItemHover(item, e)}
              onClick={() => {
                if (item.action) {
                  item.action();
                  onClose();
                }
              }}
              className="w-full justify-start mb-1 bg-gray-200 hover:bg-blue-100 text-black border-0 flex items-center gap-2 px-2 py-1 text-sm"
            >
              {item.icon}
              {item.label}
              {item.submenu && <span className="ml-auto">▶</span>}
            </button>
          ))}
          <hr className="my-2 border-gray-400" />
          <button
            onClick={onClose}
            className="w-full justify-start bg-gray-200 hover:bg-blue-100 text-black border-0"
          >
            <Power className="w-4 h-4 mr-2" />
            Shut Down...
          </button>
        </div>
      </div>

      {activeSubmenu && (
        <StartMenuSubmenu
          items={
            mainMenuItems.find((item) => item.id === activeSubmenu)?.submenu ||
            []
          }
          onItemClick={handleSubmenuItemClick}
          position={submenuPosition}
        />
      )}
    </>
  );
};

export default StartMenu;
