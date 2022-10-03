import { flakeHeight, flakeWidth, tanSixty, triangleHeight } from "./global";

const rootTriangle = [
  { x: 0, y: -flakeHeight / 2 },
  { x: -flakeWidth / 2, y: triangleHeight - flakeHeight / 2 },
  { x: flakeWidth / 2, y: triangleHeight - flakeHeight / 2 },
  { x: 0, y: -flakeHeight / 2 },
];

const dataCache = {
  0: rootTriangle,
};

function kochIteration(v0, v1) {
  const baseVector = {
    x: v1.x - v0.x,
    y: v1.y - v0.y,
  };

  const orthogonalVector = {
    x: v0.y - v1.y,
    y: v1.x - v0.x,
  };

  const left = {
    x: v0.x + baseVector.x / 3,
    y: v0.y + baseVector.y / 3,
  };

  const right = {
    x: v1.x - baseVector.x / 3,
    y: v1.y - baseVector.y / 3,
  };

  const top = {
    x: v0.x + baseVector.x / 2 + (tanSixty * orthogonalVector.x) / 6,
    y: v0.y + baseVector.y / 2 + (tanSixty * orthogonalVector.y) / 6,
  };

  return [left, top, right];
}

export function computePoints(levels) {
  if (dataCache[levels]) {
    return dataCache[levels];
  }

  const previous_data = computePoints(levels - 1);
  const data = [...previous_data];

  previous_data.forEach((point, index, array) => {
    if (index + 1 >= array.length) {
      return;
    }

    const new_points = kochIteration(point, array[index + 1]);

    data.splice(index * 4 + 1, 0, ...new_points);
  });

  dataCache[levels] = data;

  return data;
}
