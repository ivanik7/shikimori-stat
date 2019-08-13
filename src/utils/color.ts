interface Icolor {
  red: number;
  green: number;
  blue: number;
}

export const gradient = (
  color1: Icolor,
  color2: Icolor,
  percent: number
): Icolor => {
  return {
    red: Math.round(color1.red + percent * (color2.red - color1.red)),
    green: Math.round(color1.green + percent * (color2.green - color1.green)),
    blue: Math.round(color1.blue + percent * (color2.blue - color1.blue))
  };
};

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const hexToRgb = (hex: string): Icolor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
      }
    : null;
};

const componentToHex = c => {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

export const rgbToHex = (color: Icolor) => {
  return `#${componentToHex(color.red)}${componentToHex(
    color.green
  )}${componentToHex(color.blue)}`;
};
