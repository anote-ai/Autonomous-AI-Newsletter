import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDetailPageOne } from "../../redux/DetailSlice";

const DraggableSection = ({ css, colorPalette, id, title, content, moveSection, findSection }) => {
  let getUserDetailPageOne = useDetailPageOne();
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

  const [{ isOver }, drop] = useDrop({
    accept: 'section',
    drop: (item) => moveSection(item.id, id), // Pass the id of the section being hovered over
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const opacity = isOver ? 0.5 : 1;
  let allContent
  if(id === "logo"){
    allContent = (
      <div ref={(node) => drag(drop(node))} style={{ opacity, backgroundColor: colorPalette }} className={`${css} bg-gray-600 cursor-pointer p-2 rounded-md shadow-md`}>
        {getUserDetailPageOne[3].data && getUserDetailPageOne[3].data !== "" &&(
          <img src={getUserDetailPageOne[3].data}></img>
        )}
        {getUserDetailPageOne[2].data}
    </div>
    )
  }
  else{
    allContent = (
      <div ref={(node) => drag(drop(node))} style={{ opacity, backgroundColor: colorPalette }} className={`${css} bg-gray-600 cursor-pointer p-2 rounded-md shadow-md`}>
      {title && title !== '' && (
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      )}
      {content}
    </div>
    )
  }

  return (
    <div>
      {allContent}
    </div>
  );
};

export default DraggableSection;
