import React from "react";
import "./Stone.css";

function checkForCollisions(own, otherStones) {
  for (const [, other] of otherStones.entries()) {
    for (const [, ownPos] of own.positions.entries()) {
      for (const [, otherPos] of other.positions.entries()) {
        if (ownPos.x === otherPos.x && ownPos.y === otherPos.y) return true;
      }
    }
  }

  return false;
}

function movePositions(origPositions, direction) {
  const newPositions = [];
  for (const [, pos] of origPositions.entries()) {
    const newPos = {
      left: { ...pos, x: pos.x - 1, y: pos.y },
      right: { ...pos, x: pos.x + 1, y: pos.y },
      up: { ...pos, x: pos.x, y: pos.y - 1 },
      down: { ...pos, x: pos.x, y: pos.y + 1 }
    }[direction];

    if (newPos.x < 1 || newPos.x > 4 || newPos.y < 1 || newPos.y > 4)
      return origPositions;

    newPositions.push(newPos);
  }

  return newPositions;
}

function checkPositionsEqual(positionsA, positionsB) {
  for (const [, posA] of positionsA.entries()) {
    let found = false;
    console.log("looking for", posA, "in", positionsB);
    for (let i = 0; i < positionsB.length && !found; i++) {
      found = posA.x === positionsB[i].x && posA.y === positionsB[i].y;
      console.log(found, "checking", posA, "=", positionsB[i]);
    }

    if (!found) return false;
  }

  return true;
}

function Square(props) {
  return (
    <div
      className="Square"
      style={{
        "--x": props.x,
        "--y": props.y,
        "--color": props.color
      }}
      onClick={props.onClick}
    />
  );
}

function Stone({ positions, color, onClick, invisible }) {
  if (invisible) return null;

  if (!positions || positions.length < 1) {
    console.error("invalid l position", { positions });
    return null;
  }

  if (!color) color = "grey";

  const squares = [];
  for (const [i, pos] of positions.entries()) {
    squares.push(
      <Square key={i} color={color} x={pos.x} y={pos.y} onClick={onClick} />
    );
  }

  return <>{squares}</>;
}
export default Stone;
export { checkForCollisions, movePositions, checkPositionsEqual };
