import { createFileRoute } from "@tanstack/react-router";
import DraggableIcon from "../sections/DraggableIcon";
import { useState, type ReactNode } from "react";
import { Edit, Folder } from "lucide-react";
import { gridToPixel } from "../utils/gridToPixel";
import { GRID_SIZE, ICON_OFFSET } from "../consts";
import { pixelToGrid } from "../utils/pixelToGrid";
import { findNearestFreeGridPosition } from "../utils/findNearestFreeGridPosition";
import CalculatorApp from "../components/CalculatorApp";
import Window from "../sections/Window";
import Taskbar from "../components/TaskBar";
import StartMenu from "../sections/StartMenu";
import ContextMenu from "../sections/ContextMenu";
import IconContextMenu from "../components/IconContextMenu";
import calculator from "../assets/images/calculator-0.png";

export const Route = createFileRoute("/desktop")({
  component: RouteComponent,
});

function RouteComponent() {
  const [icons, setIcons] = useState<DesktopIconModelI[]>([
    {
      id: "calculator",
      name: "Calculator",
      icon: calculator,
      position: gridToPixel(0, 0),
      app: "calculator",
      type: "application",
    },
    {
      id: "notepad",
      name: "Notepad",
      icon: calculator,
      position: gridToPixel(0, 1),
      app: "notepad",
      type: "application",
    },
    {
      id: "explorer",
      name: "My Computer",
      icon: calculator,
      position: gridToPixel(0, 2),
      app: "explorer",
      type: "application",
    },
    {
      id: "settings",
      name: "Control Panel",
      icon: calculator,
      position: gridToPixel(0, 3),
      app: "settings",
      type: "application",
    },
  ]);

  const [openWindows, setOpenWindows] = useState<OpenWindowModelI[]>([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: PositionModelI;
  }>({
    isOpen: false,
    position: { x: 0, y: 0 },
  });

  const [iconContextMenu, setIconContextMenu] = useState<{
    isOpen: boolean;
    position: PositionModelI;
    iconId: string | null;
    iconType: "application" | "folder";
  }>({
    isOpen: false,
    position: { x: 0, y: 0 },
    iconId: null,
    iconType: "application",
  });
  const [folderCounter, setFolderCounter] = useState(1);

  const moveIcon = (id: string, position: PositionModelI) => {
    const maxGridX =
      Math.floor((window.innerWidth - ICON_OFFSET * 2) / GRID_SIZE) - 1;
    const maxGridY =
      Math.floor((window.innerHeight - 100 - ICON_OFFSET * 2) / GRID_SIZE) - 1;

    const targetGrid = pixelToGrid(position.x, position.y);
    const freeGrid = findNearestFreeGridPosition(
      targetGrid.gridX,
      targetGrid.gridY,
      icons,
      id,
      maxGridX,
      maxGridY
    );
    const finalPosition = gridToPixel(freeGrid.gridX, freeGrid.gridY);

    setIcons((prev) =>
      prev.map((icon) =>
        icon.id === id ? { ...icon, position: finalPosition } : icon
      )
    );
  };

  const arrangeIcons = () => {
    const sortedIcons = [...icons].sort((a, b) => a.name.localeCompare(b.name));
    const arrangedIcons = sortedIcons.map((icon, index) => ({
      ...icon,
      position: gridToPixel(Math.floor(index / 8), index % 8),
    }));
    setIcons(arrangedIcons);
  };

  const refreshDesktop = () => {
    console.log("Desktop refreshed");
  };

  const createNewFolder = () => {
    const maxGridX =
      Math.floor((window.innerWidth - ICON_OFFSET * 2) / GRID_SIZE) - 1;
    const maxGridY =
      Math.floor((window.innerHeight - 100 - ICON_OFFSET * 2) / GRID_SIZE) - 1;

    const freeGrid = findNearestFreeGridPosition(
      1,
      1,
      icons,
      undefined,
      maxGridX,
      maxGridY
    );
    const position = gridToPixel(freeGrid.gridX, freeGrid.gridY);

    const newFolder: DesktopIconModelI = {
      id: `folder-${Date.now()}`,
      name: `New Folder`,
      icon: <Folder className="w-full h-full" />,
      position,
      type: "folder",
      isEditing: true,
    };

    setIcons((prev) => [...prev, newFolder]);
    setFolderCounter((prev) => prev + 1);
  };

  const handleIconRightClick = (iconId: string, position: PositionModelI) => {
    const icon = icons.find((i) => i.id === iconId);
    if (icon) {
      setIconContextMenu({
        isOpen: true,
        position,
        iconId,
        iconType: icon.type,
      });
    }
  };

  const handleIconRename = (iconId: string) => {
    setIcons((prev) =>
      prev.map((icon) =>
        icon.id === iconId ? { ...icon, isEditing: true } : icon
      )
    );
  };

  const handleIconDelete = (iconId: string) => {
    setIcons((prev) => prev.filter((icon) => icon.id !== iconId));
  };

  const handleNameChange = (iconId: string, newName: string) => {
    setIcons((prev) =>
      prev.map((icon) =>
        icon.id === iconId ? { ...icon, name: newName, isEditing: false } : icon
      )
    );
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ isOpen: false, position: { x: 0, y: 0 } });
  };

  const closeIconContextMenu = () => {
    setIconContextMenu({
      isOpen: false,
      position: { x: 0, y: 0 },
      iconId: null,
      iconType: "application",
    });
  };

  const openApp = (appId: string) => {
    const existingWindow = openWindows.find((w) => w.id === appId);
    if (existingWindow) {
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === appId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
        )
      );
      setNextZIndex((prev) => prev + 1);
      setActiveWindowId(appId);
      return;
    }

    let component: ReactNode;
    let title: string;
    let size = { width: 300, height: 200 };

    switch (appId) {
      case "calculator":
        component = <CalculatorApp />;
        title = "Calculator";
        size = { width: 280, height: 400 };
        break;
      case "notepad":
        component = (
          <div className="w-full h-full">
            <textarea
              className="w-full h-full p-2 border-2 border-gray-400 resize-none font-mono text-sm"
              style={{ borderStyle: "inset" }}
              placeholder="Type your text here..."
            />
          </div>
        );
        title = "Untitled - Notepad";
        size = { width: 400, height: 300 };
        break;
      case "explorer":
        component = (
          <div
            className="w-full h-full bg-white border-2 border-gray-400"
            style={{ borderStyle: "inset" }}
          >
            <div className="p-2">
              <div className="flex items-center gap-2 mb-2">
                <Folder className="w-4 h-4" />
                <span className="text-sm">My Computer</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2 hover:bg-blue-100 cursor-pointer">
                  <Folder className="w-6 h-6" />
                  <span className="text-sm">C: Drive</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-blue-100 cursor-pointer">
                  <Folder className="w-6 h-6" />
                  <span className="text-sm">D: Drive</span>
                </div>
              </div>
            </div>
          </div>
        );
        title = "My Computer";
        size = { width: 350, height: 250 };
        break;
      case "paint":
        component = (
          <div
            className="w-full h-full bg-white border-2 border-gray-400"
            style={{ borderStyle: "inset" }}
          >
            <div className="p-2">
              <div className="flex items-center gap-2 mb-2">
                <Edit className="w-4 h-4" />
                <span className="text-sm">Paint</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2 hover:bg-blue-100 cursor-pointer">
                  <Edit className="w-6 h-6" />
                  <span className="text-sm">New Image</span>
                </div>
              </div>
            </div>
          </div>
        );
        title = "Paint";
        size = { width: 400, height: 300 };
        break;
      default:
        component = <div className="p-4">Application not implemented yet</div>;
        title = "Unknown App";
    }

    const newWindow: OpenWindowModelI = {
      id: appId,
      title,
      component,
      position: {
        x: 100 + openWindows.length * 30,
        y: 100 + openWindows.length * 30,
      },
      size,
      isMinimized: false,
      zIndex: nextZIndex,
    };

    setOpenWindows((prev) => [...prev, newWindow]);
    setNextZIndex((prev) => prev + 1);
    setActiveWindowId(appId);
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleWindow = (id: string) => {
    const window = openWindows.find((w) => w.id === id);
    if (window) {
      if (window.isMinimized) {
        setOpenWindows((prev) =>
          prev.map((w) =>
            w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
          )
        );
        setNextZIndex((prev) => prev + 1);
        setActiveWindowId(id);
      } else {
        minimizeWindow(id);
      }
    }
  };

  const focusWindow = (id: string) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex } : w))
    );
    setNextZIndex((prev) => prev + 1);
    setActiveWindowId(id);
  };

  return (
    <div
      className="h-screen w-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(45deg, #008080 25%, transparent 25%), linear-gradient(-45deg, #008080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #008080 75%), linear-gradient(-45deg, transparent 75%, #008080 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        backgroundColor: "#008080",
      }}
      onClick={() => {
        setStartMenuOpen(false);
        closeContextMenu();
        closeIconContextMenu();
      }}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons */}
      {icons.map((icon) => (
        <DraggableIcon
          key={icon.id}
          icon={icon}
          onMove={moveIcon}
          onDoubleClick={openApp}
          onRightClick={handleIconRightClick}
          onNameChange={handleNameChange}
        />
      ))}

      {/* Windows */}
      {openWindows.map((window) => (
        <Window
          key={window.id}
          window={window}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onFocus={focusWindow}
          isActive={activeWindowId === window.id}
        />
      ))}

      {/* Start Menu */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenApp={openApp}
      />

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows}
        onToggleWindow={toggleWindow}
        onOpenStartMenu={() => setStartMenuOpen(!startMenuOpen)}
        startMenuOpen={startMenuOpen}
      />

      {/* Context Menu */}
      <ContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={closeContextMenu}
        onArrangeIcons={arrangeIcons}
        onRefresh={refreshDesktop}
        onNewFolder={createNewFolder}
      />

      {/* Icon Context Menu */}
      <IconContextMenu
        isOpen={iconContextMenu.isOpen}
        position={iconContextMenu.position}
        onClose={closeIconContextMenu}
        onRename={() =>
          iconContextMenu.iconId && handleIconRename(iconContextMenu.iconId)
        }
        onDelete={() =>
          iconContextMenu.iconId && handleIconDelete(iconContextMenu.iconId)
        }
        iconType={iconContextMenu.iconType}
      />
    </div>
  );
}
