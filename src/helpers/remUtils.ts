const BASE_SIZE = 16;

export const rem = (size: number): string => {
  return `${(1 / BASE_SIZE) * size}rem`;
};

export const pxToRem = (size: number): number => {
  return (1 / BASE_SIZE) * size;
};

export const m = (
  top: number,
  right?: number,
  bottom?: number,
  left?: number,
): string => {
  const rightDimension = right ?? top;
  const bottomDimension = bottom ?? top;
  const leftDimension = left ?? rightDimension;

  return `${rem(top)} ${rem(rightDimension)} ${rem(bottomDimension)} ${rem(leftDimension)}`;
};

export const p = m;
export const br = m;
