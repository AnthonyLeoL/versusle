import React, { useState, useEffect } from "react";
import "./key.css";
const keys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

const Key = ({ letter }) => {
  return (
    <div className="key">
      <div style={{ alignSelf: "center" }}>{letter}</div>
    </div>
  );
};

const KeyRow = ({ keyrow, row }) => {
  return (
    <div style={{ display: "flex", marginLeft: `${row * 25}px` }}>
      {keyrow.split("").map((letter, i) => (
        <Key letter={letter} key={i} />
      ))}
    </div>
  );
};
const Keyboard = () => {
  console.log("from keyboard:", keys);
  return (
    <div className="keyboard">
      {keys.map((letters, i) => (
        <KeyRow keyrow={letters} key={i} row={i} />
      ))}
    </div>
  );
};
export default Keyboard;
