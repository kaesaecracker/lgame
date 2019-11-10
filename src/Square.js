import React from "react";
import "./Square.css";

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

export default Square;
