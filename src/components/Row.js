import React, { useState, useEffect } from "react";
import "./Row.css";

const Row = ({ guess, curLetter, passed }) => {
  const Tile = ({ tile, pos }) => {
    return (
      <div
        className={`tile ${passed ? tile.correct : ""} ${
          curLetter - 1 === pos ? "animate-pop" : ""
        }`}
      >
        {tile.letter}
      </div>
    );
  };

  return (
    <div
      style={{ display: "flex", height: "64px", width: "320px", margin: "5px" }}
    >
      {guess.map((tile, i) => (
        <Tile key={i} pos={i} tile={tile} />
      ))}
    </div>
  );
};

const areEqual = (o1, o2) => {
  return (
    o1.guess.every((obj, i) => obj.letter === o2.guess[i].letter) &&
    o1.passed === o2.passed
  );
};

export default React.memo(Row, areEqual);
