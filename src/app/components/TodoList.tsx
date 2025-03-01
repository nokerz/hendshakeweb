// src/components/TodoList.tsx
"use client";

import { TodoItem } from '@/app/types/todoitem';
import { memo, useCallback } from 'react';

interface TodoListProps {
  todos: TodoItem[];
  onDeleteTodo: (id: string) => void;
}

/**
 * Individual todo item component - extracted for better performance
 * Each item only re-renders when its own data changes
 */
const TodoListItem = memo(function TodoListItem({ 
  todo, 
  onDelete 
}: { 
  todo: TodoItem; 
  onDelete: (id: string) => void 
}) {
  // Memoize click handler to prevent recreation on renders
  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [onDelete, todo.id]);

  return (
    <li className="p-3 bg-white border rounded-md flex justify-between items-center">
      <div>
        <div className="font-medium">{todo.activity}</div>
        <div className="text-sm text-gray-600">
          <span className="mr-2">Price: RM{todo.price.toFixed(2)}</span>
          <span className="mr-2">Type: {todo.type}</span>
          <span className="mr-2">
            {todo.bookingRequired ? 'Booking required' : 'No booking needed'}
          </span>
          <span>Accessibility: {todo.accessibility.toFixed(1)}</span>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  );
});

/**
 * TodoList component displays a list of todo items with a count
 * Uses memo to prevent re-renders when props don't change
 */
const TodoList = memo(function TodoList({ todos, onDeleteTodo }: TodoListProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">To-Do List</h2>
      {/* Summary section showing total count */}
      <div className="mb-4 text-sm font-medium">Total items: {todos.length}</div>
      
      {todos.length === 0 ? (
        // Empty state message
        <p className="text-gray-500">No items in the list. Add one above!</p>
      ) : (
        // List of todo items
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoListItem 
              key={todo.id} 
              todo={todo} 
              onDelete={onDeleteTodo} 
            />
          ))}
        </ul>
      )}
    </div>
  );
});

export default TodoList;