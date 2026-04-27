import React, { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState("dark");
  const [mode, setMode] = useState("basic");

  const handleClick = (val) => {
    setValue((prev) => prev + val);
  };

  const clear = () => setValue("");
  const del = () => setValue((prev) => prev.slice(0, -1));

  const calculate = () => {
    try {
      // safer than raw eval for basic usage
      const result = Function(`return ${value}`)();
      setValue(result.toString());
    } catch {
      setValue("Error");
    }
  };

  const scientific = (fn) => {
    try {
      let result;
      switch (fn) {
        case "sin":
          result = Math.sin(Number(value));
          break;
        case "cos":
          result = Math.cos(Number(value));
          break;
        case "tan":
          result = Math.tan(Number(value));
          break;
        case "log":
          result = Math.log10(Number(value));
          break;
        case "sqrt":
          result = Math.sqrt(Number(value));
          break;
        default:
          return;
      }
      setValue(result.toString());
    } catch {
      setValue("Error");
    }
  };

  return (
    <div className={`container ${theme}`}>
      <div className="calculator">
        
        {/* Top Controls */}
        <div className="top-bar">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          <button onClick={() => setMode(mode === "basic" ? "scientific" : "basic")}>
            {mode === "basic" ? "Scientific" : "Basic"}
          </button>
        </div>

        {/* Display */}
        <div className="display">
          <input type="text" value={value} readOnly placeholder="0" />
        </div>

        {/* Scientific Buttons */}
        {mode === "scientific" && (
          <div className="row">
            <button onClick={() => scientific("sin")}>sin</button>
            <button onClick={() => scientific("cos")}>cos</button>
            <button onClick={() => scientific("tan")}>tan</button>
            <button onClick={() => scientific("log")}>log</button>
            <button onClick={() => scientific("sqrt")}>√</button>
          </div>
        )}

        {/* Buttons */}
        <div className="grid">
          <button onClick={clear}>AC</button>
          <button onClick={del}>DE</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={() => handleClick("/")}>/</button>

          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("*")}>*</button>

          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("+")}>+</button>

          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("-")}>-</button>

          <button onClick={() => handleClick("00")}>00</button>
          <button onClick={() => handleClick("0")}>0</button>
          <button className="equal" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;