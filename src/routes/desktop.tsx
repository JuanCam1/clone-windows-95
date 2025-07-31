import { createFileRoute } from "@tanstack/react-router";
import DraggableIcon from "../sections/DraggableIcon";
import Taskbar from "../components/TaskBar";
import StartMenu from "../sections/StartMenu";
import ContextMenu from "../sections/ContextMenu";
import IconContextMenu from "../components/IconContextMenu";
import useDesktop from "../hooks/useDesktop";
import Window from "../sections/Window";

export const Route = createFileRoute("/desktop")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
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
    activeWindowId,
    minimizeWindow,
    focusWindow,
    toggleWindow,
    arrangeIcons,
    refreshDesktop,
    createNewFolder,
    iconContextMenu,
  } = useDesktop();
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
