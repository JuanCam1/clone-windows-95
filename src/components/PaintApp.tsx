import { useEffect, useRef, useState } from "react";
import { colors } from "../consts/data-colors";
import { Trash } from "lucide-react";

const PaintApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("brush");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      context.lineTo(x, y);
      context.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
      context.lineWidth = tool === "eraser" ? 20 : 2;
      context.lineCap = "round";
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div
      className="w-full h-[95%] flex flex-col bg-white border-2 border-gray-400"
      style={{ borderStyle: "inset" }}
    >
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="w-8 bg-gray-300 p-0.5 border-r border-gray-400 flex flex-col items-center">
          <button
            className={`w-7 h-7 p-0 min-w-0 mb-0.5 flex justify-center items-center ${tool === "brush" ? "bg-gray-400 border border-gray-400 shadow-inner" : ""}`}
            onClick={() => setTool("brush")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M18 12l-8-8-6 6c-2 2-2 5 0 7s5 2 7 0l7-7" />
              <path d="M17 7l3 3" />
            </svg>
          </button>
          <button
            className={`w-7 h-7 p-0 min-w-0 mb-0.5 flex justify-center items-center ${tool === "eraser" ? "bg-gray-400 border border-gray-400 shadow-inner" : "border border-gray-300"}`}
            onClick={() => setTool("eraser")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M20 20H7L3 16C2 15 2 13 3 12L13 2L22 11L20 20Z" />
              <path d="M17 17L7 7" />
            </svg>
          </button>
          <button
            className={`w-7 h-7 p-0 min-w-0 mb-0.5 flex justify-center items-center ${tool === "eraser" ? "bg-gray-400 border border-gray-400 shadow-inner" : "border border-gray-300"}`}
            onClick={clearCanvas}
          >
            <Trash calcMode="discrete" className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-auto border border-gray-400">
          <canvas
            ref={canvasRef}
            width={2000}
            height={2000}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            className="w-full h-full block"
          />
        </div>
      </div>

      <div className="flex bg-gray-300 p-1 border-t border-gray-400">
        <div className="flex flex-wrap gap-1">
          {colors.map((c) => (
            <button
              key={c}
              className={`w-6 h-6 ${color === c ? "ring-1 ring-gray-600" : ""}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      <div className="bg-gray-300 px-2 py-1 text-sm border-t border-gray-400">
        For Help, click Help Topics on the Help Menu.
      </div>
    </div>
  );
};
export default PaintApp;
