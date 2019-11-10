import React, { useEffect } from "react";
import "./Remote.css";

function RemoteItem({ text, row, col, onClick, color, fontColor, keys }) {
  useEffect(() => {
    if (!keys || !onClick) return;

    const onKeyUp = event => {
      if (keys.includes(event.key.toLowerCase())) onClick(event);
    };

    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, [keys, onClick]);

  return (
    <div
      className="RemoteItem"
      onClick={onClick}
      style={{
        "--col": col,
        "--row": row,
        "--remote-button-color": color,
        "--remote-button-font-color": fontColor
      }}
    >
      {text}
    </div>
  );
}

function ArrowRemoteItem({ direction, onClick, keys }) {
  const onArrowClick = event => onClick({ ...event, direction });
  const commonProps = {
    color: "var(--normal-color)",
    fontColor: "black",
    onClick: onArrowClick,
    keys: keys
  };

  switch (direction) {
    case "left":
      return <RemoteItem text="Left" row={2} col={1} {...commonProps} />;
    case "right":
      return <RemoteItem text="Right" row={2} col={3} {...commonProps} />;
    case "up":
      return <RemoteItem text="Up" row={1} col={2} {...commonProps} />;
    case "down":
      return <RemoteItem text="Down" row={2} col={2} {...commonProps} />;
    default:
      console.error("Invalid direction", { direction });
      return null;
  }
}

function FlipRemoteItem({ state, setState }) {
  const onFlipClick = event =>
    setState({
      ...state,
      flipEnabled: !state.flipEnabled,
      rotateEnabled: false
    });

  return (
    <RemoteItem
      text="Flip"
      row={1}
      col={1}
      color={
        state.flipEnabled ? "var(--highlight-color)" : "var(--extra-color)"
      }
      onClick={onFlipClick}
    />
  );
}

function RotateRemoteItem({ state, setState }) {
  const onRotateClick = event =>
    setState({
      ...state,
      rotateEnabled: !state.rotateEnabled,
      flipEnabled: false
    });

  return (
    <RemoteItem
      text="Rotate"
      row={1}
      col={3}
      color={
        state.rotateEnabled ? "var(--highlight-color)" : "var(--extra-color)"
      }
      onClick={onRotateClick}
    />
  );
}

function Remote({
  extraButtons,
  state,
  setState,
  onMoveClick,
  onRotateClick,
  onFlipClick
}) {
  const onArrowClick = state.rotateEnabled
    ? onRotateClick
    : state.flipEnabled
    ? onFlipClick
    : onMoveClick;

  return (
    <div className="Remote">
      <ArrowRemoteItem
        direction="left"
        onClick={onArrowClick}
        keys={["arrowleft", "1", "a"]}
      />
      <ArrowRemoteItem
        direction="up"
        onClick={onArrowClick}
        keys={["arrowup", "5", "w"]}
      />
      <ArrowRemoteItem
        direction="down"
        onClick={onArrowClick}
        keys={["arrowdown", "2", "s"]}
      />
      <ArrowRemoteItem
        direction="right"
        onClick={onArrowClick}
        keys={["arrowright", "3", "d"]}
      />

      {extraButtons ? (
        <>
          <FlipRemoteItem state={state} setState={setState} keys={["4", "f"]} />
          <RotateRemoteItem
            state={state}
            setState={setState}
            keys={["6", "r"]}
          />
        </>
      ) : null}

      <RemoteItem text="Undo" row={1} col={4} color="red" keys={["+", "z"]} />
      <RemoteItem text="Done" row={2} col={4} color="green" keys={["enter"]} />
    </div>
  );
}

export default Remote;
