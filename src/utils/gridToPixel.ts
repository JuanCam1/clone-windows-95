import { GRID_SIZE, ICON_OFFSET } from "../consts";

export const gridToPixel = (gridX: number, gridY: number) => ({
  x: gridX * GRID_SIZE + ICON_OFFSET,
  y: gridY * GRID_SIZE + ICON_OFFSET,
});
