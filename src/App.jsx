import { useState, useEffect } from 'react';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';
import './index.css';

function App() {
  const [todos, setTodos] = useState(() => {
    
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        x: window.innerWidth / 2 - 130, 
        y: 0 
      };
      setTodos([...todos, newTodo]);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updatePosition = (id, position) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { 
            ...todo, 
            x: position.x || 0, 
            y: position.y || 0 
          } 
        : todo
    ));
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    
    if (!delta) return;
    
    setTodos(todos.map(todo => {
      if (todo.id === active.id) {
        const newX = Math.max(0, (todo.x || 0) + delta.x);
        const newY = Math.max(0, (todo.y || 0) + delta.y);
        
        
        const maxX = window.innerWidth - 300; 
        const maxY = window.innerHeight - 100; 
        
        return {
          ...todo,
          x: Math.min(newX, maxX),
          y: Math.min(newY, maxY)
        };
      }
      return todo;
    }));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 py-4 sm:py-8 px-2 sm:px-4 relative overflow-hidden">
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-yellow-500 mb-6 sm:mb-8">
            CheckMate
          </h1>
          
          <AddTodo onAdd={addTodo} />
        </div>
        
        <div style={{ 
          position: 'relative',
          height: 'calc(100vh - 200px)',
          overflow: 'hidden',
          cursor: 'grab',
          touchAction: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          padding: '20px 0'
        }}>
          {todos.map(todo => (
            <div 
              key={todo.id}
              style={{
                position: 'relative',
                zIndex: 10,
                width: '260px',
                marginBottom: '10px'
              }}
            >
              <TodoItem 
                todo={todo} 
                onDelete={deleteTodo}
                onDrag={updatePosition}
                id={todo.id}
              />
            </div>
          ))}
        </div>
      </div>
    </DndContext>
  )
}

export default App