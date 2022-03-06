import React, { useState, useEffect } from "react";
import "./Row.css";

const Row = ({ guess, active, curLetter }) => {
  const Tile = ({ tile, pos }) => {
    return (
      <div
        className={`tile ${tile.correct} ${
          active && curLetter - 1 === pos ? "animate-pop" : ""
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
export default Row;
