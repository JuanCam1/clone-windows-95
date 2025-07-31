import { pixelToGrid } from "./pixelToGrid";

export const isGridPositionOccupied = (
  gridX: number,
  gridY: number,
  icons: DesktopIconModelI[],
  excludeId?: string
) => {
  return icons.some((icon) => {
    if (excludeId && icon.id === excludeId) return false;
    const iconGrid = pixelToGrid(icon.position.x, icon.position.y);
    return iconGrid.gridX === gridX && iconGrid.gridY === gridY;
  });
};
