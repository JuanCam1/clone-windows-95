import { isGridPositionOccupied } from "./isGridPositionOccupied";

export const findNearestFreeGridPosition = (
  targetGridX: number,
  targetGridY: number,
  icons: DesktopIconModelI[],
  excludeId?: string,
  maxGridX = 14,
  maxGridY = 8
) => {
  targetGridX = Math.max(0, Math.min(targetGridX, maxGridX));
  targetGridY = Math.max(0, Math.min(targetGridY, maxGridY));

  if (!isGridPositionOccupied(targetGridX, targetGridY, icons, excludeId)) {
    return { gridX: targetGridX, gridY: targetGridY };
  }

  for (let radius = 1; radius <= 10; radius++) {
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
          const gridX = targetGridX + dx;
          const gridY = targetGridY + dy;

          if (
            gridX >= 0 &&
            gridY >= 0 &&
            gridX <= maxGridX &&
            gridY <= maxGridY
          ) {
            if (!isGridPositionOccupied(gridX, gridY, icons, excludeId)) {
              return { gridX, gridY };
            }
          }
        }
      }
    }
  }

  return {
    gridX: Math.max(0, Math.min(targetGridX, maxGridX)),
    gridY: Math.max(0, Math.min(targetGridY, maxGridY)),
  };
};
