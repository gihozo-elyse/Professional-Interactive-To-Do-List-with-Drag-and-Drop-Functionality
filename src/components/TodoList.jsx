import TodoItem from './TodoItem';

function TodoList({ todos, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No tasks yet. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;