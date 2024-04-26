import { schemeCategory10 } from "d3-scale-chromatic";
export const generateColors = (data) => {
  const colorScale = schemeCategory10;
  return data.map((entry, index) => colorScale[index % colorScale.length]);
};
