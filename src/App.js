import React from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function toggleHeld(id) {
    setDice(
      dice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  function rollDice() {
    setDice(dice.map((die) => (!die.isHeld ? generateNewDie() : die)));
  }

  function newGame(){
    setTenzies(false);
    setDice(allNewDice());
  }

  const dieElement = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      toggleHeld={() => toggleHeld(die.id)}
      id={die.id}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{dieElement}</div>
      <button className="roll-dice" onClick={!tenzies? rollDice : newGame}>
        {!tenzies ? "Roll Dice" : "New Game"}
      </button>
    </main>
  );
}

export default App;
