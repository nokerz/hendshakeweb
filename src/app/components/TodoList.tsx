// src/components/TodoList.tsx
"use client";

import { TodoItem } from '@/app/types/todoitem';
import { memo } from 'react';

interface TodoListProps {
  todos: TodoItem[];
  onDeleteTodo: (id: string) => void;
}

// Using memo to prevent unnecessary re-renders
const TodoList = memo(function TodoList({ todos, onDeleteTodo }: TodoListProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">To-Do List</h2>
      <div className="mb-4 text-sm font-medium">Total items: {todos.length}</div>
      
      {todos.length === 0 ? (
        <p className="text-gray-500">No items in the list. Add one above!</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="p-3 bg-white border rounded-md flex justify-between items-center">
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
                onClick={() => onDeleteTodo(todo.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default TodoList;