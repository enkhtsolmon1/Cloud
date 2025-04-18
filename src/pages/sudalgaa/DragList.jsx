import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialNames = [
  { id: "1", name: "Бат", age: 20 },
  { id: "2", name: "Дорж", age: 22 },
  { id: "3", name: "Ганаа", age: 21 },
];

const DragList = () => {
  const [names, setNames] = useState(initialNames);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(names);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);
    setNames(items);
  };

  //   console.log(names);
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="names">
        {(provided) => (
          <ul
            className="bg-gray-100 p-2 rounded"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {names.map((person, index) => (
              <Draggable key={person.id} draggableId={person.id} index={index}>
                {(provided) => (
                  <li
                    className="p-2 mb-2 bg-white rounded shadow cursor-move"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <strong>{person.name}</strong> — {person.age} настай
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragList;
