// src/app/page.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install this: npm install uuid @types/uuid
import TodoForm from '@/app/components/TodoForm';
import TodoList from '@/app/components/TodoList';
import { TodoItem } from '@/app/types/todoitem';

export default function Home() {
  // Initialize state from localStorage if available, otherwise empty array
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    // This code runs only on client-side
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    }
    return [];
  });

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add new todo (memoized to prevent unnecessary re-creation)
  const handleAddTodo = useCallback((newTodo: Omit<TodoItem, 'id'>) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { ...newTodo, id: uuidv4() }
    ]);
  }, []);

  // Delete todo (memoized to prevent unnecessary re-creation)
  const handleDeleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Todo List Application</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
    </main>
  );
}