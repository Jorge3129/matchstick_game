import { Coords } from '../types/coords';

export const addOffsetX =
  (offsetX: number) =>
  ([x1, y1, x2, y2]: Coords) => {
    return [offsetX + x1, y1, offsetX + x2, y2];
  };

export const addOffsetY =
  (offsetY: number) =>
  ([x1, y1, x2, y2]: Coords) => {
    return [x1, offsetY + y1, x2, offsetY + y2];
  };
