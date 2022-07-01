export enum SidesX {
  left = 'left',
  middleX = 'middleX',
  right = 'right',
}

export enum SidesY {
  top = 'top',
  middleY = 'middleY',
  bottom = 'bottom',
}

export const ElementSide = { ...SidesX, ...SidesY };
