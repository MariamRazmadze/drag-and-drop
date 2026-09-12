import { useDraggable } from "@dnd-kit/react";

type DraggableProps = {
  id: number;
};

export default function Draggable({ id }: DraggableProps) {
  const { ref } = useDraggable({ id });
  return <button ref={ref}>Draggable</button>;
}
