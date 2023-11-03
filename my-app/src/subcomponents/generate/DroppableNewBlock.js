import { useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';

const ItemTypes = {
    ELEMENT: 'element',
};

function DroppableNewBlock({ index, handleAddObjectAbove }) {
    const [{ isOver }, DropNewElement] = useDrop({
        accept: "newElementBlock",
        drop: ((item) => {
            console.log(item.id);
            handleAddObjectAbove(index, item.id);
        }),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (

        <div
            ref={DropNewElement}
            className={`w-full h-1 border-1 border-transparent group mb-4 ${isOver ? 'hover' : ''}`}
        >
            {isOver && (
                <div className="opacity-100 transition-opacity drop-target">
                    <FontAwesomeIcon icon={faPlus} className="text-white" />
                </div>
            )}
        </div>
    );
}

export default DroppableNewBlock;