import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";
type DroppableProps = {
  id: number;
  children: ReactNode;
};

export default function Droppable({ id, children }: DroppableProps) {
  const { ref, isDropTarget } = useDroppable({ id });
  return (
    <div ref={ref} className="droppable">
      {!children && (isDropTarget ? "YOU ARE OVER ME" : "Drop here")}
      {children}
    </div>
  );
}
