import { Coordinates } from "@/components/demo-1/Bento";

export const convertStringToCoordinate = (str: string): Coordinates => {
  const [x, y] = str.split(",").map((item) => parseInt(item));
  return { x, y };
};
