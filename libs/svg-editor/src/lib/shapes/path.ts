const moveCoords = (coords: string[], tx: number, ty: number) =>
  coords
    .map((coord, i) => (i % 2 === 0 ? Number(coord) + tx : Number(coord) + ty))
    .join(' ');

const moveBy = (d: string, tx: number, ty: number): string =>
  d
    .split(/(?=[MZLHVCSQTAmzlhvcsqta])/g)
    .map((group) => {
      const [command, ...coords] = group.trim().split(' ');
      if (command === command.toLowerCase()) return group;
      return `${command} ${moveCoords(coords, tx, ty)}`;
    })
    .join(' ');

export { moveBy };
