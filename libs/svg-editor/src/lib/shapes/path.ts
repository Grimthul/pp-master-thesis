import { PathPoint } from '../types/path';

const pathPointToString = (point: PathPoint) =>
  `${point.command} ${point.x} ${point.y}`;

const pathPoints = (d: string): PathPoint[] =>
  d.split(/(?=[MZLHVCSQTAmzlhvcsqta])/g).map((group) => {
    const [command, x, y] = group.trim().split(' ');
    return {
      command,
      x: Number(x),
      y: Number(y),
    };
  });

const moveCoords = (point: PathPoint, tx: number, ty: number): PathPoint => ({
  command: point.command,
  x: point.x + tx,
  y: point.y + ty,
});

const moveBy = (d: string, tx: number, ty: number): string =>
  pathPoints(d)
    .map((point) => {
      const newPoint = moveCoords(point, tx, ty);
      if (newPoint.command === newPoint.command.toLowerCase()) return point;
      return newPoint;
    })
    .map(pathPointToString)
    .join(' ');

export { moveBy, pathPoints, pathPointToString };
