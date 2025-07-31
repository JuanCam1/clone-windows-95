import { gridToPixel } from "../utils/gridToPixel";
import calculator from "../assets/images/calculator-0.png";
import notepad from "../assets/images/notepad-0.png";
import explorer from "../assets/images/computer_explorer-4.png";
import paint from "../assets/images/paint_file-5.png";

export const apps: DesktopIconModelI[] = [
  {
    id: "calculator",
    name: "Calculator",
    icon: calculator,
    position: gridToPixel(0, 0),
    app: "calculator",
    type: "application",
  },
  {
    id: "notepad",
    name: "Notepad",
    icon: notepad,
    position: gridToPixel(0, 1),
    app: "notepad",
    type: "application",
  },
  {
    id: "explorer",
    name: "Explorer",
    icon: explorer,
    position: gridToPixel(0, 2),
    app: "explorer",
    type: "application",
  },
  {
    id: "paint",
    name: "Paint",
    icon: paint,
    position: gridToPixel(1, 0),
    app: "paint",
    type: "application",
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: explorer,
    position: gridToPixel(0, 3),
    app: "terminal",
    type: "application",
  },
];
