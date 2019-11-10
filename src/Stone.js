import React from "react";
import "./Stone.css";

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

function Stone({ positions, color, onClick }) {
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
