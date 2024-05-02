import {schemeDark2} from "d3-scale-chromatic";

export const generateColors = (data) => {
    const colorScale = schemeDark2;
    return data.map((entry, index) => colorScale[index % colorScale.length]);
};
