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
  className?: string;
  style?: CSSProperties;
}

const Button: FC<Props> = ({ children, onClick, active, className, style }) => {
  const [pressed, setPressed] = useState(false);
  const isPressed = active || pressed;

  return (
    <div
      className={cn(
        `inline-block select-none
        ${
          isPressed
            ? "border-t-zinc-900 border-l-zinc-900 border-b-white border-r-white"
            : "border-t-white border-l-white border-b-zinc-900 border-r-zinc-900"
        }`,
        "border"
      )}
      style={style}
    >
      <button
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
        className={cn(
          `flex items-center px-2 h-7 text-sm font-bold text-black cursor-pointer
          ${
            isPressed
              ? "border-t-[#808080] border-l-[#808080] border-b-[#dcdcdc] border-r-[#dcdcdc] bg-[#c0c0c0]"
              : "border-t-[#dcdcdc] border-l-[#dcdcdc] border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] hover:bg-[#d3d3d3]"
          }
          border`,
          className
        )}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
