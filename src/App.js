import React, { useReducer, useEffect } from "react";
import Row from "./components/Row";
import { useAlert } from "react-alert";

import "./App.css";
import Keyboard from "./components/Keyboard";
const ACCEPT_WORDS = new Set(["SHANE"]);
const TARGET_WORD = "SHANE";

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
    invalid: false,
    sendEvent: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    function handleKeyDown(e) {
      dispatch(e);
    }

    document.addEventListener("keydown", handleKeyDown);
    if (state.alert.msg) alert.show(state.alert.msg, { type: alert.type });

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.alert, state.numGuesses]);

  function reducer(state, action) {
    if (action.repeat) return state;
    console.log("running...");
    let { key } = action;
    key = key.toUpperCase();
    let newGuesses = JSON.parse(JSON.stringify(state.guesses));
    let { curLetter, numGuesses } = state;
    let alert = { msg: "", type: "" };
    let invalid = false;

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
        return {
          ...state,
          alert: { msg: "not a word", type: "error" },
          invalid: true,
        };
      }
    }
    if (key === "BACKSPACE" && curLetter > 0) {
      curLetter--;
      newGuesses[numGuesses][curLetter].letter = "";
      return {
        ...state,
        curLetter,
        alert,
        invalid,
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
    <div style={{ display: "flex" }}>
      <div tabIndex="0" className="board-container">
        {console.log(
          "🚀 ~ file: App.js ~ line 120 ~ {state.guesses.map ~ state",
          state.invalid
        )}
        {state.guesses.map((guess, i) => {
          return (
            <Row
              key={i}
              passed={i < state.numGuesses}
              curLetter={i === state.numGuesses ? state.curLetter : -1}
              invalid={i === state.numGuesses ? state.invalid : false}
              guess={guess}
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignContent: "center",
          marginTop: "30%",
        }}
      >
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
