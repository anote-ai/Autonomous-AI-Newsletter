import { useDrag } from 'react-dnd';

// Define the drag item type
function DraggableNewBlock({ type }) {
    const [{ isDragging }, newElement] = useDrag({
        type: "newElementBlock",
        item: {
            id: type, // Include the 'id' in the item
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div ref={newElement} id={type} class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            {type}
        </div>
    );
}
export default DraggableNewBlock;