import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

interface Props {
  icon: DesktopIconModelI;
  onMove: (id: string, position: PositionModelI) => void;
  onRightClick: (id: string, position: PositionModelI) => void;
  onNameChange: (id: string, newName: string) => void;
}

const useDraggableIcon = ({
  icon,
  onMove,
  onRightClick,
  onNameChange,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingName, setEditingName] = useState(icon.name);
  const iconRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (icon.isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [icon.isEditing]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (icon.isEditing) return;

    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      e.preventDefault();
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || icon.isEditing) return;

      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      };
      onMove(icon.id, newPosition);
    },
    [isDragging, dragOffset, icon, onMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRightClick(icon.id, { x: e.clientX, y: e.clientY });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    } else if (e.key === "Escape") {
      setEditingName(icon.name);
      onNameChange(icon.id, icon.name);
    }
  };

  const handleNameSubmit = () => {
    if (editingName.trim()) {
      onNameChange(icon.id, editingName.trim());
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    iconRef,
    inputRef,
    editingName,
    setEditingName,
    handleMouseDown,
    handleRightClick,
    handleKeyDown,
    handleNameSubmit,
  };
};

export default useDraggableIcon;
