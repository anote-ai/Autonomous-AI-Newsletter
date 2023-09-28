import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableSection = ({ css, id, content, moveSection, findSection }) => {
    const originalIndex = findSection(id).index;
    const [{ isDragging }, drag] = useDrag({
      type: 'section',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (dropResult, monitor) => {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveSection(droppedId, originalIndex);
        }
      },
    });

    const [{isOver}, drop] = useDrop({
        accept: 'section',
        drop: (item) => moveSection(item.id, id), // Pass the id of the section being hovered over
        collect: (monitor) => ({
          isOver: monitor.isOver(),
        }),
      });

      const opacity = isOver ? 0.5 : 1;

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity }}  className={`${css} bg-gray-600 cursor-pointer p-2 rounded-md shadow-md`}>
      {content}
    </div>
  );
};

export default DraggableSection;
