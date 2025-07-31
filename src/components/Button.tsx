import {
  useState,
  type CSSProperties,
  type FC,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "../utils/merge";

interface Props {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  active?: boolean;
  className?: ReactNode;
  style?: CSSProperties;
}
const Button: FC<Props> = ({ children, onClick, active, className, style }) => {
  const [pressed, setPressed] = useState(false);
  const isPressed = active || pressed;
  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      style={style}
      className={cn(
        `flex items-center h-7 px-2 text-xs font-bold text-black select-none border font-w95fa
        ${
          isPressed
            ? "bg-gray-300 border-t-gray-800 border-l-gray-800 border-b-white border-r-white"
            : "bg-gray-200 hover:bg-gray-300 border-t-white border-l-white border-b-gray-800 border-r-gray-800"
        }
        shadow-inner
      `,
        className
      )}
    >
      {children}
    </button>
  );
};
export default Button;
