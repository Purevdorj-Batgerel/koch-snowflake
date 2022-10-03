export const flakeWidth = 400;

export const tanSixty = Math.tan(Math.PI / 3);
export const triangleHeight = (flakeWidth / 2) * tanSixty;
export const flakeHeight = (triangleHeight * 4) / 3;

export const smallFlakeWidth = flakeWidth / Math.sqrt(3);
export const smallFlakeHeight = (smallFlakeWidth * 2) / Math.sqrt(3);
