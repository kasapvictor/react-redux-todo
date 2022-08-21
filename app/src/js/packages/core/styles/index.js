const FACTOR = 4;

/* COLORS */
export const color1 = '#232323';
export const color2 = '#ffffff';
export const color3 = '#0061df';
export const color4 = '#4ed192';
export const color5 = '#df0000';
export const color6 = '#ff6347';
export const color7 = '#5A5A5A';
export const color8 = '#fa2600';
export const color9 = '#2ba76c';
export const color10 = '#01459e';

export const contentFont = "Georgia, Cambria, 'Times New Roman', Times, serif";
export const titlesFont = "Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif";

export const m = (top = 0, right = 0, bottom = 0, left = 0) => `margin: ${top * FACTOR}px ${right * FACTOR}px ${bottom * FACTOR}px ${left * FACTOR}px`;
export const mt = (size) => `margin-top: ${size * FACTOR}px`;
export const mr = (size) => `margin-right: ${size * FACTOR}px`;
export const mb = (size) => `margin-bottom: ${size * FACTOR}px`;
export const ml = (size) => `margin-bottom: ${size * FACTOR}px`;
export const my = (size) => `margin: ${size * FACTOR}px 0`;
export const mx = (size) => `margin: 0 ${size * FACTOR}px`;

export const p = (top = 0, right = 0, bottom = 0, left = 0) => `padding: ${top * FACTOR}px ${right * FACTOR}px ${bottom * FACTOR}px ${left * FACTOR}px`;
export const pr = (size) => `padding-right: ${size * FACTOR}px`;
export const pb = (size) => `padding-bottom: ${size * FACTOR}px`;
export const pl = (size) => `padding-left: ${size * FACTOR}px`;
export const py = (size) => `padding: ${size * FACTOR}px 0`;
export const px = (size) => `padding: 0 ${size * FACTOR}px`;

export const borderRadius = (factor = FACTOR) => `border-radius: ${factor}px`;
