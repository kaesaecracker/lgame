import React, { useState } from "react";
import "./App.css";
import Remote from "./Remote.js";
import Stone from "./Stone.js";

function Board() {
  const [coinOne] = useState({ positions: [{ x: 1, y: 1 }] });
  const [coinTwo] = useState({ positions: [{ x: 4, y: 4 }] });
  const [elOne] = useState({
    color: "orange",
    positions: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 4 }]
  });
  const [elTwo] = useState({
    color: "blue",
    positions: [{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }]
  });
  const [{ numberOfTurns, currentPlayer, turnPhase }] = useState({
    numberOfTurns: 0,
    turnPhase: "move-l",
    currentPlayer: "one"
  });
  const [remoteState, setRemoteState] = useState({
    flipEnabled: false,
    rotateEnabled: false
  });

  const onMoveClick = ({ direction }) =>
    console.log("Arrow pressed", { direction });

  const onRotateClick = ({ direction }) => {
    console.log("Rotate clicked", { direction });
    if (turnPhase !== "move-l") {
      console.error("Rotate not allowed");
      return;
    }

    setRemoteState({ ...remoteState, rotateEnabled: false });
    // TODO rotate
  };

  const onFlipClick = ({ direction }) => {
    console.log("Flip clicked", { direction });
    if (turnPhase !== "move-l") {
      console.error("Flip not allowed");
      return;
    }

    setRemoteState({ ...remoteState, flipEnabled: false });
    // TODO flip
  };

  console.log("board: ", {
    coinOne,
    coinTwo,
    elOne,
    elTwo,
    currentPlayer,
    remoteState,
    turnPhase
  });
  return (
    <>
      <h2>
        Turns: {numberOfTurns} - Player {currentPlayer} -{" "}
        {turnPhase === "move-l" ? "Move the L" : ""}
      </h2>
      <div className="Board">
        <Stone {...coinOne} />
        <Stone {...coinTwo} />
        <Stone {...elOne} />
        <Stone {...elTwo} />
      </div>
      <Remote
        extraButtons={turnPhase === "move-l"}
        state={remoteState}
        setState={setRemoteState}
        onMoveClick={onMoveClick}
        onRotateClick={onRotateClick}
        onFlipClick={onFlipClick}
      />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
