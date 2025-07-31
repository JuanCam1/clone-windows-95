import { useState, type ReactNode } from "react";
import { apps } from "../consts/data-apps";
import { GRID_SIZE, ICON_OFFSET } from "../consts";
import { pixelToGrid } from "../utils/pixelToGrid";
import { findNearestFreeGridPosition } from "../utils/findNearestFreeGridPosition";
import { gridToPixel } from "../utils/gridToPixel";
import { Folder } from "lucide-react";
import CalculatorApp from "../components/CalculatorApp";
import NoteApp from "../components/NoteApp";
import PaintApp from "../components/PaintApp";
import ExplorerApp from "../components/ExplorerApp";

const useDesktop = () => {
  const [icons, setIcons] = useState<DesktopIconModelI[]>(apps);

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
        size = { width: 280, height: 300 };
        break;
      case "notepad":
        component = <NoteApp />;
        title = "Untitled - Notepad";
        size = { width: 400, height: 300 };
        break;
      case "explorer":
        component = <ExplorerApp />;
        title = "My Computer";
        size = { width: 350, height: 250 };
        break;
      case "paint":
        component = <PaintApp />;
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

  return {
    setStartMenuOpen,
    closeContextMenu,
    closeIconContextMenu,
    handleContextMenu,
    icons,
    moveIcon,
    openApp,
    handleIconRightClick,
    handleNameChange,
    openWindows,
    startMenuOpen,
    contextMenu,
    handleIconRename,
    handleIconDelete,
    closeWindow,
    minimizeWindow,
    focusWindow,
    activeWindowId,
    toggleWindow,
    arrangeIcons,
    refreshDesktop,
    createNewFolder,
    iconContextMenu,
  };
};
export default useDesktop;
