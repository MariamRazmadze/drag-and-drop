import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";

type SortableItemProps = {
  id: number;
  index: number;
};

function SortableItem({ id, index }: SortableItemProps) {
  const { ref, isDragSource } = useSortable({ id, index });
  return (
    <div
      ref={ref}
      className="sortable-item"
      style={{ opacity: isDragSource ? 0.4 : 1 }}
    >
      Item {id}
    </div>
  );
}

export default function SortableList() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  return (
    <div className="dnd-layout">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;
          const { source } = event.operation;
          if (isSortable(source)) {
            const { initialIndex, index } = source;
            if (initialIndex !== index) {
              setItems((items) => {
                const newItems = [...items];
                const [removed] = newItems.splice(initialIndex, 1);
                newItems.splice(index, 0, removed);
                return newItems;
              });
            }
          }
        }}
      >
        <div className="sortable-list">
          {items.map((id, index) => (
            <SortableItem key={id} id={id} index={index} />
          ))}
        </div>
      </DragDropProvider>
    </div>
  );
}
