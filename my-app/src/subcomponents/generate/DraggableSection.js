import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDetailPageTwo } from "../../redux/DetailSlice";

const DraggableSection = ({ css, backgroundColor, fontColor, fontStyle, fontSize, id, title, content, moveSection, findSection }) => {
  let getUserDetailPageTwo = useDetailPageTwo();
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
  if (id === "logo") {
    allContent = (
      <div ref={(node) => drag(drop(node))} style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} flex items-center border-gray-600 border cursor-pointer px-5 py-2 rounded-md shadow-md`}>
        {content && content !== "" && (
          <img className='w-10 h-10' src={content}></img>
        )}
        {title}
      </div>
    )
  }
  else if (id === "footer") {
    // console.log("footer")
    // console.log(content)
    allContent = (
      <div ref={(node) => drag(drop(node))} style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize  }} className={`${css} bg-gray-600 cursor-pointer p-2 rounded-md shadow-md`}>
        {content.map((each) => {
          return (<div> {each} </div>)
        })}
      </div>
    )
  }
  else {
    allContent = (
      <div ref={(node) => drag(drop(node))} style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize  }} className={`${css} bg-gray-600 cursor-pointer p-2 rounded-md shadow-md`}>
        {title && title !== '' && (
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{color: fontColor}}>
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
