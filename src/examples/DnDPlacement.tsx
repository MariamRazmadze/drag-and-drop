import { useState } from "react";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { DragDropProvider } from "@dnd-kit/react";

export default function DnDPlacement() {
  const [isPlaced, setIsPlaced] = useState(false);
  return (
    <div>
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;
          setIsPlaced(event.operation.target?.id === 1);
        }}
      >
        {!isPlaced && <Draggable id={1} />}
        <Droppable id={1}>{isPlaced && <Draggable id={1} />}</Droppable>
      </DragDropProvider>
    </div>
  );
}
