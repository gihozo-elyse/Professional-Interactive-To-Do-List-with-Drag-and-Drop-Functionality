import { useDraggable } from '@dnd-kit/core';

function TodoItem({ todo, onDelete, onDrag, id }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: todo.id,
    data: {
      todo,
    },
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : 'none',
    zIndex: isDragging ? 1000 : 'auto',
    position: 'relative',
    left: todo.x || 0,
    top: todo.y || 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center p-3 sm:p-4 bg-white border border-gray-200 rounded-lg shadow-sm
      transition-all duration-200 hover:shadow-md hover:border-gray-300 select-none w-64"
    >
      <div 
        {...listeners}
        {...attributes}
        className="flex items-center cursor-grab active:cursor-grabbing"
      >
        <svg 
          className="h-5 w-5 text-gray-400 hover:text-gray-600 mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
        </svg>
      </div>
      <span className="text-sm sm:text-base text-gray-800 flex-1 break-words px-2">
        {todo.text}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo.id);
        }}
        className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 
        transition-colors duration-200 focus:outline-none focus:ring-2 
        focus:ring-red-500 focus:ring-opacity-50 whitespace-nowrap"
        aria-label={`Delete task: ${todo.text}`}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;