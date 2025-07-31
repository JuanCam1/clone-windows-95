import useCalculator from "../hooks/useCalculator";

const CalculatorApp = () => {
  const { display, inputNumber, inputOperation, performCalculation, clear } =
    useCalculator();
  return (
    <div
      className="bg-gray-200 p-2 w-64  border-2 border-gray-400 select-none"
      style={{ borderStyle: "inset" }}
    >
      <div
        className="bg-gray-300 text-black p-2 mb-2 text-right  text-lg border-2 border-gray-400 font-w95fa"
        style={{ borderStyle: "inset" }}
      >
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1">
        <button
          onClick={clear}
          className="col-span-2 bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
          style={{ borderStyle: "outset" }}
        >
          Clear
        </button>
        <button
          onClick={() => inputOperation("/")}
          className="bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
          style={{ borderStyle: "outset" }}
        >
          ÷
        </button>
        <button
          onClick={() => inputOperation("*")}
          className="bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
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
          className="bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
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
          className="bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
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
          className="row-span-2 bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
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
