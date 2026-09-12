import { useState } from "react";
import { DragDropProvider, DragOverlay, useDraggable } from "@dnd-kit/react";
import Droppable from "./Droppable";

type CardProps = {
  id: number;
};

function Card({ id }: CardProps) {
  const { ref, isDragSource } = useDraggable({ id });
  return (
    <div ref={ref} className="card" style={{ opacity: isDragSource ? 0.3 : 1 }}>
      Card {id}
    </div>
  );
}

function CardOverlay({ id }: CardProps) {
  return <div className="card-overlay">Card {id}</div>;
}

export default function DragOverlayExample() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isPlaced, setIsPlaced] = useState(false);
  return (
    <div className="dnd-layout">
      <DragDropProvider
        onDragStart={(event) => {
          setActiveId((event.operation.source?.id as number) ?? null);
        }}
        onDragEnd={(event) => {
          setActiveId(null);
          setIsPlaced(event?.operation.target?.id === 8);
        }}
      >
        {!isPlaced && (
          <div className="cards-row">
            <Card id={1} />
          </div>
        )}
        <Droppable id={8}>
          {isPlaced ? (
            <div className="cards-row">
              <Card id={1} />
            </div>
          ) : null}
        </Droppable>
        <DragOverlay>
          {activeId !== null ? <CardOverlay id={activeId} /> : null}
        </DragOverlay>
      </DragDropProvider>
    </div>
  );
}
