// src/app/page.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from '@/app/components/TodoForm';
import TodoList from '@/app/components/TodoList';
import { TodoItem } from '@/app/types/todoitem';

/**
* Main page component for the Todo List application
* Handles state management and persistence
*/
export default function Home() {
 // Initialize state from localStorage with lazy initialization
 const [todos, setTodos] = useState<TodoItem[]>(() => {
   // Only run on client-side to avoid SSR issues
   if (typeof window !== 'undefined') {
     try {
       const savedTodos = localStorage.getItem('todos');
       return savedTodos ? JSON.parse(savedTodos) : [];
     } catch (error) {
       // Fallback in case of corrupted data
       console.error('Failed to parse saved todos:', error);
       return [];
     }
   }
   return [];
 });

 // Persist todos to localStorage when state changes
 useEffect(() => {
   try {
     localStorage.setItem('todos', JSON.stringify(todos));
   } catch (error) {
     console.error('Failed to save todos to localStorage:', error);
   }
 }, [todos]);

 // Memoized handler for adding new todos
 const handleAddTodo = useCallback((newTodo: Omit<TodoItem, 'id'>) => {
   setTodos(prevTodos => [
     ...prevTodos,
     { ...newTodo, id: uuidv4() }
   ]);
 }, []);

 // Memoized handler for deleting todos
 const handleDeleteTodo = useCallback((id: string) => {
   setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
 }, []);

 return (
   <main className="max-w-2xl mx-auto py-8 px-4">
     <h1 className="text-2xl font-bold mb-6">Todo List Application</h1>
     
     {/* Form component for adding new todos */}
     <TodoForm onAddTodo={handleAddTodo} />
     
     {/* List component displaying todos with delete functionality */}
     <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
   </main>
 );
}