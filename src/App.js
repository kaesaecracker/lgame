import React, { useState } from "react";
import "./App.css";
import Remote from "./Remote.js";
import Stone, {
  checkForCollisions,
  movePositions,
  checkPositionsEqual
} from "./Stone.js";

function Board() {
  const [coinOne] = useState({ positions: [{ x: 1, y: 1 }] });
  const [coinTwo] = useState({ positions: [{ x: 4, y: 4 }] });
  const [elOne, setElOne] = useState({
    color: "orange",
    positions: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 4 }]
  });
  const [elTwo, setElTwo] = useState({
    color: "blue",
    positions: [{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }]
  });
  const [elTemp, setElTemp] = useState({
    color: "",
    positions: [],
    invisible: true,
    collides: true
  });
  const resetElTemp = () =>
    setElTemp({ ...elTemp, invisible: true, positions: [], collides: true });

  const [gameState, setGameState] = useState({
    numberOfTurns: 0,
    turnPhase: "move-l",
    currentPlayer: "one"
  });
  const [remoteState, setRemoteState] = useState({
    flipEnabled: false,
    rotateEnabled: false
  });

  const [ownL, setOwnL] =
    gameState.currentPlayer === "one" ? [elOne, setElOne] : [elTwo, setElTwo];
  const [otherL] =
    gameState.currentPlayer === "one" ? [elTwo, setElTwo] : [elOne, setElOne];

  const onMoveOwnLClick = ({ direction }) => {
    if (elTemp.invisible) {
      elTemp.invisible = false;
      elTemp.positions = ownL.positions;
    }

    elTemp.positions = movePositions(elTemp.positions, direction);
    const collides =
      checkForCollisions(elTemp, [otherL, coinOne, coinTwo]) ||
      checkPositionsEqual(elTemp.positions, ownL.positions);

    setElTemp({
      ...elTemp,
      color: collides ? "red" : "green",
      collides: collides
    });
  };

  const onRotateLClick = ({ direction }) => {
    console.log("Rotate clicked", { direction });
    if (gameState.turnPhase !== "move-l") {
      console.error("Rotate not allowed");
      return;
    }

    setRemoteState({ ...remoteState, rotateEnabled: false });
    // TODO rotate
  };

  const onFlipLClick = ({ direction }) => {
    console.log("Flip clicked", { direction });
    if (gameState.turnPhase !== "move-l") {
      console.error("Flip not allowed");
      return;
    }

    setRemoteState({ ...remoteState, flipEnabled: false });
    // TODO flip
  };

  const onUndoLClick = () => {
    if (gameState.turnPhase === "move-l") resetElTemp();
  };

  const onMoveLDoneClick = () => {
    if (!elTemp.invisible && elTemp.collides) {
      console.log("cannot move, l not moved or collides");
      return;
    }

    setOwnL({ ...ownL, positions: elTemp.positions });
    resetElTemp();
    setGameState({ ...gameState, turnPhase: "move-coin" });
  };

  console.log("board: ", {
    coinOne,
    coinTwo,
    elOne,
    elTwo,
    gameState,
    remoteState
  });
  return (
    <>
      <h2>
        Turns: {gameState.numberOfTurns} - Player {gameState.currentPlayer} -{" "}
        {gameState.turnPhase === "move-l"
          ? "Move the L"
          : gameState.turnPhase === "move-coin"}
      </h2>
      <div className="Board">
        <Stone {...coinOne} />
        <Stone {...coinTwo} />
        <Stone {...elOne} />
        <Stone {...elTwo} />
        <Stone {...elTemp} />
      </div>
      <Remote
        extraButtons={gameState.turnPhase === "move-l"}
        state={remoteState}
        setState={setRemoteState}
        onMoveClick={
          gameState.turnPhase === "move-l" ? onMoveOwnLClick : () => {}
        }
        onRotateClick={
          gameState.turnPhase === "move-l" ? onRotateLClick : () => {}
        }
        onFlipClick={gameState.turnPhase === "move-l" ? onFlipLClick : () => {}}
        onDoneClick={
          gameState.turnPhase === "move-l" ? onMoveLDoneClick : () => {}
        }
        onUndoClick={gameState.turnPhase === "move-l" ? onUndoLClick : () => {}}
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
