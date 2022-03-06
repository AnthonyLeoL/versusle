import React, { useReducer, useEffect } from "react";
import Row from "./components/Row";

import "./App.css";
const ACCEPT_WORDS = new Set(["PENIS", "TAINT", "SPUMM"]);
const TARGET_WORD = "SPUMM";

function App() {
  const NUM_ROWS = 12;
  const initialState = {
    numGuesses: 0,
    curLetter: 0,
    guesses: [...Array(NUM_ROWS)].map((_) =>
      [...Array(5)].map(() => ({ letter: "", correct: "" }))
    ),
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    function handleKeyDown(e) {
      dispatch(e);
    }

    document.addEventListener("keydown", handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function reducer(state, action) {
    if (action.repeat) return state;
    let { key } = action;
    key = key.toUpperCase();
    let newGuesses = [...state.guesses];
    console.log(
      "🚀 ~ file: App.js ~ line 39 ~ reducer ~ newGuesses",
      newGuesses
    );
    let { curLetter, numGuesses } = state;

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
        return {
          ...state,
          curLetter: 0,
          numGuesses: state.numGuesses + 1,
          guesses: newGuesses,
        };
      } else {
        console.log("not a word");
      }
    }
    if (key === "BACKSPACE" && curLetter > 0) {
      curLetter--;
      newGuesses[numGuesses][curLetter].letter = "";
      return {
        ...state,
        curLetter: curLetter,
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
    <div tabIndex="0" style={{ width: "350px", height: "840px" }}>
      {console.log("🚀 ~ file: App.js ~ line 92 ~ App ~ state", state)}
      {state.guesses.map((guess, i) => (
        <Row
          key={i}
          active={i === state.numGuesses}
          curLetter={state.curLetter}
          guess={guess}
        />
      ))}
    </div>
  );
}

export default App;
