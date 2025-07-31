import { useState, type FC } from "react";

const CalculatorApp: FC = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "*":
        return firstValue * secondValue;
      case "/":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  return (
    <div
      className="bg-gray-200 p-2 w-64 h-80 border-2 border-gray-400"
      style={{ borderStyle: "inset" }}
    >
      <div
        className="bg-black text-green-400 p-2 mb-2 text-right font-mono text-lg border-2 border-gray-400"
        style={{ borderStyle: "inset" }}
      >
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1">
        <button
          onClick={clear}
          className="col-span-2 bg-red-400 hover:bg-red-500 text-black border-2 border-gray-400"
          style={{ borderStyle: "outset" }}
        >
          Clear
        </button>
        <button
          onClick={() => inputOperation("/")}
          className="bg-blue-400 hover:bg-blue-500 text-black border-2 border-gray-400"
          style={{ borderStyle: "outset" }}
        >
          ÷
        </button>
        <button
          onClick={() => inputOperation("*")}
          className="bg-blue-400 hover:bg-blue-500 text-black border-2 border-gray-400"
          style={{ borderStyle: "outset" }}
        >
          ×
        </button>

        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => inputNumber(String(num))}
            className="bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
            style={{ borderStyle: "outset" }}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => inputOperation("-")}
          className="bg-blue-400 hover:bg-blue-500 text-black border-2 border-gray-400"
          style={{ borderStyle: "outset" }}
        >
          -
        </button>

        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => inputNumber(String(num))}
            className="bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
            style={{ borderStyle: "outset" }}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => inputOperation("+")}
          className="bg-blue-400 hover:bg-blue-500 text-black border-2 border-gray-400"
          style={{ borderStyle: "outset" }}
        >
          +
        </button>

        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => inputNumber(String(num))}
            className="bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
            style={{ borderStyle: "outset" }}
          >
            {num}
          </button>
        ))}
        <button
          onClick={performCalculation}
          className="row-span-2 bg-green-400 hover:bg-green-500 text-black border-2 border-gray-400"
          style={{ borderStyle: "outset" }}
        >
          =
        </button>

        <button
          onClick={() => inputNumber("0")}
          className="col-span-2 bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
          style={{ borderStyle: "outset" }}
        >
          0
        </button>
        <button
          onClick={() => inputNumber(".")}
          className="bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
          style={{ borderStyle: "outset" }}
        >
          .
        </button>
      </div>
    </div>
  );
};

export default CalculatorApp;
