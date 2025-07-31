import { GRID_SIZE, ICON_OFFSET } from "../consts";

export const pixelToGrid = (x: number, y: number) => ({
  gridX: Math.round((x - ICON_OFFSET) / GRID_SIZE),
  gridY: Math.round((y - ICON_OFFSET) / GRID_SIZE),
});
