import React, { useReducer, useEffect } from "react";
import Row from "./components/Row";
import { useAlert } from "react-alert";

import "./App.css";
const ACCEPT_WORDS = new Set(["PENIS", "TAINT", "SPUMM"]);
const TARGET_WORD = "SPUMM";

function App() {
  const alert = useAlert();

  const NUM_ROWS = 12;
  const initialState = {
    numGuesses: 0,
    curLetter: 0,
    alert: { msg: "", type: "" },
    guesses: [...Array(NUM_ROWS)].map((_) =>
      [...Array(5)].map(() => ({ letter: "", correct: "" }))
    ),
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    function handleKeyDown(e) {
      dispatch(e);
    }

    document.addEventListener("keydown", handleKeyDown, () => {
      console.log("added");
    });
    if (state.alert.msg) alert.show(state.alert.msg, { type: alert.type });
    // state.alert = "";

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.alert]);

  function reducer(state, action) {
    if (action.repeat) return state;
    console.log("running...");
    let { key } = action;
    key = key.toUpperCase();
    let newGuesses = JSON.parse(JSON.stringify(state.guesses));
    let { curLetter, numGuesses } = state;
    let alert = { msg: "", type: "" };

    if (curLetter === 5 && key === "ENTER") {
      let word = state.guesses[numGuesses].map((obj) => obj.letter);
      if (ACCEPT_WORDS.has(word.join(""))) {
        console.log("accepted: ", word);
        word.forEach((letter, i) => {
          let isCorrect;
          if (TARGET_WORD[i] === letter) {
            isCorrect = "true";
          } else if (TARGET_WORD.includes(letter)) {
            console.log("in word");
            isCorrect = "sorta";
          } else {
            isCorrect = "nope";
          }
          newGuesses[numGuesses][i].correct = isCorrect;
        });
        if (TARGET_WORD === word.join("")) alert = "You got it!";
        return {
          ...state,
          curLetter: 0,
          alert,
          numGuesses: state.numGuesses + 1,
          guesses: newGuesses,
        };
      } else {
        console.log("not a word");
        return { ...state, alert: { msg: "not a word", type: "error" } };
      }
    }
    if (key === "BACKSPACE" && curLetter > 0) {
      curLetter--;
      newGuesses[numGuesses][curLetter].letter = "";
      return {
        ...state,
        curLetter,
        alert,
        guesses: newGuesses,
      };
    }
    if (!/^[A-Z]$/i.test(key)) return state;

    if (curLetter === 5) return state;

    newGuesses[numGuesses][curLetter].letter = key;

    return {
      ...state,
      curLetter: state.curLetter + 1,
      guesses: newGuesses,
    };
  }

  return (
    <div tabIndex="0" className="board-container">
      {state.guesses.map((guess, i) => {
        return (
          <Row
            key={i}
            passed={i < state.numGuesses}
            curLetter={i === state.numGuesses ? state.curLetter : -1}
            guess={guess}
          />
        );
      })}
    </div>
  );
}

export default App;
